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
set NORMALIZER="audio_normalizer.exe"

echo Scanning for audio files...
echo NOTE: Your audio_normalizer now supports MP3, FLAC, and WAV files.
echo.

REM Count total files for progress tracking (exclude already normalized files)
set /a total=0
set /a skipped=0
for /r %%f in (*.mp3 *.flac *.wav) do (
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

REM Process each audio file recursively - MP3, FLAC, and WAV files supported
set /a processed=0
set /a success=0
set /a failed=0

for /r %%f in (*.mp3 *.flac *.wav) do (
    set "filepath=%%f"
    set "filename=%%~nf"
    set "filedir=%%~dpf"
    set "fileext=%%~xf"
    
        REM Skip files that already start with "normalized_"
        echo !filename! | findstr /i "^normalized_" >nul
        if !errorlevel! neq 0 (
            set /a processed+=1
            
            REM Create normalized filename - output as WAV
            set "normalized_file=!filedir!normalized_!filename!.wav"
            
            echo [!processed!/!total!] Processing: %%~nxf
                
                REM Run normalization to -14 LUFS with 500ms fade in/out
                %NORMALIZER% "!filepath!" "!normalized_file!" --lufs=-14 --fade-in=0.5 --fade-out=0.5 --quiet
                
            if !errorlevel!==0 (
                if exist "!normalized_file!" (
                    del "!filepath!"
                    echo   SUCCESS: %%~nxf - normalized to WAV
                    set /a success+=1
                ) else (
                    echo   FAILED: No output generated for %%~nxf
                    set /a failed+=1
                )
            ) else (
                echo   FAILED: %%~nxf
                if exist "!normalized_file!" del "!normalized_file!"
                set /a failed+=1
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
