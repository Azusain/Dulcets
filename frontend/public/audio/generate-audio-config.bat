@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

REM Auto Audio Config Generator with Normalization
REM This script scans audio folders, normalizes files, and generates audio-config.json

echo ================================================
echo   Auto Audio Config Generator with Normalization
echo ================================================
echo.

REM Set paths
set "AUDIO_DIR=%~dp0"
set "CONFIG_FILE=%AUDIO_DIR%audio-config.json"
set "BACKUP_CONFIG=%AUDIO_DIR%audio-config.json.backup"
set NORMALIZER="C:\Users\azusaing\Desktop\Code\audio_normalizer\build\Release\audio_normalizer.exe"

echo Target directory: %AUDIO_DIR%
echo Config file: %CONFIG_FILE%
echo.

REM Check if normalizer exists
if not exist %NORMALIZER% (
    echo WARNING: Audio normalizer not found at %NORMALIZER%
    echo Skipping normalization step. Files will be used as-is.
    echo.
    set "SKIP_NORMALIZE=1"
) else (
    echo ✓ Audio normalizer found
    set "SKIP_NORMALIZE=0"
)

REM Backup existing config
if exist "%CONFIG_FILE%" (
    copy "%CONFIG_FILE%" "%BACKUP_CONFIG%" >nul 2>&1
    echo ✓ Backed up existing config to audio-config.json.backup
)

echo.
echo Scanning for audio files and generating config...
echo ================================================

REM Start JSON generation
echo { > "%CONFIG_FILE%"

set "FIRST_GENRE=1"

REM Process each genre folder
for /d %%d in (*) do (
    set "GENRE_FOLDER=%%d"
    set "GENRE_ID="
    set "GENRE_NAME="
    
    REM Map folder names to genre IDs and names
    if /i "!GENRE_FOLDER!"=="idol" (
        set "GENRE_ID=idol"
        set "GENRE_NAME=IDOL"
    ) else if /i "!GENRE_FOLDER!"=="pop" (
        set "GENRE_ID=jpop"
        set "GENRE_NAME=J-POP"
    ) else if /i "!GENRE_FOLDER!"=="Rock" (
        set "GENRE_ID=jrock"
        set "GENRE_NAME=J-ROCK"
    ) else if /i "!GENRE_FOLDER!"=="Orchestra" (
        set "GENRE_ID=orchestra"
        set "GENRE_NAME=ORCHESTRA"
    ) else if /i "!GENRE_FOLDER!"=="EDM" (
        set "GENRE_ID=edm"
        set "GENRE_NAME=EDM"
    ) else if /i "!GENRE_FOLDER!"=="Game Music - BGM" (
        set "GENRE_ID=bgm"
        set "GENRE_NAME=BGM"
    )
    
    REM Skip if not a recognized genre folder
    if not "!GENRE_ID!"=="" (
        echo Processing genre: !GENRE_NAME! ^(!GENRE_FOLDER!^)
        
        REM Add comma if not first genre
        if not "!FIRST_GENRE!"=="1" (
            echo , >> "%CONFIG_FILE%"
        )
        set "FIRST_GENRE=0"
        
        REM Start genre object
        echo   "!GENRE_ID!": { >> "%CONFIG_FILE%"
        echo     "id": "!GENRE_ID!", >> "%CONFIG_FILE%"
        echo     "genreName": "!GENRE_NAME!", >> "%CONFIG_FILE%"
        echo     "albumCover": "/images/music/!GENRE_ID!-cover.svg", >> "%CONFIG_FILE%"
        echo     "tracks": [ >> "%CONFIG_FILE%"
        
        set "FIRST_TRACK=1"
        set "TRACK_COUNT=0"
        
        REM Process audio files in this folder
        for %%f in ("%%d\*.mp3" "%%d\*.wav" "%%d\*.flac" "%%d\*.ogg" "%%d\*.m4a") do (
            set "AUDIO_FILE=%%f"
            set "FILE_NAME=%%~nf"
            set "FILE_EXT=%%~xf"
            set "RELATIVE_PATH=!GENRE_FOLDER!/%%~nxf"
            
            REM Skip already normalized files
            echo !FILE_NAME! | findstr /i "normalized_" >nul
            if !errorlevel! neq 0 (
                set /a TRACK_COUNT+=1
                
                REM Normalize audio file if normalizer is available
                if "!SKIP_NORMALIZE!"=="0" (
                    set "NORMALIZED_FILE=!GENRE_FOLDER!/normalized_!FILE_NAME!.mp3"
                    if not exist "!NORMALIZED_FILE!" (
                        echo   → Normalizing: %%~nxf
                        %NORMALIZER% -l -14 "!AUDIO_FILE!" "!NORMALIZED_FILE!" >nul 2>&1
                        if !errorlevel!==0 (
                            set "RELATIVE_PATH=!GENRE_FOLDER!/normalized_!FILE_NAME!.mp3"
                            echo     ✓ Normalized to -14 LUFS
                        ) else (
                            echo     ✗ Normalization failed, using original
                        )
                    ) else (
                        set "RELATIVE_PATH=!GENRE_FOLDER!/normalized_!FILE_NAME!.mp3"
                        echo   → Using existing normalized: normalized_!FILE_NAME!.mp3
                    )
                )
                
                REM Generate display name (clean up filename)
                set "DISPLAY_NAME=!FILE_NAME!"
                REM Remove common prefixes and suffixes
                set "DISPLAY_NAME=!DISPLAY_NAME:【アイドル】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【Pop】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【Rock】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【Piano】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【ケルトソング】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【バラード】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【other rock】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【-14LUFS】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:【-20LUFS】=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:（Shintou）=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:（Koyaka）=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:（sn0w）=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_Full_8_Mastered=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_Kuri_Full_4=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_demo=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_Demo_01=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_piano_2=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_9=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_6=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_1=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:_2=!"
                set "DISPLAY_NAME=!DISPLAY_NAME:(2)=!"
                
                REM Determine artist from filename or use default
                set "ARTIST=Dulcets"
                echo !FILE_NAME! | findstr /i "Shintou" >nul && set "ARTIST=Shintou"
                echo !FILE_NAME! | findstr /i "Koyaka" >nul && set "ARTIST=Koyaka"
                echo !FILE_NAME! | findstr /i "sn0w" >nul && set "ARTIST=sn0w"
                if "!GENRE_ID!"=="orchestra" set "ARTIST=Sakuma遙"
                
                REM Generate duration (placeholder - you can add ffprobe to get real duration)
                set "DURATION=3:30"
                
                REM Add comma if not first track
                if not "!FIRST_TRACK!"=="1" (
                    echo , >> "%CONFIG_FILE%"
                )
                set "FIRST_TRACK=0"
                
                REM Add track to JSON
                echo       { >> "%CONFIG_FILE%"
                echo         "id": "!GENRE_ID!-!TRACK_COUNT!", >> "%CONFIG_FILE%"
                echo         "fileName": "!RELATIVE_PATH!", >> "%CONFIG_FILE%"
                echo         "displayName": "!DISPLAY_NAME!", >> "%CONFIG_FILE%"
                echo         "artist": "!ARTIST!", >> "%CONFIG_FILE%"
                echo         "duration": "!DURATION!" >> "%CONFIG_FILE%"
                echo       } >> "%CONFIG_FILE%"
            )
        )
        
        REM Close tracks array and genre object
        echo     ] >> "%CONFIG_FILE%"
        echo   } >> "%CONFIG_FILE%"
        
        echo   → Added !TRACK_COUNT! tracks
        echo.
    )
)

REM Close JSON
echo } >> "%CONFIG_FILE%"

echo ================================================
echo AUDIO CONFIG GENERATION COMPLETE
echo ================================================
echo Config file: %CONFIG_FILE%
echo Backup: %BACKUP_CONFIG%
echo.

REM Validate JSON syntax (basic check)
findstr /r "^[[:space:]]*{[[:space:]]*$" "%CONFIG_FILE%" >nul
if !errorlevel!==0 (
    echo ✓ JSON file appears to be valid
) else (
    echo ✗ WARNING: JSON file may have syntax errors
)

echo.
echo Next steps:
echo 1. Review the generated audio-config.json
echo 2. Test the music player functionality
echo 3. Adjust display names and artists as needed
echo 4. Add album covers to /images/music/ folder
echo.
pause
