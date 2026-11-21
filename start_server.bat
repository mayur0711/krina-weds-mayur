@echo off
title Royal Wedding Invitation - Aditi & Rahul
cd /d "%~dp0"
echo Starting Royal Wedding Invitation local preview...
powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1
pause
