# 🚀 CampusOps Setup Guide

Quick setup guide for team members cloning the repository.

---

## ⚡ Quick Setup (5 minutes)

### **Prerequisites:**

- Python 3.8+
- Node.js 16+
- Git

---

## **Step 1: Clone the Repository**

```bash
git clone https://github.com/asmita-27/campusOps.git
cd campusOps
```

---

## **Step 2: Backend Setup**

### **2.1 Navigate to backend folder**

```bash
cd backend
```

### **2.2 Create .env file**

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

**✅ The `.env.example` already contains the correct values!**

- MongoDB Atlas connection (shared database)
- Groq API key (for AI features)
- JWT secret (for authentication)

**No need to change anything unless instructed!**

### **2.3 Install Python dependencies**

```bash
pip install -r requirements.txt
```

### **2.4 Start the backend**

```bash
python main.py
```

**Expected output:**

```
* Running on http://0.0.0.0:8000
MongoDB: True  ← Must be True!
LLM Service: True
```

✅ **If you see `MongoDB: True`, you're connected to the shared database!**

---

## **Step 3: Frontend Setup**

### **3.1 Open a NEW terminal and navigate to frontend**

```bash
cd frontend
```

### **3.2 Install Node dependencies**

```bash
npm install
```

### **3.3 Start the frontend**

```bash
npm start
```

**Frontend will open at:** http://localhost:3000

---

## **Step 4: Verify Everything Works**

### **4.1 Check Backend Health**

Visit: http://localhost:8000/health

Should see:

```json
{
  "status": "healthy",
  "services": {
    "database": true,   ← Must be true!
    "llm": true
  }
}
```

### **4.2 Test Login**

1. Go to http://localhost:3000/login
2. Try demo credentials:
   - Email: `tech@example.com`
   - Password: `tech123`

3. ✅ If login works → You're connected to the shared database!

---

## **🔗 Shared Database Access**

**All team members connect to the SAME MongoDB Atlas database:**

- **Connection:** `mongodb+srv://publicUser:...@cluster0.8jq3wkr.mongodb.net/`
- **Database:** `CollegeClubs`
- **Collection:** `clubs`

**What this means:**

- ✅ Users registered on ANY PC are visible on ALL PCs
- ✅ You can login with accounts created by other team members
- ✅ All data is synchronized in real-time

---

## **📝 Testing Shared Database**

### **Test on PC 1:**

1. Go to http://localhost:3000/signup
2. Create account: `test@club.com` / `test123`
3. ✅ Account saved to cloud database

### **Test on PC 2:**

1. Pull latest code: `git pull`
2. Setup backend (steps above)
3. Go to http://localhost:3000/login
4. Login with: `test@club.com` / `test123`
5. ✅ Should work! (because it's in the shared database)

---

## **🆘 Troubleshooting**

### **Problem: "MongoDB: False" when starting backend**

**Solution:**

1. Check if `.env` file exists in `backend/` folder
2. Verify `MONGODB_URI` in `.env` matches exactly:
   ```
   mongodb+srv://publicUser:Siddhesh5@cluster0.8jq3wkr.mongodb.net/CollegeClubs?retryWrites=true&w=majority
   ```
3. Restart backend: `python main.py`

### **Problem: "Cannot login with existing account"**

**Cause:** Not connected to shared database

**Solution:**

1. Visit http://localhost:8000/health
2. Check if `"database": true`
3. If false, recreate `.env` from `.env.example`

### **Problem: "Module not found" errors**

**Backend:**

```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**

```bash
cd frontend
npm install
```

### **Problem: Port already in use**

**Backend (Port 8000):**

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**Frontend (Port 3000):**

```bash
# It will ask to use port 3001 instead - say Yes
```

---

## **📂 Project Structure**

```
campusOps/
├── backend/              # Flask API
│   ├── .env             # ⚠️ Create this! (copy from .env.example)
│   ├── main.py          # Backend entry point
│   ├── requirements.txt # Python dependencies
│   └── ...
├── frontend/            # React UI
│   ├── src/
│   └── package.json
└── README.md
```

---

## **✅ Success Checklist**

After setup, verify:

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] http://localhost:8000/health shows `"database": true`
- [ ] Can login with demo credentials
- [ ] Can create new account
- [ ] Can see dashboard after login

---

## **🎯 Next Steps**

Once setup is complete:

1. Test all features on the dashboard
2. Create sample club accounts
3. Start developing new features!

---

## **👥 Team Collaboration**

**Important Notes:**

- ✅ All team members use the SAME `.env` file (from `.env.example`)
- ✅ All connect to the SAME MongoDB database
- ✅ Users created by anyone are visible to everyone
- ❌ DO NOT push `.env` to GitHub (it's in `.gitignore`)
- ✅ DO update `.env.example` if you add new environment variables

---

**Need help?** Contact the team lead or check the main README.md
