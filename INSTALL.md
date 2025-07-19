# Panduan Instalasi Gemini Chatbot

## Persyaratan Sistem

- Python 3.7 atau lebih baru
- pip (Python package manager)
- Koneksi internet untuk mengakses Gemini API
- Browser modern (Chrome, Firefox, Safari, Edge)

## Langkah-langkah Instalasi

### 1. Persiapan Environment

#### Windows:
```cmd
# Buka Command Prompt atau PowerShell
# Pastikan Python terinstall
python --version

# Jika belum ada, download dari python.org
```

#### macOS:
```bash
# Buka Terminal
# Install Python jika belum ada (menggunakan Homebrew)
brew install python

# Atau download dari python.org
```

#### Linux (Ubuntu/Debian):
```bash
# Update package list
sudo apt update

# Install Python dan pip
sudo apt install python3 python3-pip

# Verify installation
python3 --version
pip3 --version
```

### 2. Download dan Extract Proyek

1. Download file proyek (zip atau clone repository)
2. Extract ke folder yang diinginkan
3. Buka terminal/command prompt di folder proyek

### 3. Install Dependencies

```bash
# Masuk ke folder proyek
cd gemini-chatbot

# Install semua dependencies
pip install -r requirements.txt

# Jika menggunakan Python 3 di Linux/macOS
pip3 install -r requirements.txt
```

### 4. Dapatkan API Key Gemini

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google Anda
3. Klik "Create API Key"
4. Copy API key yang dihasilkan

### 5. Konfigurasi API Key

#### Metode 1: File .env (Recommended)
1. Buat file bernama `.env` di folder proyek
2. Tambahkan baris berikut:
```env
GEMINI_API_KEY=paste_api_key_anda_disini
```

#### Metode 2: Environment Variable
```bash
# Windows (Command Prompt)
set GEMINI_API_KEY=your_api_key_here

# Windows (PowerShell)
$env:GEMINI_API_KEY="your_api_key_here"

# macOS/Linux
export GEMINI_API_KEY="your_api_key_here"
```

### 6. Jalankan Aplikasi

#### Metode 1: Menggunakan run.py (Recommended)
```bash
python run.py
```

#### Metode 2: Menggunakan app.py langsung
```bash
python app.py
```

### 7. Akses Aplikasi

1. Buka browser
2. Kunjungi `http://localhost:5000`
3. Mulai chat dengan AI!

## Troubleshooting Instalasi

### Error: "python command not found"
- **Windows**: Install Python dari python.org dan pastikan "Add to PATH" dicentang
- **macOS**: Install Python menggunakan Homebrew atau dari python.org
- **Linux**: Install dengan `sudo apt install python3`

### Error: "pip command not found"
- **Windows**: Reinstall Python dengan opsi "Add to PATH"
- **macOS/Linux**: Install dengan `sudo apt install python3-pip` atau `brew install python`

### Error: "Permission denied"
- **Windows**: Jalankan Command Prompt sebagai Administrator
- **macOS/Linux**: Gunakan `sudo` untuk install global atau gunakan virtual environment

### Error: "Module not found" setelah install
```bash
# Coba install dengan --user flag
pip install --user -r requirements.txt

# Atau gunakan virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### Error: "API key not configured"
- Pastikan file `.env` ada di folder yang sama dengan `app.py`
- Pastikan tidak ada spasi di sekitar tanda `=` dalam file `.env`
- Pastikan API key valid dan tidak expired

### Error: "Port already in use"
```bash
# Gunakan port lain
export PORT=8000
python run.py

# Atau kill process yang menggunakan port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Linux/macOS
lsof -ti:5000 | xargs kill -9
```

## Virtual Environment (Recommended)

Untuk menghindari konflik dengan package lain:

```bash
# Buat virtual environment
python -m venv gemini-env

# Aktifkan virtual environment
# Windows
gemini-env\Scripts\activate

# macOS/Linux
source gemini-env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Jalankan aplikasi
python run.py

# Deaktivasi virtual environment (setelah selesai)
deactivate
```

## Verifikasi Instalasi

Setelah instalasi berhasil, Anda harus melihat:

1. Server Flask berjalan tanpa error
2. Pesan "✅ API key ditemukan!" (jika API key dikonfigurasi)
3. Aplikasi dapat diakses di browser
4. Chat interface muncul dengan benar
5. Dapat mengirim dan menerima pesan (jika API key valid)

## Update Aplikasi

Untuk update ke versi terbaru:

```bash
# Backup konfigurasi Anda
cp .env .env.backup

# Download versi terbaru
# Extract dan replace file

# Restore konfigurasi
cp .env.backup .env

# Update dependencies jika ada perubahan
pip install -r requirements.txt --upgrade
```

## Bantuan Lebih Lanjut

Jika masih mengalami masalah:

1. Periksa file `README.md` untuk informasi lebih detail
2. Pastikan semua persyaratan sistem terpenuhi
3. Coba jalankan dengan virtual environment
4. Periksa log error untuk informasi lebih spesifik

---

**Tips**: Simpan API key Anda dengan aman dan jangan bagikan ke orang lain!

