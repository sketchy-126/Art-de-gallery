# Quick Start Guide - Fixing Image Issues

## Problem
Images added manually don't show after deployment because they're stored locally.

## Solution Options

### ✅ EASIEST: Use Cloudinary (Recommended)

1. **Sign up for free**: https://cloudinary.com
2. **Upload your images**:
   - Go to Media Library
   - Upload artist.jpeg and artwork images
   - Copy the URLs

3. **Update your code**:
   ```typescript
   // In components/About.tsx
   src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234/artist.jpeg"
   
   // In data.ts for each artwork
   imageUrl: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234/artwork1.jpg'
   ```

4. **Deploy**: Push to GitHub and deploy on Vercel/Netlify

**Pros**: Free, fast, no backend needed, CDN included
**Cons**: Need to manually upload images

---

### 🚀 ADVANCED: Use Backend Server

1. **Install backend dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Start backend**:
   ```bash
   npm run dev
   ```
   (Runs on http://localhost:5000)

3. **Start frontend** (in another terminal):
   ```bash
   cd ..
   npm run dev
   ```

4. **Use Admin Dashboard**:
   - Login to admin
   - Upload images directly through the interface
   - Images stored in `server/uploads/`

**Pros**: Full control, integrated with admin panel
**Cons**: Need to deploy backend separately

---

### 📁 SIMPLE: Use Public Folder (Current Setup)

**Already Done!** ✅
- Artist image is in `public/artist.jpeg`
- Referenced as `/artist.jpeg` in About.tsx

**For new images**:
1. Add images to `public/` folder
2. Reference as `/image-name.jpg`
3. Deploy normally

**Pros**: Simple, works with any deployment
**Cons**: Images in git repo, manual management

---

## Recommended Workflow

### For Now (Quick Fix):
1. ✅ Artist image already fixed (in public folder)
2. Upload artwork images to Cloudinary
3. Update URLs in data.ts
4. Deploy to Vercel

### For Future (Professional Setup):
1. Deploy backend to Railway.app
2. Use Admin Dashboard to manage images
3. All images stored on server
4. Easy to add/edit/delete artworks

---

## Deploy Instructions

### Deploy to Vercel (Frontend):
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Deploy!
```

### Deploy Backend to Railway:
```bash
# 1. Go to railway.app
# 2. New Project → Deploy from GitHub
# 3. Select your repository
# 4. Set root directory to "server"
# 5. Deploy!
```

---

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions!
