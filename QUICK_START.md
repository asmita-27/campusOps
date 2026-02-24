# 🚀 QUICK START GUIDE - CampusOps Backend

## ✅ IMMEDIATE STEPS TO GET RUNNING

### **Step 1: Install Python Dependencies** (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
pip install -r requirements.txt
```

### **Step 2: Setup Environment Variables** (2 minutes)

1. Open `.env` file in root directory
2. Add your Groq API key:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
```

**Get Groq API Key:**

- Go to: https://console.groq.com/keys
- Sign up/Login
- Create a new API key
- Copy and paste it into `.env`

### **Step 3: MongoDB Setup** (Choose ONE option)

#### **Option A: Local MongoDB** (Easiest for now)

```bash
# If you have MongoDB installed locally
# The app will try to connect to: mongodb://localhost:27017/

# If connection fails, app will still work (without database features)
```

#### **Option B: MongoDB Atlas** (Cloud - Recommended)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Get connection string
5. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

#### **Option C: Skip for Now** (Works without MongoDB)

- Just leave the default setting
- App will run without database
- Features will use in-memory storage

### **Step 4: Start the Backend Server** (30 seconds)

```bash
# Make sure you're in backend folder
cd backend

# Run the Flask server
python main.py
```

You should see:

```
==================================================
🚀 Starting CampusOps Backend Server
==================================================
Environment: development
MongoDB: True/False
LLM Service: True
Server: http://0.0.0.0:8000
==================================================
```

### **Step 5: Test the API** (1 minute)

Open browser and go to:

- **Health Check**: http://localhost:8000/
- **Test Endpoint**: http://localhost:8000/test

You should see JSON responses!

---

## 🎯 CURRENT WORKING ENDPOINTS

### 1. **Event Report Generator**

```bash
POST http://localhost:8000/api/events/generate
Content-Type: multipart/form-data

Form Data:
- event_description: "Annual tech fest with 500 attendees"
- document_type: "event_plan" (or "summary" or "report")
- images: [optional files]
```

### 2. **Feedback Analyzer**

```bash
POST http://localhost:8000/api/feedback/analyze
Content-Type: multipart/form-data

Form Data:
- file: feedback.csv
```

### 3. **Budget Suggester** (Basic version)

```bash
POST http://localhost:8000/api/rag/suggest-budget
Content-Type: application/json

Body:
{
  "event_type": "Technical Workshop",
  "event_scale": "100 attendees",
  "duration": "1 day"
}
```

### 4. **MOU Generator** (Basic version)

```bash
POST http://localhost:8000/api/rag/generate-mou
Content-Type: application/json

Body:
{
  "sponsor_name": "TechCorp",
  "tier": "Platinum",
  "event_name": "Tech Summit 2026"
}
```

### 5. **Authentication**

```bash
# Get list of clubs
GET http://localhost:8000/api/auth/clubs

# Login
POST http://localhost:8000/api/auth/login
Content-Type: application/json

Body:
{
  "club_id": "tech_club",
  "password": "tech123"
}
```

**Demo Credentials:**

- tech_club / tech123
- cultural_club / culture123
- sports_club / sports123
- robotics_club / robo123

---

## 🔧 TESTING WITH FRONTEND

### **Step 1: Update Frontend API URLs**

Frontend is already pointing to `http://localhost:8000`, so should work automatically!

### **Step 2: Start Frontend**

```bash
# Open NEW terminal
cd frontend
npm start
```

Frontend will open at: http://localhost:3000

### **Step 3: Test Features**

1. **Event Report Generator**
   - Go to Event Reports section
   - Enter event description
   - Select document type
   - Click Generate
2. **Feedback Analyzer**
   - Go to Feedback section
   - Upload `feedback.csv` (in root folder)
   - Click Analyze

---

## 🐛 TROUBLESHOOTING

### **Error: "Module not found"**

```bash
# Make sure you're in backend folder
cd backend

# Reinstall dependencies
pip install -r requirements.txt
```

### **Error: "GROQ_API_KEY not found"**

- Check `.env` file exists in root folder (not backend folder)
- Make sure it has: `GROQ_API_KEY=your_key_here`
- No quotes needed around the key

### **Error: "MongoDB connection failed"**

- Don't worry! App will still work
- Features will work without database
- You can add MongoDB later

### **Error: "Address already in use"**

- Another app is using port 8000
- Change port in `.env`: `PORT=8001`
- Or kill the other process

### **CORS Error in Frontend**

- Backend CORS is already configured
- Try refreshing frontend page
- Check backend is running on port 8000

---

## ✅ WHAT'S WORKING NOW

- ✅ Flask backend server
- ✅ MongoDB connection (optional)
- ✅ Groq LLM integration
- ✅ Event report generation
- ✅ Feedback analysis
- ✅ Budget suggester (basic)
- ✅ MOU generator (basic)
- ✅ Multi-club authentication
- ✅ CORS for frontend
- ✅ Error handling
- ✅ File uploads

---

## 🎯 NEXT STEPS (DAY 2)

Tomorrow we'll add:

1. ✅ RAG integration with FAISS
2. ✅ Sample documents for RAG
3. ✅ Enhanced budget suggester with RAG
4. ✅ Enhanced MOU generator with RAG
5. ✅ Image captioning service

---

## 📝 TESTING CHECKLIST

- [ ] Backend starts without errors
- [ ] Health check works at http://localhost:8000/
- [ ] Groq API key is valid (check console output)
- [ ] MongoDB connected (optional)
- [ ] Event generation works
- [ ] Feedback analysis works
- [ ] Frontend can connect to backend
- [ ] No CORS errors

---

## 🆘 NEED HELP?

**Quick Fixes:**

1. Make sure you're in the correct folder
2. Check all dependencies are installed
3. Verify Groq API key is correct
4. Try restarting the server
5. Check terminal for error messages

**File Structure Check:**

```
campusOps/
├── .env                          ← Must exist with GROQ_API_KEY
├── backend/
│   ├── main.py                   ← Run this file
│   ├── config.py
│   ├── requirements.txt
│   ├── database/
│   │   ├── __init__.py
│   │   └── mongodb_client.py
│   ├── services/
│   │   ├── llm_service.py
│   │   └── rag_service.py
│   └── routes/
│       ├── __init__.py
│       ├── event_routes.py
│       ├── feedback_routes.py
│       ├── rag_routes.py
│       └── auth_routes.py
```

---

## 🎉 SUCCESS!

If you see this in your terminal:

```
✅ Connected to MongoDB: campusops
✅ Groq LLM Service initialized
```

**YOU'RE READY TO GO!** 🚀

Now test the endpoints and integrate with frontend!
