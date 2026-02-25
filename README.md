# 🎓 CampusOps - AI-Powered Club Management Platform

**CampusOps** is a comprehensive club management platform with AI-powered features for event planning, feedback analysis, and document generation.

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-black)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)

---

## ✨ Features

### 🔐 **Authentication System**

- Multi-club registration and login
- JWT-based authentication
- Secure password handling
- Session persistence

### 📊 **Dashboard**

- Personalized club dashboard
- Real-time stats tracking
- Quick action buttons
- Beautiful gradient UI

### 🤖 **AI-Powered Tools**

- **Event Report Generator**: Create event plans, summaries, and reports using AI
- **Feedback Analyzer**: Analyze CSV feedback with sentiment analysis
- **Budget Suggester**: RAG-powered budget recommendations
- **MOU Generator**: AI-assisted MOU document creation

### 💾 **Cloud Database**

- MongoDB Atlas integration
- Shared database across all team members
- Real-time data synchronization

---

## 🚀 Quick Start

### **For Team Members:**

**👉 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup instructions**

**TL;DR:**

```bash
# 1. Clone the repo
git clone https://github.com/asmita-27/campusOps.git
cd campusOps

# 2. Backend setup
cd backend
cp .env.example .env
pip install -r requirements.txt
python main.py

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm start
```

Visit: http://localhost:3000

---

## 📂 Project Structure

```
Project Structure

amd/              # Local environment variables (not committed)
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
```

## 🚀 Installation Steps

### 1. Create Virtual Environment

```bash
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-proj-...your-key-here...
```

### 5. Run the Server

```bash
python main.py
```

Or use uvicorn directly:

```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## 📝 API Endpoints

### Health Check

```
GET /
```

### Generate Document

```
POST /generate
```

**Request (form-data):**

- `event_description` (string, required): Description of the event
- `document_type` (string, required): Type of document (event_plan, summary, report)

**Example using curl:**

```bash
curl -X POST "http://localhost:8000/generate" \
  -F "event_description=Annual tech conference with 500 attendees" \
  -F "document_type=event_plan"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "title": "Annual Tech Conference",
    "overview": "...",
    "objectives": ["..."],
    "timeline": [...],
    "resources": [...],
    "budget": {...},
    "team": [...]
  },
  "metadata": {
    "event_description": "Annual tech conference with 500 attendees",
    "document_type": "event_plan"
  }
}
```

## 📖 API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔧 Supported Document Types

- `event_plan`: Comprehensive event planning document
- `summary`: Event summary with key points
- `report`: Detailed event report with analysis
- Custom types: The system will generate appropriate structure

## 🛠️ Development

### Testing the API

Using Python requests:

```python
import requests

response = requests.post(
    "http://localhost:8000/generate",
    data={
        "event_description": "Annual tech conference with 500 attendees",
        "document_type": "event_plan"
    }
)
print(response.json())
```

### Configuration

Modify `llm_service.py` to change:

- OpenAI model (default: `gpt-4o-mini`)
- Temperature settings
- Max tokens
- System prompts

## 📦 Dependencies

- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **OpenAI**: OpenAI API client
- **python-dotenv**: Environment variable management
- **python-multipart**: Form data parsing

## 🔒 Security Notes

- Never commit `.env` file with real API keys
- Update CORS origins in production
- Implement rate limiting for production use
- Add authentication if needed

## 📄 License

MIT
