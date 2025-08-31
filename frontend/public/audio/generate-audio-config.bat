@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

REM Auto Audio Config Generator - Scans folders and generates config
echo ================================================
echo     Audio Config Generator
echo ================================================

REM Backup existing config
if exist "audio-config.json" copy "audio-config.json" "audio-config.json.backup" >nul

REM Start JSON
echo { > audio-config.json
set "FIRST=1"

REM Process each folder
for /d %%d in (*) do (
    set "FOLDER=%%d"
    set "ID="
    set "NAME="
    
    if /i "!FOLDER!"=="idol" (set "ID=idol" & set "NAME=IDOL")
    if /i "!FOLDER!"=="pop" (set "ID=jpop" & set "NAME=J-POP")
    if /i "!FOLDER!"=="Rock" (set "ID=jrock" & set "NAME=J-ROCK")
    if /i "!FOLDER!"=="Orchestra" (set "ID=orchestra" & set "NAME=ORCHESTRA")
    if /i "!FOLDER!"=="EDM" (set "ID=edm" & set "NAME=EDM")
    if /i "!FOLDER!"=="Game Music - BGM" (set "ID=bgm" & set "NAME=BGM")
    
    if not "!ID!"=="" (
        echo Processing: !NAME!
        if not "!FIRST!"=="1" echo , >> audio-config.json
        set "FIRST=0"
        
        echo   "!ID!": { >> audio-config.json
        echo     "id": "!ID!", >> audio-config.json
        echo     "genreName": "!NAME!", >> audio-config.json
        echo     "albumCover": "/images/music/!ID!-cover.svg", >> audio-config.json
        echo     "tracks": [ >> audio-config.json
        
        set "FIRST_TRACK=1"
        set "COUNT=0"
        
        for %%f in ("%%d\*.mp3" "%%d\*.wav" "%%d\*.flac" "%%d\*.ogg" "%%d\*.m4a") do (
            REM Process all audio files (including normalized ones)
            set "FILE=%%~nf"
                set /a COUNT+=1
                set "PATH=!FOLDER!/%%~nxf"
                
                REM Clean display name
                set "CLEAN=!FILE!"
                REM Remove normalized_ prefix
                if "!CLEAN:~0,11!"=="normalized_" set "CLEAN=!CLEAN:~11!"
                set "CLEAN=!CLEAN:【=!"
                set "CLEAN=!CLEAN:】=!"
                set "CLEAN=!CLEAN:（=!"
                set "CLEAN=!CLEAN:）=!"
                set "CLEAN=!CLEAN:_Full=!"
                set "CLEAN=!CLEAN:_demo=!"
                set "CLEAN=!CLEAN:_1=!"
                set "CLEAN=!CLEAN:_2=!"
                
                REM Get artist - using string replacement
                set "ARTIST=Dulcets"
                if not "!FILE:Shintou=!"=="!FILE!" set "ARTIST=Shintou"
                if not "!FILE:Koyaka=!"=="!FILE!" set "ARTIST=Koyaka"
                
                if not "!FIRST_TRACK!"=="1" echo , >> audio-config.json
                set "FIRST_TRACK=0"
                
                echo       { >> audio-config.json
                echo         "id": "!ID!-!COUNT!", >> audio-config.json
                echo         "fileName": "!PATH!", >> audio-config.json
                echo         "displayName": "!CLEAN!", >> audio-config.json
                echo         "artist": "!ARTIST!", >> audio-config.json
                echo         "duration": "3:30" >> audio-config.json
                echo       } >> audio-config.json
        )
        
        echo     ] >> audio-config.json
        echo   } >> audio-config.json
        echo   Added !COUNT! tracks
    )
)

echo } >> audio-config.json

echo ================================================
echo ✓ Config generated: audio-config.json
echo ✓ Backup saved: audio-config.json.backup
echo ================================================
if "%NOPAUSE%"=="" pause
