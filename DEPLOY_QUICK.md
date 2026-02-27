# FinTrack Vercel Deployment - Quick Start

## 🚀 Deploy in 3 Steps

### 1️⃣ Deploy Backend (5 minutes)
1. Go to https://vercel.com/new
2. Select `FinTrack-Expense-tracker` repo
3. **Root Directory**: `server` ⚠️
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Random 32+ character string
   - `JWT_EXPIRE`: `30d`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `*` (update later)
5. Click **Deploy**
6. ✅ Copy your backend URL

### 2️⃣ Deploy Frontend (3 minutes)
1. Go to https://vercel.com/new again
2. Select `FinTrack-Expense-tracker` repo
3. **Root Directory**: `client` ⚠️
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from step 1
5. Click **Deploy**
6. ✅ Copy your frontend URL

### 3️⃣ Link Backend to Frontend (2 minutes)
1. Go to Backend project → Settings → Environment Variables
2. Edit `CLIENT_URL` → Set to your frontend URL
3. Go to Deployments tab → Redeploy

## ✅ Done!
Open your frontend URL and test the app!

---

**Need detailed instructions?** See [DEPLOYMENT.md](DEPLOYMENT.md)
