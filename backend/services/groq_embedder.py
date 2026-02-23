import os
from typing import List
import numpy as np
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_EMBED_MODEL = "openai/gpt-oss-20b"  # Use a Groq-supported embedding model if available

class GroqEmbedder:
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or GROQ_API_KEY
        self.model = model or GROQ_EMBED_MODEL
        self.client = Groq(api_key=self.api_key)

    def get_embeddings(self, texts: List[str]) -> np.ndarray:
        embeddings = []
        for text in texts:
            resp = self.client.embeddings.create(input=text, model=self.model)
            embeddings.append(resp.data[0].embedding)
        return np.array(embeddings, dtype=np.float32)
