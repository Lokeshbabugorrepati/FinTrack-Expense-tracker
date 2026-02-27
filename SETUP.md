# FinTrack Setup Guide

## Prerequisites Installation

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/) (v18 or higher)

Verify installation:

```bash
node --version
npm --version
```

### 2. Install MongoDB

#### Option A: MongoDB Community Server (Recommended)

1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Install MongoDB as a service (recommended)
5. Install MongoDB Compass (optional GUI)

#### Option B: MongoDB Atlas (Cloud - Free Tier)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

**If using MongoDB Atlas:**
Update `server/.env` with your connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fintrack?retryWrites=true&w=majority
```

#### Verify MongoDB Installation (Local)

```bash
# Windows
mongod --version

# Start MongoDB service
net start MongoDB
```

## Project Setup

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd FinTrack
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/fintrack
JWT_SECRET=your_super_secret_jwt_key_change_in_production
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

## Running the Application

### Method 1: Using Two Terminals (Recommended for Development)

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Server will run on http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend will run on http://localhost:5173

### Method 2: Production Build

**Build Frontend:**

```bash
cd client
npm run build
```

**Start Backend:**

```bash
cd ../server
npm start
```

## First Time Use

1. Open http://localhost:5173 in your browser
2. Click "Register" to create a new account
3. Fill in your details (name, email, password)
4. You'll be automatically logged in and redirected to the dashboard
5. Click "Add Transaction" to create your first transaction
6. Explore the analytics and filters!

## Troubleshooting

### MongoDB Connection Error

```
✗ MongoDB Connection Error: connect ECONNREFUSED
```

**Solution:**

- Make sure MongoDB is running
- Windows: `net start MongoDB`
- Check if MongoDB is listening on port 27017
- Verify MONGO_URI in `.env` file

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

- Change PORT in `server/.env` to different port (e.g., 5001)
- Kill the process using the port
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

### Frontend Can't Connect to Backend

**Solution:**

- Make sure backend is running
- Check CORS settings in `server/server.js`
- Verify proxy settings in `client/vite.config.js`
- Clear browser cache and restart both servers

### Module Not Found Errors

**Solution:**

```bash
# Server
cd server
rm -rf node_modules package-lock.json
npm install

# Client
cd client
rm -rf node_modules package-lock.json
npm install
```

## Testing the API

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Get Transactions (replace <TOKEN> with actual token):**

```bash
curl http://localhost:5000/api/transactions \
  -H "Authorization: Bearer <TOKEN>"
```

### Using Postman

1. Import the API endpoints from README.md
2. Create an environment with BASE_URL = http://localhost:5000
3. Test each endpoint

## Development Tips

- Use `npm run dev` for auto-reload during development
- Check browser console for frontend errors
- Check terminal for backend errors
- Use React DevTools extension for debugging React components
- MongoDB Compass is great for viewing database contents

## Production Deployment

### Environment Variables for Production

Update these in your hosting platform:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
CLIENT_URL=<your-frontend-url>
```

### Deployment Platforms

- **Backend:** Heroku, Railway, Render, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (recommended)

## Project Features Checklist

✅ User Registration & Login  
✅ JWT Authentication  
✅ Add/Edit/Delete Transactions  
✅ Income & Expense Tracking  
✅ Category Management  
✅ Date-based Filtering  
✅ Analytics Dashboard  
✅ Pie Chart (Category Distribution)  
✅ Bar Chart (Monthly Overview)  
✅ Budget Warnings  
✅ Dark/Light Mode  
✅ Responsive Design  
✅ Toast Notifications  
✅ Loading States  
✅ Error Handling  
✅ Clean Logging

## Need Help?

- Check the main README.md for detailed documentation
- Review the API documentation section
- Check the troubleshooting section above
- Create an issue on GitHub

---

**Happy Tracking! 💰**
