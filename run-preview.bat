@echo off
cd /d "%~dp0"
echo ====================================================
echo  Menjalankan BookVerse Foundation Preview Server...
echo ====================================================
call npm.cmd run dev
pause
