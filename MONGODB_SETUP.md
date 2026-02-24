# 🗄️ MongoDB Atlas Setup Guide - Step by Step

## 📝 COMPLETE MONGODB ATLAS SETUP (5-10 minutes)

### **Step 1: Create MongoDB Atlas Account**

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with:
   - Email
   - OR Google account (faster)
   - OR GitHub account

3. Complete the registration

---

### **Step 2: Create a FREE Cluster**

After login, you'll see "Create a deployment" or "Build a Database":

1. Choose: **M0 FREE** (shared cluster - completely free forever)
   - Storage: 512 MB (enough for prototype)
   - RAM: Shared
   - No credit card required!

2. **Select Cloud Provider & Region:**
   - Provider: AWS, Google Cloud, or Azure (any is fine)
   - Region: Choose closest to you (e.g., Mumbai, Singapore, etc.)
   - Click **"Create Deployment"**

3. **Security Quickstart:**

   **A. Create Database User:**
   - Username: `campusops_user` (or anything you want)
   - Password: Click "Autogenerate Secure Password"
   - **IMPORTANT: Copy and save this password!** ⚠️
   - Click "Create Database User"

   **B. Add IP Address:**
   - You'll see "IP Access List"
   - Click "Add My Current IP Address"
   - OR for easy development: Add `0.0.0.0/0` (allows from anywhere)
   - Click "Add Entry"
   - Click "Finish and Close"

---

### **Step 3: Get Your Connection String**

1. Click **"Connect"** button on your cluster

2. Choose: **"Drivers"** (not Compass, not Shell)

3. Select:
   - Driver: **Python**
   - Version: **3.12 or later** (or whatever you have)

4. You'll see a connection string like:

   ```
   mongodb+srv://campusops_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Copy this string**

6. **IMPORTANT:** Replace `<password>` with the actual password you saved earlier

   Example:

   ```
   # BEFORE (what you copy)
   mongodb+srv://campusops_user:<password>@cluster0.xxxxx.mongodb.net/

   # AFTER (what you use)
   mongodb+srv://campusops_user:MySecurePassword123@cluster0.xxxxx.mongodb.net/
   ```

---

### **Step 4: Update Your .env File**

1. Open: `e:\PROJECTS\AMD\Project\campusOps\.env`

2. Find this line:

   ```env
   MONGODB_URI=mongodb://localhost:27017/
   ```

3. Replace with your connection string:

   ```env
   MONGODB_URI=mongodb+srv://campusops_user:YourPassword@cluster0.xxxxx.mongodb.net/
   ```

4. Save the file

---

### **Step 5: Test the Connection**

1. Stop your Flask server (press CTRL+C in the terminal)

2. Start it again:

   ```bash
   python main.py
   ```

3. You should now see:
   ```
   ✅ Connected to MongoDB: campusops
   ```

---

## 🎯 WHAT MONGODB DOES FOR YOU

Your cluster will store:

- ✅ User accounts (club logins)
- ✅ Event history and data
- ✅ Generated reports and documents
- ✅ Feedback submissions
- ✅ Budget records
- ✅ File metadata

**Collections (tables) created automatically:**

- `users` - User accounts
- `clubs` - Club information
- `events` - Event data
- `budgets` - Budget records
- `feedback` - Feedback analysis
- `documents` - Generated docs (MOUs, proposals)

---

## 🔧 MANAGING YOUR DATABASE

### **View Your Data:**

1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections"
3. You'll see all your data here
4. Can search, edit, delete manually if needed

### **Check Connection:**

Open browser: http://localhost:8000/

Should show:

```json
{
  "status": "healthy",
  "services": {
    "database": true,
    "llm": true
  }
}
```

---

## 🆘 TROUBLESHOOTING

### **Problem: "Authentication failed"**

- Check password is correct in connection string
- Password should NOT have special characters like: `@`, `:`, `/`, `?`, `#`, `[`, `]`
- If it does, use URL encoding or change password in Atlas

### **Problem: "IP not whitelisted"**

- Go to Atlas → Network Access
- Add your IP or use `0.0.0.0/0` for development

### **Problem: "Connection timeout"**

- Check your internet connection
- Try a different region when creating cluster
- Firewall might be blocking MongoDB Atlas

### **Problem: Still showing localhost error**

- Make sure .env file is saved
- Restart Flask server (CTRL+C then python main.py)
- Check no typos in connection string

---

## 🔐 SECURITY BEST PRACTICES

### **For Development (Now):**

✅ Use `0.0.0.0/0` for IP whitelist (easy access)
✅ Simple password is okay
✅ Free tier is fine

### **For Production (Later):**

⚠️ Whitelist specific IPs only
⚠️ Use strong passwords
⚠️ Enable database encryption
⚠️ Use environment variables (never commit to git)

---

## 📊 MONGODB ATLAS FEATURES YOU'LL USE

1. **Database**: `campusops` (created automatically)
2. **Collections**: Created when you insert first document
3. **Free Monitoring**: See queries, performance
4. **Backup**: Automatic daily backups (on paid plans)
5. **Alerts**: Get notified of issues

---

## ✅ FINAL CHECKLIST

After setup, verify:

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] IP address whitelisted (0.0.0.0/0 or your IP)
- [ ] Connection string copied
- [ ] `<password>` replaced with actual password
- [ ] `.env` file updated with MONGODB_URI
- [ ] Flask server restarted
- [ ] Connection successful (✅ in terminal)
- [ ] Health check shows database: true

---

## 🎉 SUCCESS!

Once you see:

```
✅ Connected to MongoDB: campusops
```

You're ready to go! Your app will now:

- Store all generated reports
- Save feedback analysis
- Track events and budgets
- Persist user sessions
- Keep file metadata

---

## 📝 QUICK REFERENCE

**Your MongoDB Info:**

- **Cluster Name**: cluster0 (or what you named it)
- **Database Name**: campusops
- **Username**: (you chose this)
- **Password**: (you saved this)
- **Connection String**: (in your .env file)

**Important URLs:**

- Atlas Dashboard: https://cloud.mongodb.com
- Documentation: https://docs.mongodb.com/manual/
- Support: https://www.mongodb.com/community/forums/

---

**Need Help?**

- Check the troubleshooting section above
- MongoDB Atlas has great docs
- Your data is safe in the cloud
- Free tier never expires!

---

_MongoDB Atlas = Your cloud database that scales with you_ 🚀
