# 🔑 .env FILE SETUP GUIDE

## 📋 WHAT IS THE .env FILE?

The `.env` file stores **secret keys and configuration** that should NOT be committed to Git.

Location: `e:\PROJECTS\AMD\Project\campusOps\.env`

---

## ✅ REQUIRED KEYS (You MUST set these)

### 1. **GROQ_API_KEY** ⭐ MOST IMPORTANT

**What it does**: Powers all AI features (LLM, embeddings, text generation)

**How to get it:**

1. Go to: **https://console.groq.com/keys**
2. Sign up with Google/GitHub (fastest)
3. Click "Create API Key"
4. Name it: "CampusOps Development"
5. Copy the key (starts with `gsk_...`)
6. Paste in .env file:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Without this key**: App will run but AI features won't work!

---

### 2. **MONGODB_URI** ⭐ HIGHLY RECOMMENDED

**What it does**: Connects to your database for storing data

**Option A - MongoDB Atlas (Cloud, RECOMMENDED):**

Follow the guide in [MONGODB_SETUP.md](MONGODB_SETUP.md)

Your connection string will look like:

```env
MONGODB_URI=mongodb+srv://campusops_user:YourPassword@cluster0.xxxxx.mongodb.net/
```

**Option B - Skip for Now (App works without it):**

Leave as default:

```env
MONGODB_URI=mongodb://localhost:27017/
```

App will work without database, but won't save data permanently.

---

## 🔧 OPTIONAL KEYS (Can skip for prototype)

### 3. **SECRET_KEY** & **JWT_SECRET_KEY**

**What they do**: Secure sessions and authentication tokens

**Current values**: Good enough for development

**For production**: Generate secure random keys:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy output and paste in .env:

```env
SECRET_KEY=a1b2c3d4e5f6...
JWT_SECRET_KEY=x1y2z3a4b5c6...
```

---

### 4. **Other Settings** (Usually don't need to change)

```env
MONGODB_DB_NAME=campusops          # Database name (keep default)
FLASK_ENV=development               # Environment mode
FLASK_DEBUG=True                    # Debug mode (keep True for development)
HOST=0.0.0.0                       # Server host (allows network access)
PORT=8000                          # Server port (change if already in use)
JWT_ALGORITHM=HS256                # JWT algorithm (keep default)
JWT_EXPIRATION_HOURS=24            # Token expiry (24 hours)
GROQ_EMBED_MODEL=nomic-embed-text-v1.5  # Embedding model (keep default)
```

---

## 🎯 QUICK START CHECKLIST

For your prototype to work, you need:

- [x] **GROQ_API_KEY** - ⭐ MUST HAVE
- [ ] **MONGODB_URI** - Recommended (follow MONGODB_SETUP.md)
- [ ] Other keys - Optional (defaults work fine)

---

## 📝 STEP-BY-STEP SETUP

### **Step 1: Get Groq API Key** (2 minutes)

1. Visit: https://console.groq.com/keys
2. Sign up/Login
3. Create new API key
4. Copy the key
5. Open: `e:\PROJECTS\AMD\Project\campusOps\.env`
6. Find line: `GROQ_API_KEY=your_groq_api_key_here`
7. Replace with: `GROQ_API_KEY=gsk_your_actual_key`
8. Save file

### **Step 2: Setup MongoDB** (10 minutes - Optional but recommended)

Follow the complete guide: [MONGODB_SETUP.md](MONGODB_SETUP.md)

Summary:

1. Create free MongoDB Atlas account
2. Create free cluster (M0)
3. Create database user + password
4. Whitelist IP (use 0.0.0.0/0 for development)
5. Copy connection string
6. Replace `<password>` in connection string
7. Update MONGODB_URI in .env
8. Save file

### **Step 3: Restart Server**

```bash
# Stop server (CTRL+C in terminal)
# Start again:
python main.py
```

Should see:

```
✅ Groq LLM Service initialized
✅ Connected to MongoDB: campusops  (if you set up MongoDB)
```

---

## 🔍 HOW TO CHECK IF KEYS ARE WORKING

### **Test Groq API:**

Open browser: http://localhost:8000/

Should show:

```json
{
  "services": {
    "llm": true
  }
}
```

If `"llm": false` → Check your GROQ_API_KEY

### **Test MongoDB:**

Open browser: http://localhost:8000/

Should show:

```json
{
  "services": {
    "database": true
  }
}
```

If `"database": false` → Check your MONGODB_URI

---

## 🔒 SECURITY NOTES

### **✅ DO:**

- Keep .env file private (it's in .gitignore)
- Use different keys for development vs production
- Regenerate keys if you accidentally commit them

### **❌ DON'T:**

- Never commit .env to Git
- Never share API keys publicly
- Don't use same keys across multiple projects

---

## 🆘 TROUBLESHOOTING

### **"GROQ_API_KEY not found"**

- Check .env file exists in project root
- Check no typos in key name
- Check key starts with `gsk_`
- No quotes needed: `GROQ_API_KEY=gsk_xxxx` (NOT `"gsk_xxxx"`)

### **"MongoDB connection failed"**

- If using Atlas: Check connection string is correct
- Check password has no special characters or is URL-encoded
- Check IP is whitelisted in Atlas
- If using local: Install MongoDB or skip for now

### **"Port already in use"**

- Change PORT in .env: `PORT=8001`
- Or kill process using port 8000

---

## 📊 WHAT EACH SERVICE DOES

| Key            | Service  | Purpose                               | Priority    |
| -------------- | -------- | ------------------------------------- | ----------- |
| GROQ_API_KEY   | AI/LLM   | Event reports, feedback analysis, RAG | ⭐ CRITICAL |
| MONGODB_URI    | Database | Save data permanently                 | ⭐ HIGH     |
| SECRET_KEY     | Flask    | Session security                      | 🔸 MEDIUM   |
| JWT_SECRET_KEY | Auth     | Login tokens                          | 🔸 MEDIUM   |
| Others         | Config   | Fine-tuning                           | 🔹 LOW      |

---

## 🎉 READY TO GO!

Once you have:

1. ✅ GROQ_API_KEY set
2. ✅ MongoDB connected (optional)
3. ✅ Server running without errors

You can start testing features! 🚀

---

## 📱 QUICK REFERENCE

**Get API Keys:**

- Groq: https://console.groq.com/keys
- MongoDB Atlas: https://cloud.mongodb.com

**Documentation:**

- Groq Docs: https://console.groq.com/docs
- MongoDB Docs: https://docs.mongodb.com/manual/

**Your .env file location:**

```
e:\PROJECTS\AMD\Project\campusOps\.env
```

---

Need help? Check the troubleshooting section or ask! 🤝
