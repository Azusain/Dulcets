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
        
        REM Process all audio formats
        for %%f in ("!FOLDER!\*.mp3" "!FOLDER!\*.wav" "!FOLDER!\*.flac" "!FOLDER!\*.ogg" "!FOLDER!\*.m4a") do (
            set "FILE=%%~nf"
            set /a COUNT+=1
            set "FILEPATH=!FOLDER!/%%~nxf"
            
            REM Clean display name
            set "CLEAN=!FILE!"
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
            echo         "fileName": "!FILEPATH!", >> audio-config.json
            echo         "displayName": "!CLEAN!", >> audio-config.json
            echo         "artist": "!ARTIST!", >> audio-config.json
            
            REM Get duration - simple method that works
            echo     - Getting duration for: %%~nxf
            set "DURATION=3:30"
            
            REM Extract duration directly using one command
            for /f "tokens=2" %%k in ('ffprobe -i "%%f" 2^>^&1 ^| findstr "Duration:"') do (
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
        )
        
        echo     ] >> audio-config.json
        echo   } >> audio-config.json
        echo   Added !COUNT! tracks
    )
)

echo } >> audio-config.json

echo ================================================
echo ✓ Config generated: audio-config.json
echo ================================================
if "%NOPAUSE%"=="" pause
