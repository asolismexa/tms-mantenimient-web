cd C:\Program Files\Google\Chrome\Application
IF NOT EXIST "%~dp0\.chrome" (
    ECHO El directorio .chrome no existe
    EXIT /B
)
start "" chrome.exe --disable-web-security --user-data-dir="%~dp0/.chrome"
