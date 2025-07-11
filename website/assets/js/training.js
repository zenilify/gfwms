// Training Page Interactive Features
class WMSTraining {
    constructor() {
        this.currentModule = null;
        this.completedModules = this.loadProgress();
        this.init();
    }

    init() {
        this.addAnimations();
        this.addInteractivity();
        this.loadUserProgress();
        this.addKeyboardShortcuts();
    }

    addAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe training sections
        document.querySelectorAll('.cert-card, .module-card, .exercise-card, .resource-card').forEach(card => {
            observer.observe(card);
        });

        // Add staggered animation to training path
        document.querySelectorAll('.path-phase').forEach((phase, index) => {
            setTimeout(() => {
                phase.classList.add('slide-in-left');
            }, index * 200);
        });
    }

    addInteractivity() {
        // Module card interactions
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.showModuleDetails(e.currentTarget);
            });
        });

        // Exercise card interactions
        document.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.showExerciseDetails(e.currentTarget);
            });
        });

        // Progress tracking
        document.querySelectorAll('.cert-card').forEach(card => {
            const button = document.createElement('button');
            button.className = 'cert-progress-btn';
            button.innerHTML = '<i class="fas fa-play"></i> Start Training';
            button.onclick = () => this.startCertificationTrack(card);
            card.appendChild(button);
        });

        // Interactive demos
        this.addInteractiveDemos();
    }

    addInteractiveDemos() {
        // Add interactive demo placeholders
        const demoData = [
            {
                title: 'System Navigation Demo',
                description: 'Interaktive Demonstration der WMS Navigation',
                module: 'navigation'
            },
            {
                title: 'Wareneingang Simulation',
                description: 'Schritt-für-Schritt Wareneingang Prozess',
                module: 'goods-receipt'
            },
            {
                title: 'Störungsbehandlung Trainer',
                description: 'Simulierte Störungen zum Üben',
                module: 'troubleshooting'
            }
        ];

        const demosContainer = document.createElement('div');
        demosContainer.className = 'interactive-demos';
        demosContainer.innerHTML = `
            <h3><i class="fas fa-play-circle"></i> Interaktive Demos</h3>
            <div class="demos-grid">
                ${demoData.map(demo => `
                    <div class="interactive-demo" onclick="training.launchDemo('${demo.module}')">
                        <i class="fas fa-laptop-code"></i>
                        <h4>${demo.title}</h4>
                        <p>${demo.description}</p>
                    </div>
                `).join('')}
            </div>
        `;

        // Insert demos into resources section
        const resourcesSection = document.querySelector('.training-resources .resources-grid');
        if (resourcesSection) {
            resourcesSection.parentNode.insertBefore(demosContainer, resourcesSection);
        }
    }

    showModuleDetails(moduleCard) {
        const moduleTitle = moduleCard.querySelector('h4').textContent;
        const moduleContent = moduleCard.querySelector('.module-content').innerHTML;
        const moduleDuration = moduleCard.querySelector('.module-duration').textContent;

        const modal = this.createModal(`
            <div class="module-modal">
                <div class="modal-header">
                    <h3>${moduleTitle}</h3>
                    <span class="modal-duration">${moduleDuration}</span>
                </div>
                <div class="modal-content">
                    ${moduleContent}
                    <div class="module-actions">
                        <button class="btn btn-primary" onclick="training.startModule('${moduleTitle}')">
                            <i class="fas fa-play"></i> Modul starten
                        </button>
                        <button class="btn btn-secondary" onclick="training.markCompleted('${moduleTitle}')">
                            <i class="fas fa-check"></i> Als abgeschlossen markieren
                        </button>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    showExerciseDetails(exerciseCard) {
        const exerciseTitle = exerciseCard.querySelector('h4').textContent;
        const exerciseContent = exerciseCard.querySelector('.exercise-content').innerHTML;
        const exerciseDuration = exerciseCard.querySelector('.exercise-duration').textContent;

        const modal = this.createModal(`
            <div class="exercise-modal">
                <div class="modal-header">
                    <h3>${exerciseTitle}</h3>
                    <span class="modal-duration">${exerciseDuration}</span>
                </div>
                <div class="modal-content">
                    ${exerciseContent}
                    <div class="exercise-actions">
                        <button class="btn btn-primary" onclick="training.startExercise('${exerciseTitle}')">
                            <i class="fas fa-dumbbell"></i> Übung starten
                        </button>
                        <button class="btn btn-secondary" onclick="training.downloadExercise('${exerciseTitle}')">
                            <i class="fas fa-download"></i> Übungsblatt herunterladen
                        </button>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'training-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="training.closeModal()"></div>
            <div class="modal-dialog">
                <div class="modal-close" onclick="training.closeModal()">
                    <i class="fas fa-times"></i>
                </div>
                ${content}
            </div>
        `;

        // Add modal styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .training-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                }
                
                .modal-dialog {
                    background: white;
                    border-radius: 12px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    animation: modalSlideIn 0.3s ease;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    cursor: pointer;
                    font-size: 1.5rem;
                    color: #666;
                    z-index: 1001;
                }
                
                .modal-header {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    padding: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-duration {
                    background: rgba(255,255,255,0.2);
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                }
                
                .modal-content {
                    padding: 2rem;
                }
                
                .module-actions, .exercise-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                }
                
                .btn {
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .btn-primary {
                    background: #3498db;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #2980b9;
                }
                
                .btn-secondary {
                    background: #95a5a6;
                    color: white;
                }
                
                .btn-secondary:hover {
                    background: #7f8c8d;
                }
                
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        return modal;
    }

    closeModal() {
        const modal = document.querySelector('.training-modal');
        if (modal) {
            modal.remove();
        }
    }

    startCertificationTrack(certCard) {
        const level = certCard.classList.contains('level-1') ? 1 : 
                     certCard.classList.contains('level-2') ? 2 : 3;
        
        const levelNames = ['', 'Operator', 'Advanced Operator', 'Administrator'];
        
        this.showNotification(`Zertifizierungspfad Level ${level}: ${levelNames[level]} gestartet!`);
        
        // Update progress
        this.updateProgress(`cert-level-${level}`, 'started');
        
        // Scroll to first relevant module
        const firstModule = document.querySelector('.module-card');
        if (firstModule) {
            firstModule.scrollIntoView({ behavior: 'smooth' });
        }
    }

    startModule(moduleTitle) {
        this.showNotification(`Modul "${moduleTitle}" gestartet!`);
        this.updateProgress(moduleTitle, 'started');
        this.closeModal();
        
        // Here you could integrate with actual training content
        // For now, we'll open the chatbot for training assistance
        window.open('chatbot.html', '_blank');
    }

    startExercise(exerciseTitle) {
        this.showNotification(`Übung "${exerciseTitle}" gestartet!`);
        this.updateProgress(exerciseTitle, 'started');
        this.closeModal();
    }

    markCompleted(moduleTitle) {
        this.showNotification(`Modul "${moduleTitle}" als abgeschlossen markiert!`);
        this.updateProgress(moduleTitle, 'completed');
        this.closeModal();
    }

    downloadExercise(exerciseTitle) {
        // Generate exercise worksheet
        const worksheet = this.generateWorksheet(exerciseTitle);
        this.downloadFile(worksheet, `${exerciseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_worksheet.txt`);
    }

    generateWorksheet(exerciseTitle) {
        return `WMS Training Übungsblatt: ${exerciseTitle}
========================================

Datum: ${new Date().toLocaleDateString('de-DE')}
Teilnehmer: ______________________

Ziel:
- ${exerciseTitle} erfolgreich durchführen

Vorbereitung:
1. WMS System geöffnet
2. Testdaten verfügbar
3. Übungsanleitung gelesen

Aufgaben:
1. [ ] Aufgabe 1 - System Login
2. [ ] Aufgabe 2 - Navigation
3. [ ] Aufgabe 3 - Hauptaufgabe
4. [ ] Aufgabe 4 - Dokumentation

Bewertungskriterien:
- Korrekte Ausführung aller Schritte
- Einhaltung der Sicherheitsverfahren
- Vollständige Dokumentation

Notizen:
_________________________________
_________________________________
_________________________________

Trainer Unterschrift: _______________
Teilnehmer Unterschrift: ____________`;
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    launchDemo(module) {
        const demos = {
            'navigation': {
                title: 'System Navigation Demo',
                content: 'Interaktive WMS Navigation wird gestartet...'
            },
            'goods-receipt': {
                title: 'Wareneingang Simulation',
                content: 'Wareneingang Prozess wird simuliert...'
            },
            'troubleshooting': {
                title: 'Störungsbehandlung Trainer',
                content: 'Störungssimulation wird gestartet...'
            }
        };

        const demo = demos[module];
        if (demo) {
            this.showNotification(`${demo.title} wird gestartet...`);
            
            // For now, redirect to chatbot for interactive help
            setTimeout(() => {
                window.open('chatbot.html', '_blank');
            }, 1000);
        }
    }

    updateProgress(item, status) {
        if (!this.completedModules[item]) {
            this.completedModules[item] = {};
        }
        this.completedModules[item].status = status;
        this.completedModules[item].timestamp = new Date().toISOString();
        
        this.saveProgress();
        this.updateProgressDisplay();
    }

    loadProgress() {
        const saved = localStorage.getItem('wms-training-progress');
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('wms-training-progress', JSON.stringify(this.completedModules));
    }

    updateProgressDisplay() {
        // Add progress indicators to module cards
        document.querySelectorAll('.module-card').forEach(card => {
            const title = card.querySelector('h4').textContent;
            const progress = this.completedModules[title];
            
            // Remove existing progress indicators
            const existingIndicator = card.querySelector('.progress-indicator');
            if (existingIndicator) {
                existingIndicator.remove();
            }
            
            if (progress) {
                const indicator = document.createElement('div');
                indicator.className = `progress-indicator ${progress.status}`;
                indicator.innerHTML = progress.status === 'completed' ? 
                    '<i class="fas fa-check-circle"></i>' : 
                    '<i class="fas fa-play-circle"></i>';
                card.appendChild(indicator);
            }
        });
    }

    loadUserProgress() {
        this.updateProgressDisplay();
        
        // Calculate overall progress
        const totalModules = document.querySelectorAll('.module-card').length;
        const completedCount = Object.values(this.completedModules)
            .filter(progress => progress.status === 'completed').length;
        
        const progressPercentage = totalModules > 0 ? 
            Math.round((completedCount / totalModules) * 100) : 0;
        
        // Add progress bar to hero section
        this.addProgressBar(progressPercentage);
    }

    addProgressBar(percentage) {
        const heroStats = document.querySelector('.training-stats');
        if (heroStats && !document.querySelector('.progress-stat')) {
            const progressStat = document.createElement('div');
            progressStat.className = 'stat progress-stat';
            progressStat.innerHTML = `
                <h3>${percentage}%</h3>
                <p>Fortschritt</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            heroStats.appendChild(progressStat);
            
            // Add progress bar styles
            const progressStyles = `
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 4px;
                    margin-top: 0.5rem;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #27ae60, #2ecc71);
                    border-radius: 4px;
                    transition: width 0.6s ease;
                }
                
                .progress-indicator {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                }
                
                .progress-indicator.completed {
                    color: #27ae60;
                }
                
                .progress-indicator.started {
                    color: #f39c12;
                }
            `;
            
            if (!document.querySelector('#progress-styles')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'progress-styles';
                styleElement.textContent = progressStyles;
                document.head.appendChild(styleElement);
            }
        }
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+H - Help
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
            
            // Ctrl+P - Progress
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.showProgressSummary();
            }
            
            // Escape - Close modal
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showKeyboardShortcuts() {
        const modal = this.createModal(`
            <div class="shortcuts-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-keyboard"></i> Tastenkombinationen</h3>
                </div>
                <div class="modal-content">
                    <div class="shortcuts-grid">
                        <div class="shortcut-item">
                            <kbd>Ctrl + H</kbd>
                            <span>Hilfe anzeigen</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + P</kbd>
                            <span>Fortschritt anzeigen</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Esc</kbd>
                            <span>Modal schließen</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + K</kbd>
                            <span>Suche öffnen</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    showProgressSummary() {
        const totalModules = document.querySelectorAll('.module-card').length;
        const completedCount = Object.values(this.completedModules)
            .filter(progress => progress.status === 'completed').length;
        const startedCount = Object.values(this.completedModules)
            .filter(progress => progress.status === 'started').length;
        
        const modal = this.createModal(`
            <div class="progress-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-chart-pie"></i> Trainingsfortschritt</h3>
                </div>
                <div class="modal-content">
                    <div class="progress-summary">
                        <div class="progress-item">
                            <span class="progress-label">Abgeschlossen:</span>
                            <span class="progress-value">${completedCount} / ${totalModules}</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">In Bearbeitung:</span>
                            <span class="progress-value">${startedCount}</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Noch nicht begonnen:</span>
                            <span class="progress-value">${totalModules - completedCount - startedCount}</span>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h4>Letzte Aktivitäten:</h4>
                        ${this.getRecentActivity()}
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    getRecentActivity() {
        const activities = Object.entries(this.completedModules)
            .sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp))
            .slice(0, 5);
        
        if (activities.length === 0) {
            return '<p>Noch keine Aktivitäten vorhanden.</p>';
        }
        
        return activities.map(([item, progress]) => `
            <div class="activity-item">
                <span class="activity-status ${progress.status}">
                    ${progress.status === 'completed' ? '✓' : '▶'}
                </span>
                <span class="activity-item-name">${item}</span>
                <span class="activity-time">${new Date(progress.timestamp).toLocaleDateString('de-DE')}</span>
            </div>
        `).join('');
    }

    showNotification(message) {
        // Remove existing notifications
        const existing = document.querySelector('.training-notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'training-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .training-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                    z-index: 1002;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize training system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.training = new WMSTraining();
});