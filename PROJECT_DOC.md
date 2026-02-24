# CampusOps Project Documentation

## Overview
CampusOps is an AI-powered event management and reporting platform. It leverages FastAPI for backend services and integrates with Groq/OpenAI models for advanced language and vision tasks. The project is organized for modularity, scalability, and ease of deployment.

---

## Project Structure

```
amd/
├── .env               # Local environment variables (not committed)
├── .env.example       # Template for environment variables
├── .gitignore         # Git ignore rules
├── backend/
│   ├── event_report_generator.py
│   ├── feedback_analyzer.py
│   ├── image_caption_service.py
│   ├── list_groq_models.py
│   ├── llm_service.py
│   ├── main.py
│   ├── ocr_service.py
│   ├── test_api.py
│   ├── rag/
│   │   └── source_docs/
│   └── services/
│       ├── groq_embedder.py
│       ├── rag_service.py
│       ├── test_rag.py
│       └── __pycache__/
├── feedback.csv
├── README.md
├── requirements.txt
└── __pycache__/
```

---

## Key Features & Modules

### 1. FastAPI Backend (`main.py`)
- Provides REST API endpoints for document generation and health checks.
- Integrates with the LLM service for AI-powered content creation.

### 2. LLM Service (`llm_service.py`)
- Handles communication with Groq/OpenAI models.
- Supports structured content generation for event plans, summaries, and reports.

### 3. Event Report Generator (`event_report_generator.py`)
- Synthesizes event data (descriptions, images, feedback) into structured JSON reports.
- Uses Groq API for advanced summarization and recommendations.

### 4. Feedback Analyzer (`feedback_analyzer.py`)
- Reads feedback from CSV files.
- Analyzes satisfaction, top praises, and issues using Groq API.

### 5. Image Caption Service (`image_caption_service.py`)
- Uses Groq vision models to generate factual captions for event images.
- Supports async batch processing.

### 6. OCR Service (`ocr_service.py`)
- Extracts and cleans text from images using Tesseract OCR.
- Optionally corrects OCR output using Groq API.

### 7. RAG (Retrieval-Augmented Generation) Services
- `backend/services/rag_service.py`: Core logic for RAG workflows.
- `backend/services/groq_embedder.py`: Handles embedding generation.
- `backend/services/test_rag.py`: Test utilities for RAG.
- `backend/rag/source_docs/`: Storage for source documents.

### 8. API Testing (`test_api.py`)
- Contains scripts to test API endpoints (e.g., /generate).

### 9. Dependency Management (`requirements.txt`)
- Lists all Python dependencies for the project.

### 10. Environment Configuration (`.env.example`)
- Template for required environment variables (e.g., API keys).

---

## Setup & Usage

1. **Clone the Repository**
   ```sh
   git clone https://github.com/asmita-27/campusOps.git
   cd campusOps
   ```

2. **Install Dependencies**
   ```sh
   pip install -r requirements.txt
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env` and fill in required values (e.g., GROQ_API_KEY).

4. **Run the FastAPI Server**
   ```sh
   uvicorn backend.main:app --reload
   ```

5. **Test the API**
   - Use `test_api.py` or tools like Postman to interact with endpoints.

---

## Git & Deployment Notes
- The `amd` folder is now the root of the repository.
- All pushes are made from inside the `amd` directory, so the repo structure on GitHub matches the local structure.
- README.md and all main files are at the top level of the repo.

---

## Recent Changes
- Moved all main files into the `backend` folder for better organization.
- Ensured only the `amd` folder is pushed as the repo root (no nested Desktop/... path).
- Moved `README.md` to the top level of `amd`.
- Cleaned up git history and re-initialized the repo for a clean structure.

---

## Contributors
- [asmita-27](https://github.com/asmita-27)

---

## License
This project is licensed under the MIT License.
