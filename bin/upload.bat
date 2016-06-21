@echo off
cls

title Screeps script uploader
@echo Screeps script uploader
@echo =======================
@echo.

@echo Mirroring sources directory...
@echo.
@echo.
robocopy .\src\ "C:\Users\Tim\AppData\Local\Screeps\scripts\screeps.com\ScreepsAI" /MIR

@echo.
@echo.
@echo Done.
@echo The game should now sync the new files.
