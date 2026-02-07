@echo off
chcp 65001 >nul
cd /d "%~dp0.."
set "PROJECT_PATH=%CD%"
set "DRIVE=I:"

:: Vérifier si le lecteur est déjà utilisé
if exist %DRIVE%\ (
  echo Le lecteur %DRIVE% est déjà utilisé.
  echo Supprimez-le avec: scripts\remove_subst.bat
  echo Ou utilisez un autre lecteur en modifiant DRIVE dans ce script.
  pause
  exit /b 1
)

subst %DRIVE% "%PROJECT_PATH%"
echo.
echo Lecteur virtuel créé : %DRIVE% = "%PROJECT_PATH%"
echo.
echo Pour compiler sous Windows sans erreur de chemin :
echo   1. Fermez Cursor/VS Code.
echo   2. Ouvrez le dossier %DRIVE%\ dans Cursor (Fichier ^> Ouvrir un dossier ^> %DRIVE%\)
echo   3. Lancez le build Windows depuis ce dossier.
echo.
echo Pour supprimer le lecteur plus tard : scripts\remove_subst.bat
echo.
pause
