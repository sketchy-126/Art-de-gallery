@echo off
REM Exo-Arts Gallery - Quick Start Script (Windows)

echo 🎨 Starting Exo-Arts Gallery...
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ✅ Dependencies installed!
echo.
echo 🚀 Starting servers...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers
start "Backend Server" cmd /k "cd backend && npm start"
start "Frontend Server" cmd /k "cd frontend && npm run dev"
