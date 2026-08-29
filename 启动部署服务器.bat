@echo off
cd /d "%~dp0"
start "plan-app-deploy" cmd /k "npm.cmd run serve"
timeout /t 2 /nobreak >nul
start "" "http://localhost:4173"
