// Enhanced WMS Troubleshooting Chatbot with new features
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
        
        if (helpToggle && helpContent) {
            helpToggle.addEventListener('click', () => {
                helpContent.style.display = helpContent.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Focus on input
        this.messageInput.focus();
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage(response, 'bot');
            this.updateQuestionCount();
        }, Math.random() * 1000 + 500);
    }

    processMessage(message) {
        // Enhanced message processing with expanded knowledge base
        const searchResults = KnowledgeSearch.searchAll(message);

        // Check for specific error code
        if (searchResults.errorCode) {
            return this.formatErrorCodeResponse(searchResults.errorCode);
        }

        // Check for support class information
        if (searchResults.supportClass) {
            return this.formatSupportClassResponse(searchResults.supportClass);
        }

        // Check for KPI information
        if (searchResults.kpiInfo && searchResults.kpiInfo.length > 0) {
            return this.formatKPIResponse(searchResults.kpiInfo);
        }

        // Check for emergency contacts
        if (searchResults.emergencyContact) {
            return this.formatEmergencyContactResponse(searchResults.emergencyContact);
        }

        // Check for training information
        if (searchResults.trainingInfo && searchResults.trainingInfo.length > 0) {
            return this.formatTrainingResponse(searchResults.trainingInfo);
        }

        // Check for training contacts
        if (searchResults.trainingContact) {
            return this.formatTrainingContactResponse(searchResults.trainingContact);
        }

        // Check for predictive alerts
        if (searchResults.predictiveAlert) {
            return this.formatPredictiveAlertResponse(searchResults.predictiveAlert);
        }

        // Check for emergency procedures
        if (searchResults.emergency) {
            return this.formatEmergencyResponse();
        }

        // Check for common actions
        if (searchResults.action) {
            return this.formatActionResponse(searchResults.action);
        }

        // Check for keyword matches
        if (searchResults.keywords.length > 0) {
            return this.formatKeywordResponse(searchResults.keywords);
        }

        // Check for contacts request (legacy)
        if (searchResults.contacts) {
            return this.formatContactsResponse();
        }

        // Handle general questions
        return this.handleGeneralQuestion(message);
    }

    formatErrorCodeResponse(errorCode) {
        const errorCodeKey = Object.keys(WMSKnowledgeBase.errorCodes).find(key => WMSKnowledgeBase.errorCodes[key] === errorCode);
        return `
            <div class="response-card error-response">
                <div class="response-header">
                    <h4><span class="error-badge">${errorCodeKey}</span> ${errorCode.title}</h4>
                    <span class="priority-badge priority-${errorCode.priority.toLowerCase()}">${errorCode.priority} Priorität</span>
                    ${errorCode.supportClass ? `<span class="support-class-badge">${WMSKnowledgeBase.supportClasses[errorCode.supportClass].title}</span>` : ''}
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

                ${errorCode.escalation ? `
                <div class="response-section escalation">
                    <h5><i class="fas fa-exclamation-triangle"></i> Eskalation</h5>
                    <p class="escalation-info">${errorCode.escalation}</p>
                </div>
                ` : ''}

                ${errorCode.kpiImpact ? `
                <div class="response-section">
                    <h5><i class="fas fa-chart-line"></i> KPI-Auswirkung</h5>
                    <p>Betrifft: ${Array.isArray(errorCode.kpiImpact) ? errorCode.kpiImpact.join(', ') : errorCode.kpiImpact}</p>
                </div>
                ` : ''}

                ${errorCode.relatedCodes && errorCode.relatedCodes.length > 0 ? `
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

    formatSupportClassResponse(supportClass) {
        return `
            <div class="response-card support-class-response">
                <div class="response-header">
                    <h4><i class="fas fa-headset"></i> ${supportClass.title}</h4>
                </div>
                
                <div class="response-section">
                    <h5><i class="fas fa-info-circle"></i> Beschreibung</h5>
                    <p>${supportClass.description}</p>
                </div>

                <div class="support-details">
                    <div class="detail-item">
                        <strong><i class="fas fa-clock"></i> Reaktionszeit:</strong> ${supportClass.responseTime}
                    </div>
                    <div class="detail-item">
                        <strong><i class="fas fa-phone"></i> Kontaktweg:</strong> ${supportClass.method}
                    </div>
                    <div class="detail-item">
                        <strong><i class="fas fa-calendar"></i> Verfügbarkeit:</strong> ${supportClass.coverage}
                    </div>
                </div>

                ${supportClass.examples ? `
                <div class="response-section">
                    <h5><i class="fas fa-list"></i> Beispiele</h5>
                    <ul>
                        ${supportClass.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    }

    formatKPIResponse(kpiList) {
        return `
            <div class="response-card kpi-response">
                <div class="response-header">
                    <h4><i class="fas fa-chart-line"></i> KPI Monitoring</h4>
                </div>
                
                ${kpiList.map(kpi => `
                    <div class="kpi-item">
                        <h5>${kpi.name}</h5>
                        <p>${kpi.description}</p>
                        <div class="kpi-metrics">
                            <span class="metric target">Ziel: ${kpi.target}</span>
                            <span class="metric alert">Alert: ${kpi.alertThreshold}</span>
                            <span class="metric category">Kategorie: ${kpi.category}</span>
                        </div>
                    </div>
                `).join('')}

                <div class="response-section">
                    <p><i class="fas fa-info-circle"></i> <strong>Data Center Integration:</strong> Diese KPIs werden automatisch überwacht und Trends analysiert.</p>
                </div>
            </div>
        `;
    }

    formatEmergencyContactResponse(contact) {
        if (contact.name) {
            // Single contact
            return `
                <div class="response-card emergency-contact-response">
                    <div class="response-header">
                        <h4><i class="fas fa-phone-alt"></i> ${contact.name}</h4>
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <strong>Zuständigkeit:</strong> ${contact.purpose}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-phone"></i> Geschäftszeiten:</strong> ${contact.phone_business}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-exclamation-triangle"></i> Notfall:</strong> ${contact.phone_emergency}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-envelope"></i> E-Mail:</strong> ${contact.email}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-clock"></i> Zeiten:</strong> ${contact.hours}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-tachometer-alt"></i> Reaktionszeit:</strong> ${contact.responseTime}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Georg Fischer contacts
            return `
                <div class="response-card emergency-contact-response">
                    <div class="response-header">
                        <h4><i class="fas fa-users"></i> Georg Fischer Ansprechpartner</h4>
                    </div>
                    
                    ${Object.entries(contact).map(([key, person]) => `
                        <div class="person-contact">
                            <h5>${person.name}</h5>
                            <p><strong>Position:</strong> ${person.role}</p>
                            <p><strong><i class="fas fa-phone"></i> Telefon:</strong> ${person.phone}</p>
                            <p><strong>Berechtigung:</strong> ${person.authorized}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    formatPredictiveAlertResponse(alerts) {
        return `
            <div class="response-card predictive-response">
                <div class="response-header">
                    <h4><i class="fas fa-brain"></i> AI-Powered Predictive Maintenance</h4>
                </div>
                
                ${Object.entries(alerts).map(([key, alert]) => `
                    <div class="alert-section">
                        <h5><i class="fas fa-robot"></i> ${alert.title}</h5>
                        <p>${alert.description}</p>
                        
                        ${alert.triggers ? `
                        <div class="alert-triggers">
                            <h6>Auslöser:</h6>
                            <ul>
                                ${alert.triggers.map(trigger => `<li>${trigger}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${alert.actions ? `
                        <div class="alert-actions">
                            <h6>Automatische Aktionen:</h6>
                            <ul>
                                ${alert.actions.map(action => `<li>${action}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        ${alert.monitoring ? `
                        <div class="monitoring-info">
                            <h6>Überwachung:</h6>
                            <ul>
                                ${alert.monitoring.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    formatTrainingResponse(trainingMatches) {
        const groupedMatches = {
            categories: trainingMatches.filter(m => m.type === 'category'),
            modules: trainingMatches.filter(m => m.type === 'module'),
            certifications: trainingMatches.filter(m => m.type === 'certification'),
            exercises: trainingMatches.filter(m => m.type === 'exercise')
        };

        return `
            <div class="response-card training-response">
                <div class="response-header">
                    <h4><i class="fas fa-graduation-cap"></i> WMS Training Information</h4>
                </div>
                
                ${groupedMatches.categories.length > 0 ? `
                <div class="training-section">
                    <h5><i class="fas fa-layer-group"></i> Trainingskategorien</h5>
                    ${groupedMatches.categories.map(match => `
                        <div class="training-category-item">
                            <h6>${match.data.title}</h6>
                            <p><strong>Dauer:</strong> ${match.data.duration}</p>
                            <p><strong>Module:</strong> ${match.data.modules.length} Trainingsmodule</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${groupedMatches.modules.length > 0 ? `
                <div class="training-section">
                    <h5><i class="fas fa-book"></i> Trainingsmodule</h5>
                    ${groupedMatches.modules.map(match => `
                        <div class="module-item">
                            <h6>${match.data.title}</h6>
                            <div class="module-details">
                                <span class="module-duration">${match.data.duration}</span>
                                <span class="module-level ${match.data.level.toLowerCase()}">${match.data.level}</span>
                            </div>
                            <p><strong>Themen:</strong> ${match.data.topics.join(', ')}</p>
                            <p><strong>Voraussetzungen:</strong> ${match.data.prerequisites}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${groupedMatches.certifications.length > 0 ? `
                <div class="training-section">
                    <h5><i class="fas fa-certificate"></i> Zertifizierungen</h5>
                    ${groupedMatches.certifications.map(match => `
                        <div class="certification-item">
                            <h6>${match.data.title}</h6>
                            <p><strong>Dauer:</strong> ${match.data.duration}</p>
                            <p><strong>Voraussetzungen:</strong> ${match.data.prerequisites}</p>
                            <div class="competencies">
                                <strong>Kompetenzen:</strong>
                                <ul>
                                    ${match.data.competencies.map(comp => `<li>${comp}</li>`).join('')}
                                </ul>
                            </div>
                            <p><strong>Prüfung:</strong> ${match.data.assessment}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${groupedMatches.exercises.length > 0 ? `
                <div class="training-section">
                    <h5><i class="fas fa-dumbbell"></i> Praktische Übungen</h5>
                    ${groupedMatches.exercises.map(match => `
                        <div class="exercise-item">
                            <h6>${match.data.title}</h6>
                            <div class="exercise-meta">
                                <span class="exercise-duration">${match.data.duration}</span>
                            </div>
                            <p><strong>Ziel:</strong> ${match.data.objective}</p>
                            <div class="exercise-tasks">
                                <strong>Aufgaben:</strong>
                                <ol>
                                    ${match.data.tasks.map(task => `<li>${task}</li>`).join('')}
                                </ol>
                            </div>
                            <p><strong>Bewertung:</strong> ${match.data.assessment}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <div class="training-action">
                    <p><i class="fas fa-info-circle"></i> <strong>Hinweis:</strong> Für weitere Informationen oder Anmeldung besuchen Sie die <a href="training.html" target="_blank">WMS Training Center</a> Seite.</p>
                </div>
            </div>
        `;
    }

    formatTrainingContactResponse(contact) {
        if (contact.contacts) {
            // Local mentors with multiple contacts
            return `
                <div class="response-card training-contact-response">
                    <div class="response-header">
                        <h4><i class="fas fa-users"></i> ${contact.name}</h4>
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <strong>Rolle:</strong> ${contact.role}
                        </div>
                        <div class="contact-item">
                            <strong>Zuständigkeiten:</strong> ${contact.responsibilities}
                        </div>
                        <div class="contact-list">
                            <strong>Ansprechpartner:</strong>
                            <ul>
                                ${contact.contacts.map(contactInfo => `<li>${contactInfo}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Single contact
            return `
                <div class="response-card training-contact-response">
                    <div class="response-header">
                        <h4><i class="fas fa-user-tie"></i> ${contact.name}</h4>
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <strong>Position:</strong> ${contact.role}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-envelope"></i> E-Mail:</strong> ${contact.email}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-phone"></i> Telefon:</strong> ${contact.phone}
                        </div>
                        <div class="contact-item">
                            <strong><i class="fas fa-clock"></i> Verfügbarkeit:</strong> ${contact.availability}
                        </div>
                        <div class="contact-item">
                            <strong>Zuständigkeiten:</strong> ${contact.responsibilities}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    formatContactsResponse() {
        // Legacy contact format - keeping for compatibility
        return `
            <div class="response-card contacts-response">
                <div class="response-header">
                    <h4><i class="fas fa-address-book"></i> Kontaktinformationen</h4>
                </div>
                
                <div class="emergency-contacts">
                    <div class="contact-item">
                        <h5><i class="fas fa-laptop-code"></i> Software Support</h5>
                        <p><strong>Telefon:</strong> +43 316 811651 8888</p>
                        <p><strong>E-Mail:</strong> support@jungheinrich.at</p>
                        <p><strong>Zeiten:</strong> Mo-Fr 06:00-22:00</p>
                        <p><strong>Notfall:</strong> 24/7 Bereitschaftsdienst</p>
                    </div>
                    
                    <div class="contact-item">
                        <h5><i class="fas fa-wrench"></i> Technischer Kundendienst</h5>
                        <p><strong>Telefon:</strong> +41 848 330 340</p>
                        <p><strong>E-Mail:</strong> Service@jungheinrich.ch</p>
                        <p><strong>Notfall:</strong> +41 62 739 32 80</p>
                        <p><strong>Zeiten:</strong> Mo-Fr 06:00-22:00</p>
                    </div>
                </div>
                
                <div class="response-section">
                    <p><i class="fas fa-info-circle"></i> <strong>Tipp:</strong> Bei kritischen Störungen (Klasse 1) sofort anrufen!</p>
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
                        
                        ${procedure.immediateActions ? `
                        <div class="immediate-actions">
                            <h6>Sofortige Maßnahmen:</h6>
                            <ol>
                                ${procedure.immediateActions.map(action => `<li>${action}</li>`).join('')}
                            </ol>
                        </div>
                        ` : ''}
                        
                        ${procedure.followUpActions ? `
                        <div class="follow-up-actions">
                            <h6>Nachfolgende Aktionen:</h6>
                            <ol>
                                ${procedure.followUpActions.map(action => `<li>${action}</li>`).join('')}
                            </ol>
                        </div>
                        ` : ''}
                        
                        ${procedure.escalationPath ? `
                        <div class="escalation-path">
                            <h6>Eskalationspfad:</h6>
                            <ul>
                                ${procedure.escalationPath.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        ${procedure.steps ? `
                        <ol>
                            ${procedure.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                        ` : ''}

                        ${procedure.preparation ? `
                        <div class="preparation">
                            <h6>Vorbereitung:</h6>
                            <ul>
                                ${procedure.preparation.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                `).join('')}
                
                <div class="response-section alert">
                    <p><i class="fas fa-warning"></i> <strong>Wichtig:</strong> Bei kritischen Systemausfällen sofort Klasse 1 Support kontaktieren!</p>
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
                    <h5><i class="fas fa-list"></i> Anwendung</h5>
                    <ul>
                        ${action.usage.map(usage => `<li>${usage}</li>`).join('')}
                    </ul>
                </div>

                ${action.kpiImpact ? `
                <div class="response-section">
                    <h5><i class="fas fa-chart-line"></i> KPI-Auswirkung</h5>
                    <p>${action.kpiImpact}</p>
                </div>
                ` : ''}

                ${action.dataCenter ? `
                <div class="response-section">
                    <h5><i class="fas fa-server"></i> Data Center Integration</h5>
                    <p>${action.dataCenter}</p>
                </div>
                ` : ''}
            </div>
        `;
    }

    formatKeywordResponse(matches) {
        const uniqueMatches = [...new Set(matches.map(m => JSON.stringify(m)))].map(m => JSON.parse(m));
        
        return `
            <div class="response-card keyword-response">
                <div class="response-header">
                    <h4><i class="fas fa-search"></i> Gefundene Störungen (${uniqueMatches.length})</h4>
                </div>
                
                <div class="keyword-matches">
                    ${uniqueMatches.map(match => {
                        const errorCode = Object.keys(WMSKnowledgeBase.errorCodes).find(key => WMSKnowledgeBase.errorCodes[key] === match);
                        return `
                            <div class="match-item">
                                <span class="error-code" onclick="chatbot.askAboutCode('${errorCode}')">${errorCode}</span>
                                <span class="error-title">${match.title}</span>
                                <span class="priority-badge priority-${match.priority.toLowerCase()}">${match.priority}</span>
                                ${match.supportClass ? `<span class="support-class-mini">${WMSKnowledgeBase.supportClasses[match.supportClass].title.split(' - ')[0]}</span>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="response-section">
                    <p><i class="fas fa-info-circle"></i> Klicken Sie auf einen Fehlercode für detaillierte Informationen.</p>
                </div>
            </div>
        `;
    }

    handleGeneralQuestion(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hilfe') || lowerMessage.includes('help')) {
            return `
                <div class="response-card help-response">
                    <div class="response-header">
                        <h4><i class="fas fa-question-circle"></i> Wie kann ich Ihnen helfen?</h4>
                    </div>
                    
                    <div class="help-sections">
                        <div class="help-section">
                            <h5><i class="fas fa-exclamation-triangle"></i> Fehlercodes</h5>
                            <p>Fragen Sie nach spezifischen Codes wie "10003", "10006", "TALOES", etc.</p>
                        </div>
                        
                        <div class="help-section">
                            <h5><i class="fas fa-search"></i> Problemsuche</h5>
                            <p>Beschreiben Sie Ihr Problem: "Kommunikationsstörung", "LAM belegt", "Timeout", etc.</p>
                        </div>
                        
                        <div class="help-section">
                            <h5><i class="fas fa-phone"></i> Support-Klassen</h5>
                            <p>Fragen Sie nach "Klasse 1", "Klasse 2", "Klasse 3" für Prioritätsinformationen</p>
                        </div>
                        
                        <div class="help-section">
                            <h5><i class="fas fa-chart-line"></i> KPI Monitoring</h5>
                            <p>Fragen Sie nach "KPI", "Performance", "Verfügbarkeit" für Metriken</p>
                        </div>
                        
                        <div class="help-section">
                            <h5><i class="fas fa-brain"></i> Predictive Maintenance</h5>
                            <p>Fragen Sie nach "Trend", "KI", "Predictive" für AI-Features</p>
                        </div>
                        
                        <div class="help-section">
                            <h5><i class="fas fa-phone-alt"></i> Notfallkontakte</h5>
                            <p>Fragen Sie nach "Kontakte", "Support", "Notfall" für Kontaktinformationen</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="response-card default-response">
                <div class="response-header">
                    <h4><i class="fas fa-robot"></i> Entschuldigung</h4>
                </div>
                
                <p>Ich verstehe Ihre Anfrage nicht ganz. Versuchen Sie es mit:</p>
                
                <ul>
                    <li><strong>Spezifischen Fehlercodes</strong> (z.B. "10003", "20162")</li>
                    <li><strong>Problembeschreibungen</strong> (z.B. "Kommunikationsstörung", "LAM belegt")</li>
                    <li><strong>Support-Anfragen</strong> (z.B. "Klasse 1", "Notfall")</li>
                    <li><strong>"Hilfe"</strong> für weitere Optionen</li>
                </ul>
                
                <div class="quick-suggestions">
                    <button onclick="chatbot.messageInput.value='Was ist Fehlercode 10003?'; chatbot.sendMessage();">Fehlercode 10003</button>
                    <button onclick="chatbot.messageInput.value='Notfallkontakte'; chatbot.sendMessage();">Notfallkontakte</button>
                    <button onclick="chatbot.messageInput.value='Hilfe'; chatbot.sendMessage();">Hilfe</button>
                </div>
            </div>
        `;
    }

    askAboutCode(code) {
        this.messageInput.value = `Was ist Fehlercode ${code}?`;
        this.sendMessage();
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        content.appendChild(messageText);
        content.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    updateQuestionCount() {
        this.questionsAnswered++;
        const counter = document.getElementById('questions-answered');
        if (counter) {
            counter.textContent = this.questionsAnswered;
        }
    }

    clearChat() {
        // Keep the initial bot message
        const initialMessage = this.messagesContainer.querySelector('.message.bot-message');
        this.messagesContainer.innerHTML = '';
        if (initialMessage) {
            this.messagesContainer.appendChild(initialMessage);
        }
        this.questionsAnswered = 0;
        this.updateQuestionCount();
    }

    exportChat() {
        const messages = this.messagesContainer.querySelectorAll('.message');
        let chatLog = 'WMS Troubleshooting Chat Export\n';
        chatLog += '=====================================\n\n';
        
        messages.forEach(message => {
            const sender = message.classList.contains('user-message') ? 'Benutzer' : 'Assistant';
            const time = message.querySelector('.message-time').textContent;
            const text = message.querySelector('.message-text').innerText;
            
            chatLog += `[${time}] ${sender}:\n${text}\n\n`;
        });
        
        const blob = new Blob([chatLog], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wms-chat-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new WMSChatbot();
});