Write-Host "🚀 Starting Crackd Official Server..." -ForegroundColor Green
Write-Host ""
Write-Host "📚 This will start your backend API on port 5000" -ForegroundColor Cyan
Write-Host "🌍 Open http://localhost:5000 in your browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 To run the frontend, open another terminal and run: npm run start:client" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

node server/index.js 