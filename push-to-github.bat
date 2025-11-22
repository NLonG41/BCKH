@echo off
chcp 65001 >nul
cd /d "D:\Báo cáo khoa học"

echo Initializing git repository...
if not exist ".git" (
    git init
)

echo Checking remote...
git remote -v
if errorlevel 1 (
    echo No remote found. Please add remote with: git remote add origin <your-repo-url>
    pause
    exit /b 1
)

echo Adding files...
git add .

echo Committing changes...
git commit -m "Initial commit: Library management system"

echo Pushing to GitHub...
git push -u origin master
if errorlevel 1 (
    git push -u origin main
)

echo Done!
pause

