// WMS Troubleshooting Knowledge Base
const WMSKnowledgeBase = {
    // Error codes and their information
    errorCodes: {
        "10003": {
            title: "Kommunikationsstörung zum Gerät",
            category: "Fördertechnik",
            priority: "Hoch",
            description: "Transport kann nicht an Gerät weitergegeben werden - TCP/IP-Verbindung fehlgeschlagen",
            causes: [
                "Gerät hardwareseitig deaktiviert ('Strom aus')",
                "Unterbrochene Funkverbindung zum Access-Point", 
                "Defekter Funkempfänger",
                "Probleme im hausinternen Netzwerk"
            ],
            solutions: [
                "Gerät neu starten ('Strom aus' → 'Strom ein')",
                "Gerät im Handbetrieb verfahren für Funkverbindung",
                "IT-Abteilung kontaktieren bei Netzwerkproblemen"
            ],
            wmsAction: "Standard transport retry nach Hardware-Lösung",
            relatedCodes: ["10045", "10024"]
        },
        "10006": {
            title: "Konturenfehler",
            category: "Fördertechnik",
            priority: "Mittel",
            description: "LHM überschreitet Dimensionsvorgaben: Überhöhe, Überbreite, Überlänge oder Übergewicht",
            causes: [
                "Abmessungen entsprechen nicht den Vorgaben"
            ],
            solutions: [
                "Abmessungen entsprechend der Vorgaben anpassen",
                "LHM von der Anlage nehmen wenn nicht anpassbar"
            ],
            wmsAction: "Dimension correction dialog",
            relatedCodes: ["20018", "20024"]
        },
        "10009": {
            title: "Befristete Annahmesperre",
            category: "Fördertechnik", 
            priority: "Niedrig",
            description: "Gerätemanager lehnt Transport ab bei vorhandener Störung",
            causes: [
                "Tritt mit anderen Störungen auf"
            ],
            solutions: [
                "Nach Behebung der ursprünglichen Störung: 'Transport erneut senden' + 'Standard'"
            ],
            wmsAction: "Standard transport retry",
            relatedCodes: ["10003", "10045"]
        },
        "10024": {
            title: "Ziel unerreichbar",
            category: "Fördertechnik",
            priority: "Hoch", 
            description: "Nicht verfahrbares Gerät oder langfristig gestörter Ort blockiert den Weg",
            causes: [
                "Gerät blockiert den Weg (offline/gestört)",
                "Ort ist langfristig gestört"
            ],
            solutions: [
                "Blockierendes Gerät überprüfen und aktivieren",
                "Langfristige Störung aufheben oder neues Ziel suchen"
            ],
            wmsAction: "Transport erneut senden oder neues Ziel suchen",
            relatedCodes: ["10003", "10053"]
        },
        "10039": {
            title: "Timeout Platzbelegung",
            category: "Fördertechnik",
            priority: "Mittel",
            description: "Keine Belegungsmeldung von Fördertechnik nach Timeout",
            causes: [
                "Lichttaster/Lichtschranke erkennt keine Belegung"
            ],
            solutions: [
                "Lichttaster/Lichtschranke justieren",
                "'Transport erneut senden' + 'Standard'"
            ],
            wmsAction: "Transport erneut senden nach Sensor-Korrektur",
            relatedCodes: ["10006"]
        },
        "10045": {
            title: "Protokollfehler",
            category: "Fördertechnik",
            priority: "Hoch",
            description: "Problem im gerätespezifischen Kommunikationsprotokoll",
            causes: [
                "Protokoll nicht korrekt implementiert"
            ],
            solutions: [
                "'Quit an Gerät senden'",
                "Jungheinrich Support kontaktieren"
            ],
            wmsAction: "Quit an Gerät senden",
            relatedCodes: ["10003"]
        },
        "10053": {
            title: "Kein Weg modelliert",
            category: "Fördertechnik",
            priority: "Hoch",
            description: "Kein durchgehender Weg zwischen Quelle und Ziel",
            causes: [
                "Modellierungsfehler"
            ],
            solutions: [
                "Wege in Transportmanager-Konfiguration korrigieren",
                "Transportmanager neu starten"
            ],
            wmsAction: "Transport erneut senden nach Konfiguration-Fix",
            relatedCodes: ["10024"]
        },
        "20162": {
            title: "TE-ID ist Null (No Read)",
            category: "Fördertechnik",
            priority: "Mittel",
            description: "TE-ID des Auftrages gesetzt, aber Fördertechnik-TE-ID nicht gesetzt",
            causes: [
                "No-read beim Scanner der Fördertechniksteuerung"
            ],
            solutions: [
                "'Transport erneut senden' + 'LHM anfordern'",
                "LHM-Etikett-Qualität überprüfen"
            ],
            wmsAction: "LHM anfordern für Ausschleusung",
            relatedCodes: ["20160"]
        },
        "10004": {
            title: "Zielfach belegt bei Abgabe",
            category: "Behälter-RBG",
            priority: "Mittel",
            description: "Ziellagerfach ist bei Abgabe belegt",
            causes: [
                "Fach tatsächlich belegt",
                "Folie oder Gegenstände verursachen Belegungserkennung",
                "Verstelle Sensorik"
            ],
            solutions: [
                "Gegenstand entfernen + 'Transport erneut senden'",
                "Neues Ziel suchen + Lagerort sperren",
                "Sensorik einstellen"
            ],
            wmsAction: "Transport erneut senden oder neues Ziel suchen",
            relatedCodes: ["10061", "20023"]
        },
        "10005": {
            title: "Quellfach nicht belegt bei Aufnahme", 
            category: "Behälter-RBG",
            priority: "Mittel",
            description: "Quellfach ist leer bei geplanter Aufnahme",
            causes: [
                "Fach ist tatsächlich leer",
                "Verstelle Sensorik"
            ],
            solutions: [
                "Bei leerem Fach: 'LHM extern buchen' auf CLEAR",
                "Entnahmemenge auf 0 korrigieren bei Kommissionierung",
                "Sensorik korrigieren"
            ],
            wmsAction: "LHM extern buchen oder Sensorik korrigieren",
            relatedCodes: ["10060", "20023"]
        }
    },

    // Common troubleshooting actions
    commonActions: {
        "extern_buchen": {
            title: "LHM extern buchen",
            description: "Bucht das LHM auf einen definierten externen Ort",
            usage: [
                "LHM physikalisch bereits von der Anlage entfernt",
                "Lagerfach ist nur datentechnisch belegt, physikalisch aber leer"
            ]
        },
        "transport_abschliessen": {
            title: "Transport abschließen",
            description: "Bucht das LHM auf den Zielort und löscht den Transportauftrag",
            usage: [
                "LHM befindet sich physikalisch bereits am Ziel",
                "Gerätesensorik meldet fälschlicherweise LAM-Belegung"
            ]
        },
        "quit_senden": {
            title: "Quit an Gerät senden", 
            description: "Sendet 'Quittierung' an das Gerät für Verbindungsaufbau",
            usage: [
                "Unterbrochene Kommunikation zwischen GM und MFR",
                "Probleme in gerätespezifischen Telegrammen"
            ]
        },
        "transport_erneut": {
            title: "Transport erneut an das Gerät senden",
            description: "Sendet das Transportauftragstelegramm noch einmal an das Gerät",
            usage: [
                "Nach der Behebung einer physikalischen Störung",
                "Standard-Wiederholung nach Hardware-Fix"
            ]
        }
    },

    // Contact information
    contacts: {
        "technischer_support": {
            name: "Jungheinrich Support",
            purpose: "Für Protokollfehler und technische Probleme",
            when: "Bei wiederholten Störungen, Protokollfehlern"
        },
        "it_abteilung": {
            name: "IT-Abteilung", 
            purpose: "Bei Kommunikations- und Netzwerkstörungen",
            when: "Netzwerkprobleme, Kommunikationsstörungen"
        },
        "kundendienst": {
            name: "Jungheinrich Kundendienst",
            purpose: "Für spezielle Gerätewartung und -reparatur", 
            when: "Hardware-Probleme, Gerätewartung"
        }
    },

    // Emergency procedures
    emergencyProcedures: {
        "system_down": {
            title: "Kritischer Systemausfall",
            steps: [
                "Sofort: Jungheinrich Support kontaktieren",
                "Dokumentieren: Alle Fehlercodes und Symptome erfassen", 
                "Isolieren: Weitere Schäden verhindern",
                "Kommunizieren: Operations-Team benachrichtigen"
            ]
        },
        "maintenance_mode": {
            title: "Wartungsmodus",
            steps: [
                "Sicheres Herunterfahren: Laufende Transporte abschließen",
                "Fehlerdokumentation: Alle ausstehenden Fehler protokollieren",
                "Wartungszugang: Techniker-Zugang bereitstellen", 
                "Neustart-Verfahren: Systematischen Neustart durchführen"
            ]
        }
    },

    // Keywords for natural language processing
    keywords: {
        "kommunikation": ["10003", "10045", "netzwerk", "verbindung", "tcp", "funk"],
        "kontur": ["10006", "20018", "20024", "größe", "höhe", "breite", "gewicht"],
        "timeout": ["10039", "zeit", "sensor", "belegung"],
        "weg": ["10024", "10053", "pfad", "route", "blockiert"],
        "lam": ["10007", "10008", "20022", "20028", "lastaufnahme"],
        "fach": ["10004", "10005", "10060", "10061", "belegt", "leer"],
        "scanner": ["20162", "20160", "te-id", "etiketten", "scan"],
        "notfall": ["emergency", "hilfe", "support", "kontakt"],
        "extern": ["extern_buchen", "lhm", "buchen"],
        "quit": ["quit_senden", "quittierung", "reset"]
    },

    // Quick resolution matrix
    quickResolution: {
        "gerät_reagiert_nicht": {
            likelyCause: "10003",
            firstAction: "Gerät neu starten",
            followUp: "Netzwerk prüfen"
        },
        "lhm_abgewiesen": {
            likelyCause: "10006", 
            firstAction: "Dimensionen prüfen",
            followUp: "Anpassen oder entfernen"
        },
        "mehrere_geräte": {
            likelyCause: "10024",
            firstAction: "Netzwerk/Strom prüfen", 
            followUp: "IT kontaktieren"
        },
        "sensor_fehler": {
            likelyCause: "10039",
            firstAction: "Sensoren reinigen/justieren",
            followUp: "Rekalibrieren"
        }
    }
};

// Search and matching functions
const KnowledgeSearch = {
    findErrorCode: function(input) {
        const codeMatch = input.match(/\b(\d{5})\b/);
        if (codeMatch && WMSKnowledgeBase.errorCodes[codeMatch[1]]) {
            return WMSKnowledgeBase.errorCodes[codeMatch[1]];
        }
        return null;
    },

    findByKeyword: function(input) {
        const inputLower = input.toLowerCase();
        const matches = [];

        for (const [keyword, codes] of Object.entries(WMSKnowledgeBase.keywords)) {
            if (inputLower.includes(keyword)) {
                codes.forEach(code => {
                    if (WMSKnowledgeBase.errorCodes[code]) {
                        matches.push(WMSKnowledgeBase.errorCodes[code]);
                    }
                });
            }
        }

        return matches;
    },

    findCommonAction: function(input) {
        const inputLower = input.toLowerCase();
        
        for (const [actionKey, action] of Object.entries(WMSKnowledgeBase.commonActions)) {
            if (inputLower.includes(actionKey.replace('_', ' ')) || 
                inputLower.includes(action.title.toLowerCase())) {
                return action;
            }
        }
        return null;
    },

    searchAll: function(input) {
        const results = {
            errorCode: this.findErrorCode(input),
            keywords: this.findByKeyword(input),
            action: this.findCommonAction(input),
            contacts: null,
            emergency: null
        };

        // Check for contact requests
        if (input.toLowerCase().includes('kontakt') || 
            input.toLowerCase().includes('support') ||
            input.toLowerCase().includes('hilfe')) {
            results.contacts = WMSKnowledgeBase.contacts;
        }

        // Check for emergency procedures
        if (input.toLowerCase().includes('notfall') || 
            input.toLowerCase().includes('kritisch') ||
            input.toLowerCase().includes('systemausfall')) {
            results.emergency = WMSKnowledgeBase.emergencyProcedures;
        }

        return results;
    }
};