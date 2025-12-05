# Sketchy Gallery - Deployment Guide

## Quick Fix for Images (No Backend Needed)

### Option 1: Use Public Folder (Recommended for Simple Deployment)

1. All images should be in the `public` folder
2. Reference them as `/image-name.jpg` in your code
3. When deploying to Vercel/Netlify, the public folder is automatically served

**Current Setup:**
- Artist image is now at `/artist.jpeg` (already fixed in About.tsx)
- Any new images should be added to the `public` folder

### Option 2: Use Image Hosting Service (Best for Production)

**Free Image Hosting Options:**
1. **Cloudinary** (Recommended)
   - Sign up at https://cloudinary.com
   - Upload images via dashboard
   - Use the provided URLs in your artwork data

2. **ImgBB**
   - Sign up at https://imgbb.com
   - Upload images and get direct URLs

3. **GitHub**
   - Create a public repository
   - Upload images
   - Use raw.githubusercontent.com URLs

## Backend Solution (For Advanced Features)

### Setup Backend Server

1. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start Backend Server:**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

3. **Update Frontend to Use Backend:**
   - Uncomment API calls in App.tsx
   - Set VITE_API_URL in .env.local

### Deploy Backend

**Option 1: Railway.app (Recommended)**
1. Sign up at https://railway.app
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Get your backend URL

**Option 2: Render.com**
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`

**Option 3: Heroku**
1. Install Heroku CLI
2. `heroku create sketchy-gallery-api`
3. `git push heroku main`

### Deploy Frontend

**Vercel (Recommended):**
1. Push code to GitHub
2. Import project on vercel.com
3. Add environment variable: `VITE_API_URL=your-backend-url`
4. Deploy

**Netlify:**
1. Push code to GitHub
2. Import project on netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`

## Current Image References

### Images to Upload:
1. **Artist Image**: `public/artist.jpeg` ✅ (Already in public folder)
2. **Artwork Images**: Currently using placeholder URLs from picsum.photos

### To Fix Artwork Images:

**Option A: Upload to Cloudinary**
```typescript
// In data.ts, replace URLs like:
imageUrl: 'https://picsum.photos/id/1016/800/1000'
// With your Cloudinary URLs:
imageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234/artwork1.jpg'
```

**Option B: Use Backend**
1. Start backend server
2. Use Admin Dashboard to upload images
3. Images stored in `server/uploads/`
4. URLs automatically generated

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api  # Development
# VITE_API_URL=https://your-backend.railway.app/api  # Production
```

### Backend (server/.env)
```
PORT=5000
NODE_ENV=production
```

## Troubleshooting

### Images Not Showing After Deployment

1. **Check image paths**: Use `/image.jpg` not `./image.jpg`
2. **Verify public folder**: Images must be in `public/` folder
3. **Check console**: Look for 404 errors in browser console
4. **CORS issues**: Ensure backend has CORS enabled
5. **Image URLs**: Use absolute URLs for external images

### Backend Connection Issues

1. **Check API URL**: Verify VITE_API_URL is correct
2. **CORS**: Backend must allow frontend domain
3. **Network**: Check if backend is accessible
4. **Logs**: Check backend logs for errors

## Recommended Deployment Strategy

**For Quick Launch (No Backend):**
1. Upload all images to Cloudinary
2. Update image URLs in data.ts
3. Deploy frontend to Vercel
4. Done! ✅

**For Full Features (With Backend):**
1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Connect them via environment variables
4. Upload images through Admin Dashboard
5. Done! ✅

## Support

If you need help with deployment, check:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Cloudinary Docs: https://cloudinary.com/documentation
