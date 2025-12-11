# Vercel Deployment Guide for Exo-Arts Gallery Frontend

## 📋 Deployment Steps

### 1. **Vercel Project Settings**
- **Root Directory**: Set to `frontend` in Vercel dashboard
- **Framework Preset**: Vite (auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

### 2. **Environment Variables**
Add these in Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.railway.app/api
GEMINI_API_KEY=your_gemini_key_here
```

### 3. **vercel.json Configuration**
The `vercel.json` file in this directory contains:

- **Schema validation**: `$schema` for autocompletion
- **Clean URLs**: Removes `.html` extensions 
- **SPA Routing**: All routes redirect to `index.html` for React Router

## 🚀 Deployment Options

### Option 1: Automatic (Recommended)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Deploy automatically on push

### Option 2: Manual
```bash
cd frontend
npm install
npm run build
# Upload dist/ folder to Vercel
```

## 🔧 Configuration Details

### Clean URLs
- `/about.html` → `/about` (automatic redirect)
- Cleaner URLs for better SEO

### SPA Routing
- Direct links work: `yoursite.com/gallery`
- Page refreshes work on any route
- React Router handles client-side navigation

## 🌐 After Deployment

1. **Test all routes**: `/`, `/gallery`, `/about`, `/contact`
2. **Verify API connection**: Check browser console for errors
3. **Test admin dashboard**: Login and manage artworks
4. **Update backend CORS**: Add your Vercel domain if needed

## 📞 Troubleshooting

### Build Fails
- Check `npm run build` works locally
- Verify all dependencies in `package.json`
- Check TypeScript errors

### Routes Don't Work
- Ensure `vercel.json` has rewrite rules
- Check React Router configuration

### API Connection Issues
- Verify `VITE_API_URL` environment variable
- Check backend CORS settings
- Test API endpoints directly

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Documentation](https://reactrouter.com/)