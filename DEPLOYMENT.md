# 🚀 FinTrack Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (use your GitHub account)
2. **MongoDB Atlas**: Your database should be accessible from anywhere (whitelist 0.0.0.0/0)
3. **GitHub Repository**: Your code is already pushed to GitHub ✅

---

## 📋 Deployment Steps

### **PART 1: Deploy Backend First** 🔧

#### Step 1: Login to Vercel

1. Go to https://vercel.com
2. Click "Login" and sign in with GitHub (Lokeshbabugorrepati account)
3. Authorize Vercel to access your repositories

#### Step 2: Import Backend Project

1. Click **"Add New..."** → **"Project"**
2. Find and select: `FinTrack-Expense-tracker`
3. Vercel will detect it's a monorepo - Click **"Continue"**

#### Step 3: Configure Backend Deployment

```
Project Name: fintrack-backend (or any name you prefer)
Framework Preset: Other
Root Directory: server ⚠️ IMPORTANT: Click "Edit" and select "server" folder
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

#### Step 4: Setup Backend Environment Variables

Click **"Environment Variables"** and add these:

```
MONGO_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_secure_random_string_min_32_characters
JWT_EXPIRE = 30d
NODE_ENV = production
CLIENT_URL = * (we'll update this after frontend deployment)
```

**Important Notes:**

- `MONGO_URI`: Get from MongoDB Atlas → Database → Connect → Drivers
  - Format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/fintrack?retryWrites=true&w=majority`
- `JWT_SECRET`: Generate a secure random string (32+ characters)
  - You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Make sure MongoDB Atlas Network Access allows: **0.0.0.0/0** (Allow from anywhere)

#### Step 5: Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment to complete
3. Once done, you'll see: **"Congratulations! Your project has been deployed"**
4. **COPY YOUR BACKEND URL**: https://fintrack-backend-xxxxx.vercel.app
5. Test it: Visit `https://your-backend-url.vercel.app/` - should see:
   ```json
   {
     "success": true,
     "message": "FinTrack API is running",
     "version": "1.0.0"
   }
   ```

---

### **PART 2: Deploy Frontend** 🎨

#### Step 1: Import Frontend Project

1. Go back to Vercel Dashboard
2. Click **"Add New..."** → **"Project"**
3. Select the same repository: `FinTrack-Expense-tracker`

#### Step 2: Configure Frontend Deployment

```
Project Name: fintrack-app (or any name you prefer)
Framework Preset: Vite
Root Directory: client ⚠️ IMPORTANT: Click "Edit" and select "client" folder
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Step 3: Setup Frontend Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL = https://your-backend-url.vercel.app
```

⚠️ Replace with your actual backend URL from Part 1, Step 5

#### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. **COPY YOUR FRONTEND URL**: https://fintrack-app-xxxxx.vercel.app

---

### **PART 3: Connect Frontend & Backend** 🔗

#### Update Backend CORS Settings

1. Go to Vercel Dashboard → Your Backend Project
2. Click **"Settings"** → **"Environment Variables"**
3. Find `CLIENT_URL` variable
4. Click **"Edit"** and update to your frontend URL:
   ```
   CLIENT_URL = https://your-frontend-url.vercel.app
   ```
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"..."** on latest deployment → **"Redeploy"**
8. Select **"Use existing Build Cache"** → Click **"Redeploy"**

---

## ✅ Verification & Testing

### Test Backend API

```bash
# Test root endpoint
curl https://your-backend-url.vercel.app/

# Expected response:
{
  "success": true,
  "message": "FinTrack API is running",
  "version": "1.0.0"
}
```

### Test Frontend

1. Open your frontend URL: `https://your-frontend-url.vercel.app`
2. Click **"Get Started"** or **"Sign Up"**
3. Create a test account
4. Login and test adding transactions
5. Check if dashboard shows analytics

---

## 🔧 Troubleshooting

### ❌ Backend Error: "Cannot connect to MongoDB"

**Solution:**

- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (Allow from anywhere)
- Wait 1-2 minutes for propagation

### ❌ Frontend Error: "Network Error" or "Failed to fetch"

**Solution:**

- Check `VITE_API_URL` in frontend environment variables
- Make sure it starts with `https://` and has NO trailing slash
- Correct: `https://fintrack-backend.vercel.app`
- Wrong: `https://fintrack-backend.vercel.app/` or `http://...`

### ❌ CORS Error: "Access-Control-Allow-Origin"

**Solution:**

- Update `CLIENT_URL` in backend environment variables
- Make sure it matches your EXACT frontend URL
- Redeploy backend after changing

### ❌ Backend 500 Error

**Solution:**

- Go to Vercel Dashboard → Backend Project → **"Functions"** tab
- Click on recent invocation to see error logs
- Common issues:
  - Check `MONGO_URI` is correct
  - Check `JWT_SECRET` is set
  - Check database name in connection string

---

## 📱 Custom Domain (Optional)

### For Frontend:

1. Go to Frontend Project → **"Settings"** → **"Domains"**
2. Add your domain (e.g., `fintrack.yourdomain.com`)
3. Follow DNS setup instructions

### For Backend:

1. Go to Backend Project → **"Settings"** → **"Domains"**
2. Add API subdomain (e.g., `api.fintrack.yourdomain.com`)
3. Update `VITE_API_URL` in frontend environment variables
4. Update `CLIENT_URL` in backend environment variables
5. Redeploy both projects

---

## 🔄 Updating Your App

### After making code changes:

1. Commit and push to GitHub:

   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. Vercel will **automatically redeploy** both projects! 🎉

### To disable auto-deployment:

- Go to Project Settings → Git → Uncheck "Automatic Deployments"

---

## 📊 Monitoring

### View Logs:

1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab (for backend)
3. Click **"Deployments"** → Select deployment → **"Function Logs"**

### View Analytics:

1. Go to Project → **"Analytics"** tab
2. See visitor stats, performance metrics, etc.

---

## 🎉 Success Metrics

Your deployment is successful when:

- ✅ Backend root endpoint returns JSON response
- ✅ You can register a new account
- ✅ You can login successfully
- ✅ You can add/edit/delete transactions
- ✅ Dashboard shows analytics and charts

---

## 📞 Need Help?

Common issues:

1. **MongoDB connection**: Check Network Access whitelist
2. **CORS errors**: Verify CLIENT_URL matches exactly
3. **Build errors**: Check Vercel deployment logs
4. **API not responding**: Check environment variables are set

---

## 🔐 Security Notes

1. **Never commit .env files** - They're in .gitignore ✅
2. **Use strong JWT_SECRET** - Minimum 32 characters
3. **MongoDB Password** - Use strong password from Atlas
4. **Environment Variables** - Only set in Vercel dashboard, never hardcode

---

## 📝 Deployment URLs (Fill after deployment)

```
Backend URL:  https://_________________________.vercel.app
Frontend URL: https://_________________________.vercel.app
```

---

Good luck with your deployment! 🚀
