
import os
import google.generativeai as genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in environment variables")
    print("Please set your Gemini API key in the .env file")

genai.configure(api_key=api_key)

# Initialize model and chat
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_route():
    global chat
    
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    # Handle clear chat command
    if user_message == '__CLEAR_CHAT__':
        chat = model.start_chat(history=[])
        return jsonify({'response': 'Chat cleared'})

    try:
        # Check if API key is configured
        if not api_key:
            return jsonify({'error': 'API key not configured. Please set GEMINI_API_KEY in .env file'}), 500
            
        response = chat.send_message(user_message)
        return jsonify({'response': response.text})
    except Exception as e:
        error_message = str(e)
        if "API_KEY_INVALID" in error_message:
            error_message = "API key tidak valid. Silakan periksa konfigurasi API key Anda."
        elif "QUOTA_EXCEEDED" in error_message:
            error_message = "Kuota API telah habis. Silakan coba lagi nanti."
        elif "SAFETY" in error_message:
            error_message = "Pesan Anda tidak dapat diproses karena alasan keamanan."
        
        return jsonify({'error': error_message}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'api_configured': bool(api_key)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


