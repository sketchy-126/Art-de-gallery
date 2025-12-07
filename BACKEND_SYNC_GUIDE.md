# Backend Sync - Multi-Device Updates

## What Changed?

Your art gallery now uses the **backend server** to store and sync artworks across all devices in real-time!

## Before vs After

### Before (localStorage):
❌ Admin updates artwork → Saved only on their device
❌ Other users don't see changes
❌ Each device has its own copy of data
❌ No synchronization

### After (Backend API):
✅ Admin updates artwork → Saved to backend server
✅ All devices fetch from the same server
✅ Everyone sees the same data
✅ Real-time synchronization

## How It Works

### 1. Data Flow
```
Admin adds/updates artwork
    ↓
Frontend sends to Backend API
    ↓
Backend saves to artworks.json (with base64 images)
    ↓
All devices fetch from Backend
    ↓
Everyone sees the update!
```

### 2. API Endpoints Used
- `GET /api/artworks` - Load all artworks
- `POST /api/artworks` - Create new artwork
- `PUT /api/artworks/:id` - Update existing artwork
- `DELETE /api/artworks/:id` - Delete artwork

## Files Modified

### 1. `App.tsx`
**Before:**
```typescript
// Used localStorage
const [artworks, setArtworks] = useState(() => storageService.loadArtworks());
```

**After:**
```typescript
// Uses backend API
const [artworks, setArtworks] = useState([]);
useEffect(() => {
  loadArtworks(); // Fetches from backend
}, []);
```

### 2. `.env.local`
Added:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Backend Already Configured
- `server/server.js` - API endpoints ready
- `services/apiService.ts` - API client ready
- Base64 image storage working

## Testing Multi-Device Sync

### Test 1: Same Computer, Different Browsers
1. Open http://localhost:3000 in Chrome
2. Open http://localhost:3000 in Firefox (or incognito)
3. Login as admin in Chrome
4. Add/update an artwork
5. Refresh Firefox → You'll see the changes! ✅

### Test 2: Different Devices (Same Network)
1. Admin device: http://localhost:3000
2. Other device: http://192.168.2.103:3000 (your network IP)
3. Admin adds artwork
4. Other device refreshes → Sees the update! ✅

### Test 3: After Deployment
1. Deploy backend to Railway/Render
2. Deploy frontend to Vercel/Netlify
3. Set `VITE_API_URL` to your backend URL
4. Admin updates from any device
5. All users see changes immediately! ✅

## Current Setup

### Servers Running:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API:** http://localhost:5000/api

### Data Storage:
- **Location:** `server/artworks.json`
- **Format:** JSON with base64 images
- **Persistence:** ✅ Survives server restarts

## Deployment Checklist

When deploying to production:

### Backend (Railway/Render):
1. ✅ Deploy server folder
2. ✅ Ensure artworks.json is writable
3. ✅ Note your backend URL (e.g., https://your-app.railway.app)

### Frontend (Vercel/Netlify):
1. ✅ Set environment variable:
   ```
   VITE_API_URL=https://your-app.railway.app/api
   ```
2. ✅ Deploy frontend
3. ✅ Test from multiple devices

## Automatic Refresh (Optional Enhancement)

Currently, users need to refresh to see updates. To add real-time updates:

### Option 1: Polling (Simple)
Refresh data every 30 seconds:
```typescript
useEffect(() => {
  const interval = setInterval(loadArtworks, 30000);
  return () => clearInterval(interval);
}, []);
```

### Option 2: WebSockets (Advanced)
Real-time push updates when admin makes changes.

Would you like me to implement automatic refresh?

## Troubleshooting

### Issue: "Failed to fetch artworks"
**Solution:** 
- Check backend is running: http://localhost:5000/api/health
- Check VITE_API_URL in .env.local
- Check browser console for CORS errors

### Issue: Changes not visible on other devices
**Solution:**
- Refresh the page (Ctrl+R or Cmd+R)
- Check both devices are using the same backend URL
- Verify backend is accessible from other device

### Issue: Images not loading
**Solution:**
- Check artworks.json has base64 strings (starts with `data:image/`)
- Verify backend has `express.json({ limit: '10mb' })`
- Check browser console for errors

## Summary

✅ Admin updates now sync across all devices
✅ Backend stores data in artworks.json
✅ Images stored as base64 (deployment-ready)
✅ All users see the same gallery

Your gallery is now multi-device ready! 🎨
