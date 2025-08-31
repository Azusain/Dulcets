@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

echo ================================================
echo      Audio Config Generator Launcher
echo ================================================
echo.

echo Available options:
echo 1. Python version (recommended - gets real duration, better cleaning)
echo 2. Batch version (basic - uses placeholder duration)
echo 3. Manual JSON update only
echo.

choice /c 123 /m "Select option"

if errorlevel 3 goto manual
if errorlevel 2 goto batch
if errorlevel 1 goto python

:python
echo.
echo Launching Python version...
echo ================================================

REM Check if Python is available
python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ERROR: Python not found. Please install Python or use batch version.
    echo.
    pause
    goto batch
)

REM Check if mutagen is available
python -c "import mutagen" >nul 2>&1
if !errorlevel! neq 0 (
    echo Installing required Python package (mutagen)...
    pip install mutagen
)

REM Run Python script
python generate-audio-config.py
goto end

:batch
echo.
echo Launching Batch version...
echo ================================================
call generate-audio-config.bat
goto end

:manual
echo.
echo Manual JSON Update Mode
echo ================================================
echo.
echo This will commit the current audio-config.json without processing.
echo Make sure you have manually updated the file paths.
echo.
pause

cd /d "%~dp0..\.."
git add public/audio/audio-config.json
git commit -m "Update audio configuration manually"
echo.
echo ✓ Configuration committed to git
goto end

:end
echo.
echo ================================================
echo Task completed. Press any key to continue...
pause >nul
