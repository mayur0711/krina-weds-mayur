@echo off
echo ===================================================
echo  Pushing Krina ^& Mayur Wedding Invitation to GitHub
echo  Repository: https://github.com/mayur0711/krina-weds-mayur.git
echo ===================================================

where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo.
    echo [!] Git is not installed on your system yet.
    echo Please download and install Git from:
    echo https://git-scm.com/download/win
    echo.
    echo After installing, run this file again!
    pause
    exit /b 1
)

cd /d "%~dp0"

if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/mayur0711/krina-weds-mayur.git
) else (
    git remote set-url origin https://github.com/mayur0711/krina-weds-mayur.git
)

echo Staging clean files...
git add .

echo Creating commit...
git commit -m "Royal Wedding Invitation of Krina & Mayur"

echo Pushing to GitHub (main branch)...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  SUCCESS! Uploaded to:
    echo  https://github.com/mayur0711/krina-weds-mayur
    echo ===================================================
) else (
    echo.
    echo [!] Git push encountered an issue. If this is your first push,
    echo     GitHub may ask you to sign in via the browser popup.
)

pause
