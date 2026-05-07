@echo off
cd /d "%~dp0"

echo [1/3] Masuk ke folder proyek...
if exist "package.json" (
    echo [OK] Sudah berada di folder proyek.
) else if exist "SIMPEG-main\package.json" (
    cd SIMPEG-main
) else if exist "arkeusarsipkeuangansmart\package.json" (
    cd arkeusarsipkeuangansmart
)

echo [2/3] Mencoba Commit...
git add .
git commit -m "Add Quick Filter Chips and update Firestore security rules"

echo [3/3] Mencoba Push ke semua kemungkinan cabang...
:: Menggunakan HEAD untuk push cabang yang sedang aktif saat ini
git push origin HEAD

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo PUSH GAGAL. Mencoba paksa ke main...
    git push origin main
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo MASIH GAGAL. Mencoba ke master...
    git push origin master
)

echo.
echo Selesai!
pause
