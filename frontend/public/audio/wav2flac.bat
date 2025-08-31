@echo off

echo Converting WAV files to FLAC...
echo.

for /r %%i in (*.wav) do (
    echo Converting: %%~nxi
    ffmpeg -i "%%i" "%%~dpni.flac" -y -loglevel error
    if exist "%%~dpni.flac" (
        echo Done: %%~nxi
    ) else (
        echo Failed: %%~nxi
    )
    echo.
)

echo All conversions completed!
pause