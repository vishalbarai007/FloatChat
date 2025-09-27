from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse

from app.processing import nc_to_dataframe
from app.database import store_to_sqlite, execute_sql_query
from app.visualizations import map_html
from app.ai_core import VectorDB, load_llm_pipeline, llm_nlp_to_sql

# --- Application Setup ---
app = FastAPI(title="FloatChat AI ARGO API")

# --- Global State ---
pipe = None
vector_store = VectorDB()
data_loaded = False


@app.on_event("startup")
def startup_event():
    """Initialise RAG and load the LLM on startup."""
    global pipe, vector_store

    # Load the LLM pipeline
    pipe = load_llm_pipeline()

    # Initialize RAG component with schema metadata
    schema_metadata = """
    SQL Table: argo_data
    Columns:
    - latitude (REAL): Float position latitude.
    - longitude (REAL): Float position longitude.
    - time (TEXT): Profile time (YYYY-MM-DD HH:MM:SS).
    - depth (REAL): Pressure in dbar (approximates depth).
    - temperature (REAL): Seawater temperature.
    - salinity (REAL): Seawater salinity.
    - chla (REAL): Chlorophyll-a concentration.
    """
    vector_store.add_metadata(schema_metadata, "DB_SCHEMA")


@app.get("/")
def root():
    return {"message": "FloatChat API is running. Use /docs for documentation."}


@app.post("/upload-data")
async def upload_data(file: UploadFile = File(...)):
    """Processes NetCDF, stores it in SQLite, and updates the data status."""
    global data_loaded
    try:
        with open(file.filename, "wb") as f:
            f.write(await file.read())

        df = nc_to_dataframe(file.filename)
        if df.empty:
            raise ValueError("Processed DataFrame is empty.")

        store_to_sqlite(df)
        data_loaded = True
        return {
            "message": f"Data from '{file.filename}' processed and stored successfully."
        }

    except Exception as e:
        data_loaded = False
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.post("/chatbot-response")
async def chatbot_response(query: str = Form(...)):
    """The main RAG backend flow for conversational querying."""
    if not data_loaded:
        return JSONResponse(
            content={
                "message": "Please upload ARGO data first via the /upload-data endpoint."
            }
        )

    # RAG: Retrieve context
    rag_context = vector_store.retrieve_context(query)
    db_schema = vector_store.metadata[0]["text"]

    # RAG: Generate SQL from LLM
    sql_query = llm_nlp_to_sql(pipe, query, db_schema, rag_context)
    print(f"🔍 Generated SQL: {sql_query}")

    # Execute Query
    df_results = execute_sql_query(sql_query)

    if df_results.empty:
        return JSONResponse(
            content={
                "message": "No data found for this query. Please try a broader request."
            }
        )

    # Generate Response
    if "map" in query.lower() or "location" in query.lower():
        map_content = map_html(df_results)
        return HTMLResponse(content=map_content, media_type="text/html")
    else:
        return JSONResponse(
            content={
                "message": f"Query processed successfully. Found {len(df_results)} records.",
                "sql_used": sql_query,
                "preview": df_results.head(5).to_dict(orient="records"),
            }
        )
