# Exo-Arts Gallery

A modern art gallery web application with backend API and admin dashboard.

## Project Structure

```
exo-arts-gallery/
├── backend/          # Node.js + Express API server
├── frontend/         # React + Vite application
└── docs/            # Documentation files
```

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
```

**Frontend (.env.local):**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Dashboard:** Click "Admin" in footer, login to manage artworks

## Features

- 🎨 Beautiful art gallery with filtering
- 🔐 Admin dashboard for artwork management
- 📱 Responsive design
- 🖼️ Base64 image storage (deployment-ready)
- 🔄 Multi-device sync via backend API
- 🤖 AI Art Advisor (optional)

## Deployment

See [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) for detailed deployment instructions.

### Quick Deploy

**Backend:** Railway, Render, or Heroku (deploy `backend/` directory)
**Frontend:** Netlify, GitHub Pages, or any static hosting (deploy `frontend/` directory)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (recommended) or JSON file storage
- CORS enabled

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [Backend Sync Guide](docs/BACKEND_SYNC_GUIDE.md)
- [Base64 Storage Guide](docs/BASE64_STORAGE_GUIDE.md)
- [Troubleshooting](docs/DEPLOYMENT_TROUBLESHOOTING.md)

## License

MIT

## Author

Benard Mugambi
