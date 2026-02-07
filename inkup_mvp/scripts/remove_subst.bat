@echo off
set "DRIVE=I:"
if exist %DRIVE%\ (
  subst %DRIVE% /D
  echo Lecteur %DRIVE% supprimé.
) else (
  echo Le lecteur %DRIVE% n'est pas assigné.
)
pause
