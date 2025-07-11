// WMS Troubleshooting Chatbot
class WMSChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.suggestedQuestions = document.getElementById('suggested-questions');
        this.questionsAnswered = 0;
        
        this.init();
    }

    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.currentTarget.getAttribute('data-message');
                this.messageInput.value = message;
                this.sendMessage();
            });
        });

        // Suggested questions
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const question = e.currentTarget.getAttribute('data-question');
                this.messageInput.value = question;
                this.sendMessage();
            });
        });

        // Chat actions
        document.getElementById('clear-chat').addEventListener('click', () => this.clearChat());
        document.getElementById('export-chat').addEventListener('click', () => this.exportChat());

        // Help toggle
        const helpToggle = document.getElementById('help-toggle');
        const helpContent = document.getElementById('help-content');
        
        helpToggle.addEventListener('click', () => {
            helpContent.style.display = helpContent.style.display === 'block' ? 'none' : 'block';
        });

        // Input suggestions
        this.messageInput.addEventListener('input', (e) => this.showSuggestions(e.target.value));
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.hideSuggestions();

        // Show typing indicator
        this.showTyping();

        // Process message and get response
        setTimeout(() => {
            const response = this.processMessage(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
            this.updateStats();
        }, 1000 + Math.random() * 1000); // Simulate thinking time
    }

    processMessage(message) {
        const searchResults = KnowledgeSearch.searchAll(message);
        
        // Handle specific error code
        if (searchResults.errorCode) {
            return this.formatErrorCodeResponse(searchResults.errorCode);
        }

        // Handle contact requests
        if (searchResults.contacts) {
            return this.formatContactsResponse();
        }

        // Handle emergency procedures
        if (searchResults.emergency) {
            return this.formatEmergencyResponse();
        }

        // Handle common actions
        if (searchResults.action) {
            return this.formatActionResponse(searchResults.action);
        }

        // Handle keyword matches
        if (searchResults.keywords.length > 0) {
            return this.formatKeywordResponse(searchResults.keywords);
        }

        // Handle general questions
        return this.handleGeneralQuestion(message);
    }

    formatErrorCodeResponse(errorCode) {
        return `
            <div class="response-card error-response">
                <div class="response-header">
                    <h4><span class="error-badge">${Object.keys(WMSKnowledgeBase.errorCodes).find(key => WMSKnowledgeBase.errorCodes[key] === errorCode)}</span> ${errorCode.title}</h4>
                    <span class="priority-badge priority-${errorCode.priority.toLowerCase()}">${errorCode.priority} Priorität</span>
                </div>
                
                <div class="response-section">
                    <h5><i class="fas fa-info-circle"></i> Beschreibung</h5>
                    <p>${errorCode.description}</p>
                </div>

                <div class="response-section">
                    <h5><i class="fas fa-search"></i> Mögliche Ursachen</h5>
                    <ul>
                        ${errorCode.causes.map(cause => `<li>${cause}</li>`).join('')}
                    </ul>
                </div>

                <div class="response-section">
                    <h5><i class="fas fa-tools"></i> Lösungsschritte</h5>
                    <ol>
                        ${errorCode.solutions.map(solution => `<li>${solution}</li>`).join('')}
                    </ol>
                </div>

                <div class="response-section">
                    <h5><i class="fas fa-cog"></i> WMS-Aktion</h5>
                    <p class="wms-action">${errorCode.wmsAction}</p>
                </div>

                ${errorCode.relatedCodes.length > 0 ? `
                <div class="response-section">
                    <h5><i class="fas fa-link"></i> Verwandte Fehlercodes</h5>
                    <div class="related-codes">
                        ${errorCode.relatedCodes.map(code => `<span class="code-link" onclick="chatbot.askAboutCode('${code}')">${code}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    formatContactsResponse() {
        return `
            <div class="response-card contacts-response">
                <div class="response-header">
                    <h4><i class="fas fa-address-book"></i> Kontaktinformationen</h4>
                </div>
                
                ${Object.entries(WMSKnowledgeBase.contacts).map(([key, contact]) => `
                    <div class="contact-item">
                        <h5><i class="fas fa-phone"></i> ${contact.name}</h5>
                        <p><strong>Zuständig für:</strong> ${contact.purpose}</p>
                        <p><strong>Wann kontaktieren:</strong> ${contact.when}</p>
                    </div>
                `).join('')}
                
                <div class="response-section">
                    <p><i class="fas fa-info-circle"></i> <strong>Tipp:</strong> Bei dringenden Problemen immer zuerst den technischen Support kontaktieren.</p>
                </div>
            </div>
        `;
    }

    formatEmergencyResponse() {
        return `
            <div class="response-card emergency-response">
                <div class="response-header">
                    <h4><i class="fas fa-exclamation-triangle"></i> Notfallverfahren</h4>
                </div>
                
                ${Object.entries(WMSKnowledgeBase.emergencyProcedures).map(([key, procedure]) => `
                    <div class="emergency-procedure">
                        <h5><i class="fas fa-ambulance"></i> ${procedure.title}</h5>
                        <ol>
                            ${procedure.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                `).join('')}
                
                <div class="response-section alert">
                    <p><i class="fas fa-warning"></i> <strong>Wichtig:</strong> Bei kritischen Systemausfällen sofort handeln und Dokumentation nicht vergessen!</p>
                </div>
            </div>
        `;
    }

    formatActionResponse(action) {
        return `
            <div class="response-card action-response">
                <div class="response-header">
                    <h4><i class="fas fa-cogs"></i> ${action.title}</h4>
                </div>
                
                <div class="response-section">
                    <h5><i class="fas fa-info-circle"></i> Beschreibung</h5>
                    <p>${action.description}</p>
                </div>

                <div class="response-section">
                    <h5><i class="fas fa-list"></i> Anwendungsfälle</h5>
                    <ul>
                        ${action.usage.map(use => `<li>${use}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    formatKeywordResponse(keywords) {
        if (keywords.length === 1) {
            return this.formatErrorCodeResponse(keywords[0]);
        }

        return `
            <div class="response-card keyword-response">
                <div class="response-header">
                    <h4><i class="fas fa-search"></i> Gefundene Störungen</h4>
                </div>
                
                <p>Ich habe ${keywords.length} relevante Störungen gefunden:</p>
                
                <div class="keyword-results">
                    ${keywords.map(code => {
                        const codeKey = Object.keys(WMSKnowledgeBase.errorCodes).find(key => WMSKnowledgeBase.errorCodes[key] === code);
                        return `
                        <div class="keyword-result-item" onclick="chatbot.askAboutCode('${codeKey}')">
                            <span class="result-code">${codeKey}</span>
                            <span class="result-title">${code.title}</span>
                            <span class="result-priority priority-${code.priority.toLowerCase()}">${code.priority}</span>
                        </div>
                        `;
                    }).join('')}
                </div>
                
                <p>Klicken Sie auf einen Fehlercode für detaillierte Informationen.</p>
            </div>
        `;
    }

    handleGeneralQuestion(message) {
        const messageLower = message.toLowerCase();
        
        // Greeting responses
        if (messageLower.includes('hallo') || messageLower.includes('hi') || messageLower.includes('guten')) {
            return `
                <div class="response-card general-response">
                    <p>Hallo! Schön, dass Sie da sind. Ich bin hier, um Ihnen bei WMS-Störungen zu helfen.</p>
                    <p><strong>Was kann ich für Sie tun?</strong></p>
                    <ul>
                        <li>Fehlercodes erklären (z.B. "10003")</li>
                        <li>Lösungsschritte bereitstellen</li>
                        <li>Kontaktinformationen geben</li>
                        <li>Notfallverfahren erklären</li>
                    </ul>
                    <p>Fragen Sie einfach nach einem Fehlercode oder beschreiben Sie Ihr Problem!</p>
                </div>
            `;
        }

        // Help responses
        if (messageLower.includes('hilfe') || messageLower.includes('help')) {
            return `
                <div class="response-card help-response">
                    <div class="response-header">
                        <h4><i class="fas fa-question-circle"></i> Wie kann ich Ihnen helfen?</h4>
                    </div>
                    
                    <div class="help-categories">
                        <div class="help-category">
                            <h5><i class="fas fa-exclamation-triangle"></i> Fehlercodes</h5>
                            <p>Fragen Sie nach spezifischen Codes wie "10003", "10006", etc.</p>
                        </div>
                        
                        <div class="help-category">
                            <h5><i class="fas fa-search"></i> Problemsuche</h5>
                            <p>Beschreiben Sie Ihr Problem: "Kommunikationsstörung", "LAM belegt", etc.</p>
                        </div>
                        
                        <div class="help-category">
                            <h5><i class="fas fa-phone"></i> Kontakte</h5>
                            <p>Fragen Sie nach "Kontakte" oder "Support"</p>
                        </div>
                        
                        <div class="help-category">
                            <h5><i class="fas fa-ambulance"></i> Notfall</h5>
                            <p>Fragen Sie nach "Notfall" oder "kritisch"</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Default response for unknown queries
        return `
            <div class="response-card default-response">
                <p>Entschuldigung, ich konnte keine spezifische Information zu Ihrer Anfrage finden.</p>
                <p><strong>Versuchen Sie es mit:</strong></p>
                <ul>
                    <li>Einem spezifischen Fehlercode (z.B. "10003")</li>
                    <li>Einer Problembeschreibung (z.B. "Kommunikationsstörung")</li>
                    <li>Nach Kontakten oder Hilfe fragen</li>
                </ul>
                
                <div class="suggested-actions">
                    <button class="suggestion-btn" onclick="chatbot.askAboutCode('10003')">Fehlercode 10003</button>
                    <button class="suggestion-btn" onclick="chatbot.sendPredefinedMessage('Notfallkontakte anzeigen')">Kontakte anzeigen</button>
                    <button class="suggestion-btn" onclick="chatbot.sendPredefinedMessage('Hilfe')">Hilfe anzeigen</button>
                </div>
            </div>
        `;
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.innerHTML = content;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    updateStats() {
        this.questionsAnswered++;
        document.getElementById('questions-answered').textContent = this.questionsAnswered;
    }

    clearChat() {
        if (confirm('Möchten Sie wirklich den gesamten Chat löschen?')) {
            // Keep only the initial bot message
            const messages = this.messagesContainer.querySelectorAll('.message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
            this.questionsAnswered = 0;
            this.updateStats();
        }
    }

    exportChat() {
        const messages = this.messagesContainer.querySelectorAll('.message');
        let chatLog = 'WMS Troubleshooting Chat Export\n';
        chatLog += '=====================================\n';
        chatLog += `Exportiert am: ${new Date().toLocaleString('de-DE')}\n\n`;

        messages.forEach(message => {
            const sender = message.classList.contains('user-message') ? 'Benutzer' : 'Assistant';
            const time = message.querySelector('.message-time').textContent;
            const text = message.querySelector('.message-text').textContent;
            
            chatLog += `[${time}] ${sender}: ${text}\n\n`;
        });

        const blob = new Blob([chatLog], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `WMS-Chat-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    showSuggestions(input) {
        if (input.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.generateSuggestions(input);
        if (suggestions.length > 0) {
            this.suggestedQuestions.innerHTML = suggestions.map(suggestion => 
                `<div class="suggestion-item" data-question="${suggestion}">${suggestion}</div>`
            ).join('');
            
            // Re-add event listeners
            this.suggestedQuestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const question = e.currentTarget.getAttribute('data-question');
                    this.messageInput.value = question;
                    this.sendMessage();
                });
            });
            
            this.suggestedQuestions.style.display = 'block';
        } else {
            this.hideSuggestions();
        }
    }

    hideSuggestions() {
        this.suggestedQuestions.style.display = 'none';
    }

    generateSuggestions(input) {
        const inputLower = input.toLowerCase();
        const suggestions = [];

        // Error code suggestions
        if (/\d/.test(input)) {
            Object.keys(WMSKnowledgeBase.errorCodes).forEach(code => {
                if (code.includes(input)) {
                    suggestions.push(`Was ist Fehlercode ${code}?`);
                }
            });
        }

        // Keyword suggestions
        Object.keys(WMSKnowledgeBase.keywords).forEach(keyword => {
            if (keyword.includes(inputLower) || inputLower.includes(keyword)) {
                suggestions.push(`Wie behebe ich ${keyword}sprobleme?`);
            }
        });

        return suggestions.slice(0, 3); // Limit to 3 suggestions
    }

    // Utility methods for external calls
    askAboutCode(code) {
        this.messageInput.value = `Was ist Fehlercode ${code}?`;
        this.sendMessage();
    }

    sendPredefinedMessage(message) {
        this.messageInput.value = message;
        this.sendMessage();
    }
}

// Initialize chatbot when page loads
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new WMSChatbot();
});