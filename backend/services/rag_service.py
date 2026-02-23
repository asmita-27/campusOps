import os
import glob
import pickle
from typing import List, Dict
import faiss
import numpy as np
from groq_embedder import GroqEmbedder

# --- 1. Document Loader ---
def load_documents(folder_path: str) -> List[Dict]:
    """
    Loads all .txt files from the given folder, cleans text, and returns a list of dicts:
    [{'filename': ..., 'text': ...}, ...]
    """
    documents = []
    txt_files = glob.glob(os.path.join(folder_path, "*.txt"))
    for file_path in txt_files:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
        clean_text = " ".join(text.split())
        documents.append({
            "filename": os.path.basename(file_path),
            "text": clean_text
        })
    return documents

# --- 2. Chunker ---
def chunk_document(text: str, chunk_size: int = 400, overlap: int = 50) -> List[str]:
    """
    Splits text into chunks of chunk_size words with overlap.
    Returns list of chunk strings.
    """
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i:i+chunk_size]
        if chunk:
            chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks

# --- 3. Embedding Generator ---
def get_groq_embeddings(texts: List[str], api_key: str, model: str = None) -> np.ndarray:
    """
    Get embeddings for a list of texts using Groq API.
    Returns numpy array of shape (len(texts), embedding_dim)
    """
    embedder = GroqEmbedder(api_key=api_key, model=model)
    return embedder.get_embeddings(texts)

# --- 4. FAISS Indexer ---
def build_faiss_index(embeddings: np.ndarray) -> faiss.IndexFlatL2:
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    return index

# --- 5. Save/Load Metadata ---
def save_metadata(metadata: List[Dict], path: str):
    with open(path, "wb") as f:
        pickle.dump(metadata, f)

def load_metadata(path: str) -> List[Dict]:
    with open(path, "rb") as f:
        return pickle.load(f)

# --- 6. RAG Service Class ---
class RAGService:
    def __init__(self, docs_folder: str, faiss_path: str, meta_path: str, groq_api_key: str, embed_model: str = None):
        self.docs_folder = docs_folder
        self.faiss_path = faiss_path
        self.meta_path = meta_path
        self.groq_api_key = groq_api_key
        self.embed_model = embed_model
        self.index = None
        self.metadata = None
        if os.path.exists(faiss_path) and os.path.exists(meta_path):
            self.index = faiss.read_index(faiss_path)
            self.metadata = load_metadata(meta_path)

    def build(self):
        documents = load_documents(self.docs_folder)
        all_chunks = []
        all_meta = []
        for doc in documents:
            chunks = chunk_document(doc["text"])
            for idx, chunk in enumerate(chunks):
                all_chunks.append(chunk)
                all_meta.append({
                    "filename": doc["filename"],
                    "chunk_id": idx,
                    "text": chunk
                })
        print(f"Total chunks: {len(all_chunks)}")
        if not all_chunks:
            print('No chunks found. Check your source documents.')
            return  # Stop building index if no chunks
        embeddings = get_groq_embeddings(all_chunks, self.groq_api_key, self.embed_model)
        self.index = build_faiss_index(embeddings)
        self.metadata = all_meta
        faiss.write_index(self.index, self.faiss_path)
        save_metadata(self.metadata, self.meta_path)

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict]:
        if self.index is None or self.metadata is None:
            raise RuntimeError("Index or metadata not loaded. Run build() first.")
        query_emb = get_groq_embeddings([query], self.groq_api_key, self.embed_model)
        D, I = self.index.search(query_emb, top_k)
        results = []
        for idx in I[0]:
            if idx < len(self.metadata):
                results.append(self.metadata[idx])
        return results

# --- Example Usage ---
if __name__ == "__main__":
    # Set your Groq API key here or use environment variable
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    EMBED_MODEL = os.getenv("GROQ_EMBED_MODEL", "openai/gpt-oss-20b")
    rag = RAGService(
        docs_folder="../../rag/source_docs/",
        faiss_path="../../rag/index.faiss",
        meta_path="../../rag/metadata.pkl",
        groq_api_key=GROQ_API_KEY,
        embed_model=EMBED_MODEL
    )
    # Build index (run once, or when docs change)
    rag.build()
    # Retrieve
    results = rag.retrieve("What is the event schedule?", top_k=3)
    for r in results:
        print(f"From {r['filename']} (chunk {r['chunk_id']}):\n{r['text']}\n---")
