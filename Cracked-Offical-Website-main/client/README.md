# Crackd Official Frontend

This is the React frontend for the Crackd Official SAT Prep Platform.

## 🚀 Quick Deploy to Netlify

### Prerequisites
- Your backend is deployed on Render
- You have a Netlify account

### Deployment Steps

1. **Push your latest code to GitHub.**
2. **Go to [Netlify](https://netlify.com) and log in.**
3. **Click “Add new site” → “Import an existing project”.**
4. **Connect your GitHub repo and select it.**
5. **Set build settings:**
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. **Set environment variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-name.onrender.com`
7. **Deploy!**

### SPA Routing (React Router)
For React Router support, add a `_redirects` file in `public/` with:
```
/*    /index.html   200
```

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Create environment file:**
   Create `.env.local` in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
3. **Start development server:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts for state management
│   ├── pages/          # Page components
│   ├── config/         # Configuration files (axios, etc.)
│   └── App.js          # Main app component
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── ...
```

## 🔧 Configuration

The app uses environment variables for configuration:
- `REACT_APP_API_URL`: Backend API URL (required)

## 🎨 Features
- Modern React with hooks and context
- Tailwind CSS for styling
- Framer Motion for animations
- Responsive design
- Authentication system
- Course management
- Practice tests
- Progress tracking

## 📚 Tech Stack
- React 18
- React Router DOM
- Axios for API calls
- Tailwind CSS
- Framer Motion
- React Hot Toast
- React Icons
- And more...

## 🚨 Troubleshooting
1. **CORS Issues:** Make sure your backend CORS is configured for Netlify domains
2. **Environment Variables:** Double-check `REACT_APP_API_URL` is set correctly
3. **Build Errors:** Check Netlify build logs for missing dependencies

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) 