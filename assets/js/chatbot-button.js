// Georg Fischer WMS Chatbot Button
// Floating button to access the AI assistant from any page

class ChatbotButton {
    constructor() {
        this.isOpen = false;
        this.unreadCount = 0;
        this.init();
    }

    init() {
        this.createButton();
        this.createChatWidget();
        this.setupEventListeners();
        this.loadChatState();
    }

    createButton() {
        const button = document.createElement('div');
        button.className = 'gf-chatbot-button';
        button.innerHTML = `
            <div class="chatbot-button-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span class="chatbot-notification-badge" style="display: none;">1</span>
            </div>
            <div class="chatbot-button-tooltip">KI-Assistent</div>
        `;
        
        document.body.appendChild(button);
        this.button = button;
    }

    createChatWidget() {
        const widget = document.createElement('div');
        widget.className = 'gf-chatbot-widget';
        widget.style.display = 'none';
        widget.innerHTML = `
            <div class="chatbot-widget-header">
                <div class="chatbot-widget-title">
                    <div class="chatbot-status-indicator"></div>
                    <h3>WMS KI-Assistent</h3>
                </div>
                <div class="chatbot-widget-actions">
                    <button class="chatbot-minimize" title="Minimieren">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"/>
                        </svg>
                    </button>
                    <button class="chatbot-fullscreen" title="Vollbild">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
                        </svg>
                    </button>
                    <button class="chatbot-close" title="Schließen">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="chatbot-widget-messages" id="widget-messages">
                <div class="widget-welcome-message">
                    <div class="welcome-icon">👋</div>
                    <h4>Willkommen beim WMS KI-Assistenten!</h4>
                    <p>Ich kann Ihnen bei allen Fragen zum Warehouse Management System helfen.</p>
                    <div class="quick-actions">
                        <button class="quick-action" data-action="help">Wie kann ich helfen?</button>
                        <button class="quick-action" data-action="training">Schulung starten</button>
                        <button class="quick-action" data-action="troubleshoot">Problem melden</button>
                    </div>
                </div>
            </div>
            
            <div class="chatbot-widget-input">
                <div class="widget-input-container">
                    <textarea 
                        id="widget-input" 
                        placeholder="Stellen Sie Ihre Frage..."
                        rows="1"
                        maxlength="500"
                    ></textarea>
                    <button id="widget-send" class="widget-send-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>
                <div class="widget-input-actions">
                    <button class="widget-action" id="widget-voice" title="Sprachaufnahme">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8"/>
                        </svg>
                    </button>
                    <button class="widget-action" id="widget-attach" title="Datei anhängen">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                        </svg>
                    </button>
                    <span class="widget-char-count">0/500</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        this.widget = widget;
    }

    setupEventListeners() {
        // Button click
        this.button.addEventListener('click', () => this.toggleChat());

        // Widget controls
        const closeBtn = this.widget.querySelector('.chatbot-close');
        const minimizeBtn = this.widget.querySelector('.chatbot-minimize');
        const fullscreenBtn = this.widget.querySelector('.chatbot-fullscreen');
        
        closeBtn.addEventListener('click', () => this.closeChat());
        minimizeBtn.addEventListener('click', () => this.minimizeChat());
        fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Input handling
        const input = this.widget.querySelector('#widget-input');
        const sendBtn = this.widget.querySelector('#widget-send');
        
        input.addEventListener('input', () => this.handleInputChange());
        input.addEventListener('keydown', (e) => this.handleKeyPress(e));
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Quick actions
        const quickActions = this.widget.querySelectorAll('.quick-action');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => this.handleQuickAction(btn.dataset.action));
        });

        // Voice input
        const voiceBtn = this.widget.querySelector('#widget-voice');
        if ('webkitSpeechRecognition' in window) {
            voiceBtn.addEventListener('click', () => this.startVoiceRecognition());
        } else {
            voiceBtn.style.display = 'none';
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        this.widget.style.display = 'flex';
        this.button.classList.add('active');
        this.clearNotification();
        
        // Focus input
        setTimeout(() => {
            const input = this.widget.querySelector('#widget-input');
            input.focus();
        }, 100);
        
        // Save state
        this.saveChatState();
    }

    closeChat() {
        this.widget.style.display = 'none';
        this.button.classList.remove('active');
        this.isOpen = false;
        this.saveChatState();
    }

    minimizeChat() {
        this.closeChat();
    }

    toggleFullscreen() {
        if (this.widget.classList.contains('fullscreen')) {
            this.widget.classList.remove('fullscreen');
        } else {
            this.widget.classList.add('fullscreen');
            // Navigate to full chatbot page
            window.location.href = '/pages/chatbot/';
        }
    }

    handleInputChange() {
        const input = this.widget.querySelector('#widget-input');
        const sendBtn = this.widget.querySelector('#widget-send');
        const charCount = this.widget.querySelector('.widget-char-count');
        
        const length = input.value.length;
        charCount.textContent = `${length}/500`;
        sendBtn.disabled = length === 0;
        
        // Auto-resize textarea
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage() {
        const input = this.widget.querySelector('#widget-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        this.handleInputChange();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'assistant');
            
            // Show notification if minimized
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, sender) {
        const messagesContainer = this.widget.querySelector('#widget-messages');
        
        // Remove welcome message if exists
        const welcomeMsg = messagesContainer.querySelector('.widget-welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `widget-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                ${this.formatMessage(content)}
            </div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const messagesContainer = this.widget.querySelector('#widget-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'widget-message assistant-message typing-indicator';
        typingDiv.id = 'widget-typing';
        
        typingDiv.innerHTML = `
            <div class="message-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typing = this.widget.querySelector('#widget-typing');
        if (typing) {
            typing.remove();
        }
    }

    handleQuickAction(action) {
        const actions = {
            help: 'Wie kann der WMS KI-Assistent mir helfen?',
            training: 'Ich möchte eine WMS-Schulung starten',
            troubleshoot: 'Ich habe ein Problem mit dem WMS'
        };
        
        if (actions[action]) {
            this.widget.querySelector('#widget-input').value = actions[action];
            this.sendMessage();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hilfe') || lowerMessage.includes('help')) {
            return `Ich kann Ihnen bei folgenden Themen helfen:

**📦 Lagerverwaltung**
• Wareneingang und -ausgang
• Bestandskontrolle
• Lagerplatzoptimierung

**🚚 Betriebsabläufe**
• Kommissionierung
• Verpackung
• Versand

**📊 Berichte & Analysen**
• Leistungsberichte
• Bestandsberichte
• Fehleranalysen

**🔧 Problemlösung**
• Systemfehler
• Prozessoptimierung
• Benutzerverwaltung

Was möchten Sie genauer wissen?`;
        }
        
        if (lowerMessage.includes('schulung') || lowerMessage.includes('training')) {
            return `Gerne helfe ich Ihnen bei der WMS-Schulung!

**Verfügbare Schulungsmodule:**
• Grundlagen für neue Mitarbeiter
• Fortgeschrittene Funktionen
• Administratorschulung
• Prozessoptimierung

Möchten Sie:
1. Eine Schulung starten? [Zum Schulungszentrum →](/pages/training/)
2. Schulungsmaterialien herunterladen?
3. Eine persönliche Schulung buchen?

Bitte wählen Sie eine Option oder stellen Sie eine spezifische Frage.`;
        }
        
        if (lowerMessage.includes('problem') || lowerMessage.includes('fehler')) {
            return `Ich helfe Ihnen gerne bei der Problemlösung!

**Um Ihnen optimal zu helfen, benötige ich:**
• Beschreibung des Problems
• Betroffener Bereich (z.B. Wareneingang, Kommissionierung)
• Fehlermeldungen (falls vorhanden)
• Zeitpunkt des Auftretens

**Sofortmaßnahmen:**
1. System neu starten
2. Cache leeren
3. [Fehlersuche-Guide](/pages/errors/) konsultieren

Für dringende Probleme:
📞 **IT-Support:** +41 81 770 5678
📞 **24/7 Notfall:** +41 81 770 9999

Beschreiben Sie Ihr Problem genauer.`;
        }
        
        // Default response
        return `Ich verstehe Ihre Anfrage. Für detaillierte Informationen empfehle ich:

• [Wissensdatenbank durchsuchen](/pages/wiki/)
• [Häufige Probleme](/pages/errors/common/)
• [Schulungsmaterialien](/pages/training/)

Oder stellen Sie mir eine spezifischere Frage zum WMS.

**Beispiele:**
• "Wie führe ich einen Wareneingang durch?"
• "Wie erstelle ich einen Bestandsbericht?"
• "Was tun bei Fehler XY?"`;
    }

    startVoiceRecognition() {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'de-DE';
        
        const voiceBtn = this.widget.querySelector('#widget-voice');
        voiceBtn.classList.add('recording');
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.widget.querySelector('#widget-input').value = transcript;
            this.handleInputChange();
        };
        
        recognition.onend = () => {
            voiceBtn.classList.remove('recording');
        };
        
        recognition.start();
    }

    showNotification() {
        this.unreadCount++;
        const badge = this.button.querySelector('.chatbot-notification-badge');
        badge.textContent = this.unreadCount;
        badge.style.display = 'flex';
        
        // Pulse animation
        this.button.classList.add('pulse');
        setTimeout(() => {
            this.button.classList.remove('pulse');
        }, 1000);
    }

    clearNotification() {
        this.unreadCount = 0;
        const badge = this.button.querySelector('.chatbot-notification-badge');
        badge.style.display = 'none';
    }

    saveChatState() {
        localStorage.setItem('gf-chatbot-state', JSON.stringify({
            isOpen: this.isOpen,
            unreadCount: this.unreadCount
        }));
    }

    loadChatState() {
        const state = localStorage.getItem('gf-chatbot-state');
        if (state) {
            const { isOpen, unreadCount } = JSON.parse(state);
            if (isOpen) {
                this.openChat();
            }
            if (unreadCount > 0) {
                this.unreadCount = unreadCount;
                this.showNotification();
            }
        }
    }
}

// Initialize chatbot button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ChatbotButton();
    });
} else {
    new ChatbotButton();
}