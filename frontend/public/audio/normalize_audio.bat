@echo off
setlocal enabledelayedexpansion

REM Audio Normalization Script with -14 LUFS Standard
REM Usage: normalize_audio.bat [folder_path]
REM If no folder path provided, processes current directory

echo ================================================
echo     Audio Normalization Tool (-14 LUFS)
echo ================================================
echo.

REM Set target folder (use parameter or current directory)
set "TARGET_FOLDER=%~1"
if "%TARGET_FOLDER%"=="" set "TARGET_FOLDER=%CD%"

echo Target folder: %TARGET_FOLDER%
echo.

REM Change to target directory
cd /d "%TARGET_FOLDER%" || (
    echo ERROR: Cannot access folder %TARGET_FOLDER%
    pause
    exit /b 1
)

REM Path to audio normalizer executable
set NORMALIZER="C:\Users\azusaing\.cargo\bin\audio_normalizer.exe"

REM Check if normalizer exists
if not exist %NORMALIZER% (
    echo ERROR: Audio normalizer not found at %NORMALIZER%
    echo.
    echo Please ensure the audio_normalizer is built and available.
    echo You can also use ffmpeg-normalize as an alternative:
    echo   pip install ffmpeg-normalize
    echo   ffmpeg-normalize -f input.wav -o output.wav -t -14
    echo.
    pause
    exit /b 1
)

echo Scanning for audio files...
echo NOTE: Your audio_normalizer only supports WAV files.
echo MP3/FLAC files will be skipped. Convert them to WAV first if needed.
echo.

REM Count total files for progress tracking (exclude already normalized files)
set /a total=0
set /a skipped=0
for /r %%f in (*.wav) do (
    set "filename=%%~nf"
    echo !filename! | findstr /i "^normalized_" >nul
    if !errorlevel! neq 0 (
        set /a total+=1
    ) else (
        set /a skipped+=1
    )
)

echo Found %total% files to process
if %skipped% gtr 0 echo Skipping %skipped% already normalized files
echo.

if %total%==0 (
    echo No new files to process.
    pause
    exit /b 0
)

echo Starting normalization to -14 LUFS...
echo ================================================

REM Process each audio file recursively - only WAV files supported by your normalizer
set /a processed=0
set /a success=0
set /a failed=0

for /r %%f in (*.wav) do (
    set "filepath=%%f"
    set "filename=%%~nf"
    set "filedir=%%~dpf"
    
    REM Skip files that already start with "normalized_"
    echo !filename! | findstr /i "^normalized_" >nul
    if !errorlevel! neq 0 (
        set /a processed+=1
        
        REM Create normalized filename
        set "output_file=!filedir!normalized_!filename!.wav"
        
        REM Skip if normalized version already exists
        if not exist "!output_file!" (
            echo [!processed!/!total!] Processing: %%~nxf
            
            REM Run normalization to -14 LUFS with 500ms fade in/out
            %NORMALIZER% normalize --lufs=-14 --fade-in 0.5 --fade-out 0.5 "!filepath!" "!output_file!"
            
            if !errorlevel!==0 (
                echo   ✓ SUCCESS: !output_file!
                set /a success+=1
            ) else (
                echo   ✗ FAILED: !filepath!
                set /a failed+=1
            )
        ) else (
            echo [!processed!/!total!] SKIP: %%~nxf (already exists)
        )
        echo.
    )
)

echo ================================================
echo NORMALIZATION COMPLETE
echo ================================================
echo Total processed: %processed%
echo Successful: %success%
echo Failed: %failed%
echo Skipped: %skipped%
echo.
echo All files normalized to -14 LUFS standard
echo ================================================
pause
