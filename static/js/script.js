class GeminiChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearButton = document.getElementById('clearChat');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.charCount = document.querySelector('.char-count');
        
        this.isLoading = false;
        this.messageHistory = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.adjustTextareaHeight();
    }
    
    bindEvents() {
        // Send message events
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Input events
        this.messageInput.addEventListener('input', () => {
            this.adjustTextareaHeight();
            this.updateCharCount();
            this.toggleSendButton();
        });
        
        // Clear chat
        this.clearButton.addEventListener('click', () => this.clearChat());
        
        // Auto-focus input
        this.messageInput.focus();
    }
    
    adjustTextareaHeight() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }
    
    updateCharCount() {
        const length = this.messageInput.value.length;
        this.charCount.textContent = `${length}/2000`;
        
        if (length > 1800) {
            this.charCount.style.color = '#ea4335';
        } else if (length > 1500) {
            this.charCount.style.color = '#fbbc05';
        } else {
            this.charCount.style.color = 'var(--on-surface-variant)';
        }
    }
    
    toggleSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isLoading;
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isLoading) return;
        
        // Clear input
        this.messageInput.value = '';
        this.adjustTextareaHeight();
        this.updateCharCount();
        this.toggleSendButton();
        
        // Hide welcome message if it exists
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Show loading
        this.showLoading();
        
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.addMessage(data.response, 'assistant');
            } else {
                this.addMessage(`Maaf, terjadi kesalahan: ${data.error}`, 'assistant', true);
            }
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('Maaf, terjadi kesalahan koneksi. Silakan coba lagi.', 'assistant', true);
        } finally {
            this.hideLoading();
        }
    }
    
    addMessage(text, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? 'U' : 'G';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        if (isError) {
            content.style.background = '#fce8e6';
            content.style.color = '#d93025';
        }
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        content.appendChild(messageText);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store in history
        this.messageHistory.push({ text, sender, timestamp: new Date() });
    }
    
    showLoading() {
        this.isLoading = true;
        this.loadingIndicator.classList.add('show');
        this.toggleSendButton();
        this.scrollToBottom();
    }
    
    hideLoading() {
        this.isLoading = false;
        this.loadingIndicator.classList.remove('show');
        this.toggleSendButton();
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
    
    clearChat() {
        // Show confirmation
        if (this.messageHistory.length > 0) {
            if (!confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
                return;
            }
        }
        
        // Clear messages
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach(message => message.remove());
        
        // Show welcome message
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        
        // Clear history
        this.messageHistory = [];
        
        // Reset chat session on backend
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: '__CLEAR_CHAT__' })
        }).catch(error => console.error('Error clearing chat:', error));
        
        // Focus input
        this.messageInput.focus();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeminiChatbot();
});

// Add some utility functions
function formatTime(date) {
    return date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Could add a toast notification here
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to clear chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('clearChat').click();
    }
    
    // Escape to focus input
    if (e.key === 'Escape') {
        document.getElementById('messageInput').focus();
    }
});

