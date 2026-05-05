@echo off
echo Mengganti nama folder...
cd /d "%~dp0"
if exist "SIMPEG-main" (
    ren "SIMPEG-main" "arkeusarsipkeuangansmart"
)

echo Masuk ke folder proyek...
cd arkeusarsipkeuangansmart

echo Menambahkan perubahan ke Git...
git add .

echo Melakukan commit...
git commit -m "Rebrand to arkeusarsipkeuangansmart and update configurations"

echo Melakukan push ke GitHub...
git push origin main

echo Selesai!
pause
