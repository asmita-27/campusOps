# CampusOps AI Backend

FastAPI backend for AI-powered event management and document generation.

## 📁 Project Structure

```
amd/
├── main.py              # FastAPI application and endpoints
├── llm_service.py       # OpenAI integration service
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md           # This file
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
