#!/usr/bin/env python3
"""
Script runner untuk Gemini Chatbot
Alternatif untuk menjalankan aplikasi dengan konfigurasi yang lebih fleksibel
"""

import os
import sys
from app import app

def main():
    """Main function untuk menjalankan aplikasi"""
    
    # Check if API key is configured
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("=" * 60)
        print("⚠️  WARNING: GEMINI_API_KEY tidak ditemukan!")
        print("=" * 60)
        print("Untuk menggunakan chatbot ini, Anda perlu:")
        print("1. Dapatkan API key dari: https://makersuite.google.com/app/apikey")
        print("2. Buat file .env di folder ini")
        print("3. Tambahkan: GEMINI_API_KEY=your_api_key_here")
        print("=" * 60)
        print("Aplikasi akan tetap berjalan, tapi chat tidak akan berfungsi.")
        print("=" * 60)
    else:
        print("✅ API key ditemukan!")
        print("🚀 Memulai Gemini Chatbot...")
    
    # Get port from environment or use default
    port = int(os.environ.get("PORT", 5000))
    host = os.environ.get("HOST", "0.0.0.0")
    debug = os.environ.get("FLASK_ENV") == "development"
    
    print(f"🌐 Server akan berjalan di: http://localhost:{port}")
    print("📱 Untuk akses dari device lain, gunakan IP address komputer ini")
    print("🛑 Tekan Ctrl+C untuk menghentikan server")
    print("=" * 60)
    
    try:
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        print("\n👋 Server dihentikan. Terima kasih!")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

