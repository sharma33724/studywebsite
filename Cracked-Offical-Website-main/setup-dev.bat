@echo off
echo 🚀 Setting up Prepify for development...
echo.

echo 📦 Installing dependencies...
call npm run install-all

echo.
echo 📝 Creating environment file...
if not exist .env (
    copy env.example .env
    echo ✅ Created .env file from env.example
    echo.
    echo ⚠️  IMPORTANT: Edit .env file with your Firebase credentials!
    echo 🔗 Get Firebase config: https://console.firebase.google.com/project/studywebsite-4f6b9/settings/general
) else (
    echo ℹ️  .env file already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Edit .env file with your Firebase credentials
echo 2. Run: npm start
echo 3. Open: http://localhost:3000
echo.
pause
