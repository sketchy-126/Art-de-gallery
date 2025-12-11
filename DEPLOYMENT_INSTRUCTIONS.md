# Deployment Instructions

## Frontend Deployment (Static Hosting)

### Option 1: GitHub Pages

1. **Build the frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Push the `frontend/dist` folder to a `gh-pages` branch
   - Enable GitHub Pages in repository settings

### Option 2: Manual Deploy

```bash
cd frontend
npm install
npm run build
# Upload dist/ folder to any static hosting service
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