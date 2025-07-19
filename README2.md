# Gemini AI Chatbot

Chatbot AI dengan tampilan mirip Google Gemini yang menggunakan API Gemini untuk memberikan respons yang cerdas dan natural.

## Fitur

- 🎨 **Tampilan Modern**: Desain yang mirip dengan Google Gemini dengan UI yang bersih dan responsif
- 🤖 **AI Powered**: Menggunakan Google Gemini API untuk respons yang cerdas
- 💬 **Chat Real-time**: Percakapan real-time dengan indikator typing
- 📱 **Responsive**: Tampilan yang optimal di desktop dan mobile
- 🔄 **Clear Chat**: Fitur untuk menghapus riwayat percakapan
- ⌨️ **Keyboard Shortcuts**: Dukungan shortcut keyboard untuk kemudahan penggunaan

## Teknologi yang Digunakan

### Backend
- **Flask**: Web framework Python untuk backend API
- **Google Generative AI**: Library untuk integrasi dengan Gemini API
- **Flask-CORS**: Untuk menangani Cross-Origin Resource Sharing
- **Python-dotenv**: Untuk manajemen environment variables

### Frontend
- **HTML5**: Struktur halaman web
- **CSS3**: Styling dengan desain modern dan animasi
- **JavaScript (Vanilla)**: Interaksi dan komunikasi dengan backend
- **Google Fonts**: Font Google Sans untuk konsistensi dengan Gemini
- **Material Icons**: Ikon dari Google Material Design

## Struktur Proyek

```
gemini-chatbot/
├── app.py                 # Backend Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (API key)
├── templates/
│   └── index.html        # HTML template utama
├── static/
│   ├── css/
│   │   └── style.css     # Stylesheet utama
│   └── js/
│       └── script.js     # JavaScript untuk interaksi
└── README.md             # Dokumentasi proyek
```

## Instalasi dan Setup

### 1. Clone atau Download Proyek
```bash
# Jika menggunakan git
git clone <repository-url>
cd gemini-chatbot

# Atau extract file zip ke folder gemini-chatbot
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Konfigurasi API Key
1. Dapatkan API key dari [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat file `.env` di root folder proyek
3. Tambahkan API key Anda:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Jalankan Aplikasi
```bash
python app.py
```

Aplikasi akan berjalan di `http://localhost:5000`

## Cara Penggunaan

1. **Buka Browser**: Akses `http://localhost:5000`
2. **Mulai Chat**: Ketik pesan Anda di kolom input
3. **Kirim Pesan**: Tekan Enter atau klik tombol send
4. **Clear Chat**: Klik tombol refresh untuk menghapus riwayat
5. **Keyboard Shortcuts**:
   - `Ctrl/Cmd + K`: Clear chat
   - `Escape`: Focus ke input field

## API Endpoints

### GET /
Menampilkan halaman utama chatbot

### POST /chat
Endpoint untuk mengirim pesan ke AI
- **Request Body**: `{"message": "your message here"}`
- **Response**: `{"response": "AI response"}`
- **Error Response**: `{"error": "error message"}`

### GET /health
Health check endpoint
- **Response**: `{"status": "healthy", "api_configured": true/false}`

## Fitur Keamanan

- **API Key Protection**: API key disimpan dalam environment variables
- **Error Handling**: Penanganan error yang user-friendly
- **Input Validation**: Validasi input untuk mencegah request kosong
- **CORS Configuration**: Konfigurasi CORS untuk keamanan

## Customization

### Mengubah Tampilan
Edit file `static/css/style.css` untuk mengubah:
- Warna tema (CSS variables di `:root`)
- Layout dan spacing
- Animasi dan transisi
- Responsive breakpoints

### Mengubah Perilaku Chat
Edit file `static/js/script.js` untuk:
- Menambah fitur baru
- Mengubah keyboard shortcuts
- Modifikasi animasi dan interaksi

### Mengubah Backend Logic
Edit file `app.py` untuk:
- Menambah endpoint baru
- Mengubah konfigurasi model AI
- Menambah middleware atau logging

## Troubleshooting

### Error: API key not configured
- Pastikan file `.env` ada dan berisi `GEMINI_API_KEY`
- Pastikan API key valid dan aktif

### Error: Module not found
- Jalankan `pip install -r requirements.txt`
- Pastikan menggunakan Python 3.7+

### Error: Connection refused
- Pastikan Flask server berjalan di port 5000
- Check firewall settings jika mengakses dari device lain

### Chat tidak merespons
- Check console browser untuk error JavaScript
- Pastikan backend server berjalan
- Verify API key dan quota Gemini API

## Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
Untuk production, gunakan WSGI server seperti Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables untuk Production
```env
GEMINI_API_KEY=your_production_api_key
FLASK_ENV=production
```

## Kontribusi

1. Fork repository ini
2. Buat branch untuk fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lengkap.

## Kontak

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.

---

**Catatan**: Pastikan untuk tidak membagikan API key Anda secara publik. Selalu gunakan environment variables untuk menyimpan kredensial sensitif.

