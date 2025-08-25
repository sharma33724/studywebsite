# Prepify Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Step 1: Navigate to the Project Directory
Open your terminal/command prompt and navigate to the project folder:
```bash
cd Cracked-Offical-Website-main
```

### Step 2: Install Dependencies
Install all required packages for both server and client:
```bash
npm run install-all
```

### Step 3: Start the Application

#### Option A: Start Both Server and Client (Recommended)
```bash
npm run dev
```
This will start both the backend server and frontend client simultaneously.

#### Option B: Start Only the Client
```bash
npm run start:client
```

#### Option C: Start Only the Server
```bash
npm run server
```

### Step 4: Access the Application
- **Frontend**: Open your browser and go to `http://localhost:3000`
- **Backend**: The server will run on a different port (check terminal output)

### Troubleshooting

#### If you get "package.json not found" error:
Make sure you're in the correct directory (`Cracked-Offical-Website-main`), not the parent folder.

#### If dependencies are missing:
Run `npm run install-all` again to ensure all packages are installed.

#### If the client won't start:
1. Navigate to the client directory: `cd client`
2. Run: `npm start`

### Available Scripts
- `npm run dev` - Start both server and client
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run start:client` - Alternative way to start the client
- `npm run build` - Build the client for production
- `npm run install-all` - Install all dependencies

### Project Structure
```
Cracked-Offical-Website-main/
├── client/          # React frontend
├── server/          # Node.js backend
├── functions/       # Firebase functions
└── package.json     # Root package.json with scripts
```

That's it! The application should now be running and accessible in your browser.
