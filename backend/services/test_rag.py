import os
from rag_service import RAGService

if __name__ == "__main__":
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    EMBED_MODEL = os.getenv("GROQ_EMBED_MODEL", "openai/gpt-oss-20b")
    rag = RAGService(
        docs_folder="../../rag/source_docs/",
        faiss_path="../../rag/index.faiss",
        meta_path="../../rag/metadata.pkl",
        groq_api_key=GROQ_API_KEY,
        embed_model=EMBED_MODEL
    )
    print("Building FAISS index from source documents...")
    rag.build()
    print("Index built. Now testing retrieval.")
    query = "What is the event schedule?"
    results = rag.retrieve(query, top_k=3)
    print(f"\nTop results for query: '{query}'\n")
    for r in results:
        print(f"From {r['filename']} (chunk {r['chunk_id']}):\n{r['text']}\n---")
