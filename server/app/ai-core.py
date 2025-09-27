import faiss
import numpy as np
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    pipeline,
    BertModel,
    BertTokenizer,
)


class VectorDB:
    """Simulates a FAISS Vector Store for the RAG pipeline."""

    def __init__(self, model_name="bert-base-uncased"):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertModel.from_pretrained(model_name)
        self.embedding_dim = self.model.config.hidden_size
        self.index = faiss.IndexFlatL2(self.embedding_dim)
        self.metadata = []

    def get_embedding(self, text):
        inputs = self.tokenizer(
            text, return_tensors="pt", padding=True, truncation=True, max_length=512
        )
        with torch.no_grad():
            outputs = self.model(**inputs)
        return outputs.last_hidden_state[:, 0, :].squeeze().numpy()

    def add_metadata(self, text, source):
        embedding = self.get_embedding(text)
        self.index.add(np.array([embedding], dtype="float32"))
        self.metadata.append({"text": text, "source": source})

    def retrieve_context(self, query, k=2):
        if self.index.ntotal == 0:
            return "No metadata available for retrieval."
        query_embedding = self.get_embedding(query)
        _, I = self.index.search(np.array([query_embedding], dtype="float32"), k)
        return "\n---\n".join([self.metadata[idx]["text"] for idx in I[0] if idx != -1])


def load_llm_pipeline():
    """Loads the Hugging Face model and tokenizer."""
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"🚀 LLM using device: {device}")
    model_id = "microsoft/Phi-3-mini-4k-instruct"

    model = AutoModelForCausalLM.from_pretrained(
        model_id, torch_dtype="auto", trust_remote_code=True
    ).to(device)

    tokenizer = AutoTokenizer.from_pretrained(model_id)

    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
    print("✅ LLM loaded successfully.")
    return pipe


def llm_nlp_to_sql(pipe, user_query: str, db_schema: str, rag_context: str) -> str:
    """Uses the loaded LLM pipeline to translate natural language to SQL."""
    messages = [
        {
            "role": "system",
            "content": f"""You are an expert SQLite assistant. Your task is to convert a user's question into a precise SQLite query based on the provided schema and context. You must only output a single SQLite query ending with a semicolon. Do not add any explanation or markdown formatting like ```sql.

Database Schema:
{db_schema}

Context:
{rag_context}
""",
        },
        {"role": "user", "content": user_query},
    ]

    generation_args = {
        "max_new_tokens": 150,
        "return_full_text": False,
        "temperature": 0.0,
        "do_sample": False,
    }
    output = pipe(messages, **generation_args)
    sql_query = output[0]["generated_text"].strip()

    if not sql_query.lower().startswith("select") or not sql_query.endswith(";"):
        return "SELECT 'Error: Could not generate a valid SQL query.';"

    return sql_query
