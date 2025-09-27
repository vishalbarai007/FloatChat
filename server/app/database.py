import sqlite3
import pandas as pd

DB_PATH = "argo_data.db"
TABLE_NAME = "argo_data"


def store_to_sqlite(df: pd.DataFrame):
    """Stores DataFrame into the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    df.to_sql(TABLE_NAME, conn, if_exists="replace", index=False)
    conn.close()
    print(f"✅ Data stored in SQLite table '{TABLE_NAME}'.")


def execute_sql_query(sql_query: str):
    """Executes a SQL query against the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    try:
        df = pd.read_sql_query(sql_query, conn)
        return df
    except Exception as e:
        print(f"SQL Execution Error: {e}")
        return pd.DataFrame()
    finally:
        conn.close()
