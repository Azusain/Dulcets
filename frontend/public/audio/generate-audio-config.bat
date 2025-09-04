@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

echo ================================================
echo     Simple Audio Config Generator
echo ================================================

REM Backup existing config
if exist "audio-config.json" copy "audio-config.json" "audio-config.json.backup" >nul

REM Start JSON
echo { > audio-config.json
set "FIRST=1"

REM Process folders in desired order: J-POP, J-ROCK, IDOL, BGM (merged), EDM
REM J-POP
call :ProcessCategory "pop" "pops" "POPS"

REM J-ROCK  
call :ProcessCategory "Rock" "rock" "ROCK"

REM IDOL
call :ProcessCategory "idol" "idol" "IDOL"

REM BGM (merge Game Music - BGM and Orchestra)
call :ProcessBGM

REM EDM
call :ProcessCategory "EDM" "edm" "EDM"

goto :EndScript

:ProcessCategory
set "TARGET_FOLDER=%~1"
set "CATEGORY_ID=%~2"
set "CATEGORY_NAME=%~3"

if exist "!TARGET_FOLDER!" (
    echo Processing: !CATEGORY_NAME!
    if not "!FIRST!"=="1" echo , >> audio-config.json
    set "FIRST=0"
    
    echo   "!CATEGORY_ID!": { >> audio-config.json
    echo     "id": "!CATEGORY_ID!", >> audio-config.json
    echo     "genreName": "!CATEGORY_NAME!", >> audio-config.json
    echo     "albumCover": "/images/music/!CATEGORY_ID!-cover.svg", >> audio-config.json
    echo     "tracks": [ >> audio-config.json
    
    set "FIRST_TRACK=1"
    set "COUNT=0"
    
    for %%f in ("!TARGET_FOLDER!\*.mp3" "!TARGET_FOLDER!\*.wav" "!TARGET_FOLDER!\*.flac" "!TARGET_FOLDER!\*.ogg" "!TARGET_FOLDER!\*.m4a") do (
        call :ProcessTrack "!TARGET_FOLDER!" "%%f" "!CATEGORY_ID!"
    )
    
    echo     ] >> audio-config.json
    echo   } >> audio-config.json
    echo   Added !COUNT! tracks
)
goto :EOF

:ProcessBGM
echo Processing: BGM
if not "!FIRST!"=="1" echo , >> audio-config.json
set "FIRST=0"

echo   "bgm": { >> audio-config.json
echo     "id": "bgm", >> audio-config.json
echo     "genreName": "BGM", >> audio-config.json
echo     "albumCover": "/images/music/bgm-cover.svg", >> audio-config.json
echo     "tracks": [ >> audio-config.json

set "FIRST_TRACK=1"
set "COUNT=0"

REM Process Game Music - BGM folder
if exist "Game Music - BGM" (
    echo   - Processing Game Music - BGM folder
    for %%f in ("Game Music - BGM\*.mp3" "Game Music - BGM\*.wav" "Game Music - BGM\*.flac" "Game Music - BGM\*.ogg" "Game Music - BGM\*.m4a") do (
        call :ProcessTrack "Game Music - BGM" "%%f" "bgm"
    )
)

REM Orchestra folder has been merged and deleted

echo     ] >> audio-config.json
echo   } >> audio-config.json
echo   Added !COUNT! tracks
goto :EOF

:ProcessTrack
set "TRACK_FOLDER=%~1"
set "TRACK_FILE=%~2"
set "TRACK_CATEGORY=%~3"

set "FILE=%~n2"
set /a COUNT+=1
set "FILEPATH=!TRACK_FOLDER!/%~nx2"

REM Clean display name
set "CLEAN=!FILE!"
if "!CLEAN:~0,11!"=="normalized_" set "CLEAN=!CLEAN:~11!"
set "CLEAN=!CLEAN:【=!"
set "CLEAN=!CLEAN:】=!"
set "CLEAN=!CLEAN:（=!"
set "CLEAN=!CLEAN:）=!"
set "CLEAN=!CLEAN:_Full=!"
set "CLEAN=!CLEAN:_demo=!"
REM Remove trailing underscores if any
if "!CLEAN:~-1!"=="_" set "CLEAN=!CLEAN:~0,-1!"

REM Get artist - using string replacement
set "ARTIST=Dulcets"
if not "!FILE:Shintou=!"=="!FILE!" set "ARTIST=Shintou"
if not "!FILE:Koyaka=!"=="!FILE!" set "ARTIST=Koyaka"

if not "!FIRST_TRACK!"=="1" echo , >> audio-config.json
set "FIRST_TRACK=0"

echo       { >> audio-config.json
echo         "id": "!TRACK_CATEGORY!-!COUNT!", >> audio-config.json
echo         "fileName": "!FILEPATH!", >> audio-config.json
echo         "displayName": "!CLEAN!", >> audio-config.json
echo         "artist": "!ARTIST!", >> audio-config.json

REM Get duration - simple method that works
echo     - Getting duration for: %~nx2
set "DURATION=3:30"

REM Extract duration directly using one command
for /f "tokens=2" %%k in ('ffprobe -i "%~2" 2^>^&1 ^| findstr "Duration:"') do (
    set "RAWDUR=%%k"
    if "!RAWDUR:~-1!"=="," set "RAWDUR=!RAWDUR:~0,-1!"
    
    set "HH=!RAWDUR:~0,2!"
    set "MM=!RAWDUR:~3,2!"
    set "SS=!RAWDUR:~6,2!"
    
    set /a "H=1!HH!-100"
    set /a "M=1!MM!-100"
    set /a "S=1!SS!-100"
    set /a "TOTMIN=!H!*60+!M!"
    
    if !S! lss 10 (
        set "DURATION=!TOTMIN!:0!S!"
    ) else (
        set "DURATION=!TOTMIN!:!S!"
    )
)

echo     - Duration: !DURATION!
echo         "duration": "!DURATION!" >> audio-config.json
echo       } >> audio-config.json
goto :EOF

:EndScript

echo } >> audio-config.json

echo ================================================
echo ✓ Config generated: audio-config.json
echo ================================================
if "%NOPAUSE%"=="" pause
