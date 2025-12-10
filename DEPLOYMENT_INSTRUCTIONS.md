# Deployment Instructions

## Frontend Deployment (Vercel)

### Option 1: Deploy Frontend Directory (Recommended)

1. **In Vercel Dashboard:**
   - Import project from GitHub
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

2. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   GEMINI_API_KEY=your_gemini_key_here
   ```

### Option 2: Manual Deploy from Frontend Directory

```bash
cd frontend
npm install
npm run build
# Upload dist/ folder to any static hosting
```

## Backend Deployment (Railway/Render)

1. **Deploy backend directory to Railway/Render**
2. **Root Directory**: Set to `backend`
3. **Start Command**: `npm start`
4. **Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   ```

## Full Stack Deployment

1. Deploy backend first → Get backend URL
2. Deploy frontend with backend URL in VITE_API_URL
3. Update CORS in backend if needed

## Current Setup

- **Frontend**: React + Vite in `frontend/` directory
- **Backend**: Node.js + Express in `backend/` directory  
- **Database**: MongoDB Atlas (cloud)
- **Images**: Base64 storage in MongoDB