# Exo-Arts Gallery - Setup Guide

## Project Structure

Your project is now organized into separate folders:

```
exo-arts-gallery/
├── backend/              # Backend API Server
│   ├── node_modules/
│   ├── artworks.json     # Data storage (JSON file)
│   ├── server.js         # Express server
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/             # React Frontend
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── public/          # Static assets
│   ├── App.tsx          # Main app component
│   ├── index.tsx        # Entry point
│   ├── index.html       # HTML template
│   ├── types.ts         # TypeScript types
│   ├── data.ts          # Initial data
│   ├── vite.config.ts   # Vite configuration
│   ├── tsconfig.json    # TypeScript config
│   ├── package.json
│   └── .env.example
│
├── docs/                # Documentation
│   ├── DEPLOYMENT.md
│   ├── BACKEND_SYNC_GUIDE.md
│   ├── BASE64_STORAGE_GUIDE.md
│   └── DEPLOYMENT_TROUBLESHOOTING.md
│
├── README.md            # Main readme
├── SETUP.md            # This file
└── package.json        # Root package.json (monorepo)
```

---

## Installation Steps

### Step 1: Install Root Dependencies (Optional)

This allows you to run both servers with one command:

```bash
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Installs:**
- express (web framework)
- cors (cross-origin requests)

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

**Installs:**
- react, react-dom
- vite (build tool)
- typescript
- lucide-react (icons)
- @google/genai (AI features)

---

## Configuration

### Backend Configuration

1. **Create .env file:**
```bash
cd backend
cp .env.example .env
```

2. **Edit backend/.env:**
```env
PORT=5000
NODE_ENV=development

# For MongoDB (recommended):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/exo-arts

# For JSON file storage (current):
# Leave MONGODB_URI empty or comment it out
```

### Frontend Configuration

1. **Create .env.local file:**
```bash
cd frontend
cp .env.example .env.local
```

2. **Edit frontend/.env.local:**
```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Gemini API Key (optional, for AI features)
GEMINI_API_KEY=your_api_key_here
```

---

## Running the Application

### Option 1: Run Both Servers Together (Recommended)

From the root directory:
```bash
npm run dev
```

This starts both backend and frontend simultaneously.

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:3000

---

## Accessing the Application

### Frontend
- **URL:** http://localhost:3000
- **Features:**
  - Browse art gallery
  - Filter by category
  - View artwork details
  - Contact form
  - Admin dashboard

### Backend API
- **URL:** http://localhost:5000/api
- **Endpoints:**
  - `GET /api/artworks` - Get all artworks
  - `GET /api/artworks/:id` - Get single artwork
  - `POST /api/artworks` - Create artwork
  - `PUT /api/artworks/:id` - Update artwork
  - `DELETE /api/artworks/:id` - Delete artwork
  - `POST /api/upload` - Upload image (base64)
  - `GET /api/health` - Health check

### Admin Dashboard
1. Go to http://localhost:3000
2. Scroll to footer
3. Click "Admin"
4. Login (check `frontend/components/AdminLogin.tsx` for credentials)
5. Manage artworks

---

## Development Workflow

### Making Changes

**Frontend changes:**
1. Edit files in `frontend/`
2. Vite hot-reloads automatically
3. See changes instantly in browser

**Backend changes:**
1. Edit files in `backend/`
2. Restart the server: `Ctrl+C` then `npm start`
3. Or use nodemon for auto-restart

### Adding New Artworks

**Via Admin Dashboard:**
1. Login as admin
2. Click "Add Artwork"
3. Fill in details
4. Upload image
5. Save

**Via API:**
```bash
curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Artwork",
    "artist": "Benard Mugambi",
    "category": "Painting",
    "price": 5000,
    "dimensions": "24x36",
    "year": 2025,
    "description": "Description here",
    "imageUrl": "data:image/jpeg;base64,...",
    "available": true
  }'
```

---

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Creates optimized production build in `frontend/dist/`

### Backend (No build needed)

Backend runs directly with Node.js. Just ensure:
- Dependencies installed
- Environment variables set
- MongoDB configured (if using)

---

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

**Backend:**
- Railway (recommended)
- Render
- Heroku
- DigitalOcean

**Frontend:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Use different port
PORT=5001 npm start
```

### Frontend can't connect to backend
1. Check backend is running: http://localhost:5000/api/health
2. Check VITE_API_URL in `frontend/.env.local`
3. Check CORS is enabled in backend

### No artworks showing
1. Check `backend/artworks.json` has data
2. Check browser console for errors (F12)
3. Check API response: http://localhost:5000/api/artworks

### Images not loading
1. Images stored as base64 in artworks.json
2. Check imageUrl starts with `data:image/`
3. Check file size (base64 images are large)

---

## Next Steps

1. ✅ Project reorganized into backend/frontend
2. ⏳ Set up MongoDB Atlas (optional but recommended)
3. ⏳ Deploy to production
4. ⏳ Add custom domain
5. ⏳ Set up CI/CD pipeline

---

## Need Help?

- Check [docs/](docs/) folder for detailed guides
- Open an issue on GitHub
- Contact: studio@exo-arts.com

---

## Upgrading to MongoDB

Currently using JSON file storage. To upgrade to MongoDB:

1. Create MongoDB Atlas account
2. Get connection string
3. Add to `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
4. Install MongoDB driver:
   ```bash
   cd backend
   npm install mongodb
   ```
5. Update `backend/server.js` to use MongoDB
6. Migrate data from artworks.json

See [docs/MONGODB_SETUP.md](docs/MONGODB_SETUP.md) for detailed instructions.
