@echo off

set directory=%cd%

cd \Users\seba\Downloads

rem for /F "tokens=1,*" %%i in ('dir /b . ^|find /i "%1"') do @echo.move "%%~i %%~j" "%%~j"
for /F "tokens=*" %%i in ('dir /b . ^|find /i "%1"') do @echo.%%~i %%

cd %directory%