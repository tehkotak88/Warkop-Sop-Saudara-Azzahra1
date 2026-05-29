@echo off
REM Quick GIF Conversion Batch Script for Windows
REM Make sure FFmpeg is installed first: choco install ffmpeg

echo Converting videos to GIFs...
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: FFmpeg is not installed or not in PATH
    echo Please install FFmpeg first:
    echo   choco install ffmpeg
    echo   OR
    echo   Download from: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM Run the Node.js conversion script
echo Starting conversion process...
echo.

node scripts\convert-videos-to-gif.js

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Video conversion completed!
    echo GIF files have been created in public\instagram\
) else (
    echo.
    echo [ERROR] Conversion failed. Please check the error messages above.
)

pause
