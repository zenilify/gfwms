// Enhanced WMS Troubleshooting Knowledge Base
// Updated with Georg Fischer Handbook and Emergency Procedures
const WMSKnowledgeBase = {
    // Support call classification system
    supportClasses: {
        "class1": {
            title: "Klasse 1 - Kritische Störungen",
            description: "Störungen die den laufenden Betrieb erheblich beeinträchtigen oder gefährden",
            responseTime: "Gemäß Vereinbarung (sofort)",
            method: "Telefon-Meldung erforderlich",
            coverage: "24/7 Notfall-Support",
            examples: ["Systemausfall", "Sicherheitsprobleme", "Produktionstopp"]
        },
        "class2": {
            title: "Klasse 2 - Nicht-kritische Störungen", 
            description: "Störungen die den laufenden Betrieb nicht erheblich behindern oder gefährden",
            responseTime: "Spätestens nächster Arbeitstag",
            method: "E-Mail oder Telefon",
            coverage: "Geschäftszeiten",
            examples: ["Performance-Probleme", "Kleinere Fehler", "Dokumentation"]
        },
        "class3": {
            title: "Klasse 3 - Präventive Unterstützung",
            description: "Schulungsmaßnahmen, kleine Änderungswünsche, Beratungsleistungen",
            responseTime: "2-6 Arbeitstage oder nach Vereinbarung",
            method: "E-Mail bevorzugt",
            coverage: "Geschäftszeiten",
            examples: ["Schulungen", "Anpassungen", "Beratung"]
        }
    },

    // Enhanced contact information with emergency protocols
    emergencyContacts: {
        "software_support": {
            name: "Jungheinrich Software Support",
            purpose: "WMS/WCS inkl. Steuerungstechnik",
            phone_business: "+43 316 811651 8888",
            phone_emergency: "+43 316 811651 8888", 
            email: "support@jungheinrich.at",
            hours: "Mo-Fr 06:00-22:00",
            responseTime: "1 Stunde (Premium Support)",
            coverage: "24/7 Bereitschaftsdienst für Klasse 1"
        },
        "mechanical_support": {
            name: "Jungheinrich Technischer Kundendienst",
            purpose: "Mechanische Wartung und Reparatur",
            phone_business: "+41 848 330 340",
            phone_emergency: "+41 62 739 32 80",
            email: "Service@jungheinrich.ch", 
            hours: "Mo-Fr 06:00-22:00",
            responseTime: "4 Stunden (Techniker vor Ort)",
            coverage: "24/7 Bereitschaftsdienst für Klasse 1"
        },
        "georg_fischer_contacts": {
            "thomas_heusser": {
                name: "Thomas Heusser",
                role: "Warehouse Logistics Manager",
                phone: "+41 79 201 94 90",
                authorized: "Vollzugriff Support-Anfragen"
            },
            "benjamin_simon": {
                name: "Benjamin Simon", 
                role: "Warehouse Operator",
                phone: "+41 76 421 89 64",
                authorized: "Operative Support-Anfragen"
            },
            "livio_mathis": {
                name: "Livio Mathis",
                role: "Maintenance/Infrastructure Manager", 
                phone: "+41 79 540 84 24",
                authorized: "Technische Support-Anfragen"
            },
            "giuseppe_carroccia": {
                name: "Giuseppe Carroccia",
                role: "Mechanical Maintenance Team Leader",
                phone: "+41 79 540 84 09", 
                authorized: "Mechanische Support-Anfragen"
            },
            "kevin_gleichweit": {
                name: "Kevin Gleichweit",
                role: "Logistics Shift Supervisor",
                phone: "+41 79 201 94 90",
                authorized: "Schichtbetrieb Support-Anfragen"
            },
            "mirjana_milanovic": {
                name: "Mirjana Milanovic",
                role: "Logistics Shift Supervisor", 
                phone: "+41 79 201 94 90",
                authorized: "Schichtbetrieb Support-Anfragen"
            }
        }
    },

    // KPI monitoring metrics from Data Center handbook
    kpiMetrics: {
        "resolution_time": {
            name: "Mittlere Störungsbehebungszeit",
            description: "Durchschnittliche Zeit zur Behebung von Störungen",
            target: "< 30 Minuten",
            alertThreshold: "60 Minuten",
            category: "Performance"
        },
        "disturbance_free_time": {
            name: "Mittlere störungsfreie Zeit", 
            description: "Durchschnittliche Zeit zwischen Störungen",
            target: "> 4 Stunden",
            alertThreshold: "< 2 Stunden",
            category: "Reliability"
        },
        "availability_percentage": {
            name: "Prozentuelle Störungsfreiheit",
            description: "Anteil der störungsfreien Betriebszeit",
            target: "> 95%",
            alertThreshold: "< 90%", 
            category: "Availability"
        },
        "total_disturbance_duration": {
            name: "Gesamte Störungsdauer",
            description: "Kumulative Störungszeit pro Zeitraum",
            target: "< 4 Stunden/Tag",
            alertThreshold: "> 8 Stunden/Tag",
            category: "Performance"
        },
        "disturbance_count": {
            name: "Anzahl Störungen",
            description: "Gesamtzahl der Störungen pro Zeitraum", 
            target: "< 10/Tag",
            alertThreshold: "> 20/Tag",
            category: "Frequency"
        }
    },

    // AI-powered predictive maintenance alerts
    predictiveAlerts: {
        "trend_analysis": {
            title: "Trend- und Abweichungsanalyse",
            description: "Automatische KPI-Überwachung mit Trendanalyse",
            triggers: [
                "Verschlechterung der Störungsbehebungszeit",
                "Zunahme der Störungshäufigkeit", 
                "Abweichung von normalen Betriebsmustern"
            ],
            actions: [
                "Leitstandsmeldung generieren",
                "Automatische Benachrichtigung",
                "Präventive Wartung empfehlen"
            ]
        },
        "equipment_status": {
            title: "Gerätestatus-Überwachung",
            description: "Echtzeitüberwachung der Geräteübergänge OK → Störung",
            monitoring: [
                "Automatische Erkennung von Statuswechseln",
                "Korrelation mit Arbeitszeitschemas",
                "Integration in Wartungspläne"
            ]
        }
    },

    // Enhanced error codes with new classifications
    errorCodes: {
        "10003": {
            title: "Kommunikationsstörung zum Gerät",
            category: "Fördertechnik",
            priority: "Hoch",
            supportClass: "class1",
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
            escalation: "Bei > 3 Wiederholungen: Klasse 1 Support kontaktieren",
            relatedCodes: ["10045", "10024"],
            kpiImpact: ["resolution_time", "availability_percentage"]
        },
        "10006": {
            title: "Konturenfehler",
            category: "Fördertechnik",
            priority: "Mittel", 
            supportClass: "class2",
            description: "LHM überschreitet Dimensionsvorgaben: Überhöhe, Überbreite, Überlänge oder Übergewicht",
            causes: [
                "Abmessungen entsprechen nicht den Vorgaben",
                "Defekte Konturenerfassung",
                "Falsche Behälterwahl"
            ],
            solutions: [
                "Abmessungen entsprechend der Vorgaben anpassen",
                "LHM von der Anlage nehmen wenn nicht anpassbar",
                "Konturenerfassung kalibrieren"
            ],
            wmsAction: "Dimension correction dialog",
            escalation: "Bei wiederholten Fehlern: Sensor-Kalibrierung anfordern",
            relatedCodes: ["20018", "20024"],
            kpiImpact: ["disturbance_count"]
        },
        "10009": {
            title: "Befristete Annahmesperre",
            category: "Fördertechnik", 
            priority: "Niedrig",
            supportClass: "class2",
            description: "Gerätemanager lehnt Transport ab bei vorhandener Störung",
            causes: [
                "Tritt mit anderen Störungen auf"
            ],
            solutions: [
                "Nach Behebung der ursprünglichen Störung: 'Transport erneut senden' + 'Standard'"
            ],
            wmsAction: "Standard transport retry",
            escalation: "Automatisch nach Behebung der Hauptstörung",
            relatedCodes: ["10003", "10045"],
            kpiImpact: ["resolution_time"]
        },
        "10024": {
            title: "Ziel unerreichbar",
            category: "Fördertechnik",
            priority: "Hoch", 
            supportClass: "class1",
            description: "Nicht verfahrbares Gerät oder langfristig gestörter Ort blockiert den Weg",
            causes: [
                "Gerät blockiert den Weg (offline/gestört)",
                "Ort ist langfristig gestört",
                "Mechanische Blockade",
                "Sicherheitsabschaltung aktiv"
            ],
            solutions: [
                "Blockierendes Gerät überprüfen und aktivieren",
                "Langfristige Störung aufheben oder neues Ziel suchen",
                "Mechanische Hindernisse entfernen",
                "Sicherheitssysteme überprüfen"
            ],
            wmsAction: "Transport erneut senden oder neues Ziel suchen",
            escalation: "Bei Systemblockade: Sofort Klasse 1 Support",
            relatedCodes: ["10003", "10053"],
            kpiImpact: ["availability_percentage", "total_disturbance_duration"]
        },
        "10039": {
            title: "Timeout Platzbelegung",
            category: "Fördertechnik",
            priority: "Mittel",
            supportClass: "class2",
            description: "Keine Belegungsmeldung von Fördertechnik nach Timeout",
            causes: [
                "Lichttaster/Lichtschranke erkennt keine Belegung",
                "Defekte Belegungssensorik", 
                "Systemüberlastung"
            ],
            solutions: [
                "Lichttaster/Lichtschranke justieren",
                "'Transport erneut senden' + 'Standard'",
                "Sensorik reinigen und kalibrieren",
                "Timeout-Werte anpassen"
            ],
            wmsAction: "Transport erneut senden nach Sensor-Korrektur",
            escalation: "Bei häufigen Timeouts: Sensor-Wartung anfordern",
            relatedCodes: ["10006"],
            kpiImpact: ["resolution_time", "disturbance_count"]
        },
        "10045": {
            title: "Protokollfehler",
            category: "Fördertechnik",
            priority: "Hoch",
            supportClass: "class1",
            description: "Problem im gerätespezifischen Kommunikationsprotokoll",
            causes: [
                "Protokoll nicht korrekt implementiert",
                "Falsche Protokoll-Version",
                "Beschädigte Datenübertragung",
                "Timing-Probleme"
            ],
            solutions: [
                "'Quit an Gerät senden'",
                "Protokoll-Version prüfen",
                "Kommunikation zurücksetzen",
                "Jungheinrich Support kontaktieren"
            ],
            wmsAction: "Quit an Gerät senden",
            escalation: "Bei wiederholten Protokollfehlern: Sofort Software Support",
            relatedCodes: ["10003"],
            kpiImpact: ["resolution_time", "availability_percentage"]
        },
        "10053": {
            title: "Kein Weg modelliert",
            category: "Fördertechnik",
            priority: "Hoch",
            supportClass: "class1",
            description: "Kein durchgehender Weg zwischen Quelle und Ziel",
            causes: [
                "Modellierungsfehler",
                "Fehlende Wegverbindungen",
                "Konfigurationsproblem"
            ],
            solutions: [
                "Wege in Transportmanager-Konfiguration korrigieren",
                "Transportmanager neu starten",
                "Routing-Tabellen aktualisieren"
            ],
            wmsAction: "Transport erneut senden nach Konfiguration-Fix",
            escalation: "Konfigurationsfehler: Software Support kontaktieren",
            relatedCodes: ["10024"],
            kpiImpact: ["availability_percentage"]
        },
        "20162": {
            title: "TE-ID ist Null (No Read)",
            category: "Fördertechnik",
            priority: "Mittel",
            supportClass: "class2",
            description: "TE-ID des Auftrages gesetzt, aber Fördertechnik-TE-ID nicht gesetzt",
            causes: [
                "No-read beim Scanner der Fördertechniksteuerung",
                "Beschädigter Barcode/RFID-Tag",
                "Defekter Scanner",
                "Verschmutzung der Leseeinheit"
            ],
            solutions: [
                "'Transport erneut senden' + 'LHM anfordern'",
                "LHM-Etikett-Qualität überprüfen",
                "Barcode/Tag prüfen und reinigen",
                "Scanner kalibrieren",
                "Manuell TE-ID eingeben"
            ],
            wmsAction: "LHM anfordern für Ausschleusung",
            escalation: "Bei häufigen Scanner-Problemen: Hardware-Wartung",
            relatedCodes: ["20160"],
            kpiImpact: ["disturbance_count"]
        },
        "10004": {
            title: "Zielfach belegt bei Abgabe",
            category: "Behälter-RBG",
            priority: "Mittel",
            supportClass: "class2",
            description: "Ziellagerfach ist bei Abgabe belegt",
            causes: [
                "Fach tatsächlich belegt",
                "Folie oder Gegenstände verursachen Belegungserkennung",
                "Verstelle Sensorik"
            ],
            solutions: [
                "Gegenstand entfernen + 'Transport erneut senden'",
                "Neues Ziel suchen + Lagerort sperren",
                "Sensorik einstellen",
                "Inventur des Fachs durchführen"
            ],
            wmsAction: "Transport erneut senden oder neues Ziel suchen",
            escalation: "Bei wiederholten Belegungsfehlern: Sensor-Wartung",
            relatedCodes: ["10061", "20023"],
            kpiImpact: ["resolution_time"]
        },
        "10005": {
            title: "Quellfach nicht belegt bei Aufnahme", 
            category: "Behälter-RBG",
            priority: "Mittel",
            supportClass: "class2",
            description: "Quellfach ist leer bei geplanter Aufnahme",
            causes: [
                "Fach ist tatsächlich leer",
                "Verstelle Sensorik"
            ],
            solutions: [
                "Bei leerem Fach: 'LHM extern buchen' auf CLEAR",
                "Entnahmemenge auf 0 korrigieren bei Kommissionierung",
                "Sensorik korrigieren",
                "Inventur durchführen"
            ],
            wmsAction: "LHM extern buchen oder Sensorik korrigieren",
            escalation: "Bei häufigen Inventur-Abweichungen: Systemcheck",
            relatedCodes: ["10060", "20023"],
            kpiImpact: ["resolution_time"]
        },
        "10007": {
            title: "LAM belegt vor Aufnahme",
            category: "Behälter-RBG",
            priority: "Mittel",
            supportClass: "class2", 
            description: "Lastaufnahmemittel ist belegt, Aufnahme nicht möglich",
            causes: [
                "Hindernisse im LAM",
                "Defekte LAM-Sensorik",
                "Nicht ordnungsgemäß abgelegtes LHM"
            ],
            solutions: [
                "LAM visuell prüfen",
                "Hindernisse entfernen", 
                "LAM-Sensorik kalibrieren",
                "Transport abschließen falls LHM korrekt positioniert"
            ],
            wmsAction: "LAM freimachen oder Transport abschließen",
            escalation: "Bei häufigen LAM-Problemen: Mechanische Wartung",
            relatedCodes: ["10008", "20022"],
            kpiImpact: ["resolution_time"]
        }
    },

    // Enhanced emergency procedures with Data Center integration
    emergencyProcedures: {
        "class1_critical": {
            title: "Klasse 1 - Kritische Störungen",
            immediateActions: [
                "Sofort: Jungheinrich Software Support +43 316 811651 8888 anrufen",
                "Parallel: Autorisierte Georg Fischer Kontaktperson informieren",
                "Dokumentieren: Alle Fehlercodes, Symptome und Zeitpunkt erfassen",
                "Isolieren: Weitere Schäden durch Stilllegung betroffener Bereiche verhindern"
            ],
            followUpActions: [
                "Leitstandsmeldung überwachen",
                "KPI-Dashboard auf kritische Werte prüfen", 
                "Predictive Analytics für Folgestörungen aktivieren",
                "Operations-Team über Ausfallzeiten informieren"
            ],
            escalationPath: [
                "0-15 Min: Erste Diagnose mit Software Support",
                "15-60 Min: Techniker-Einsatz bei Hardware-Problemen",
                "60+ Min: Management-Escalation und Backup-Systeme"
            ]
        },
        "data_center_monitoring": {
            title: "Data Center Monitoring - Kritische Alerts",
            predictiveAlerts: [
                "Trend-Analyse zeigt Verschlechterung der Störungsbehebungszeit",
                "KPI 'Prozentuelle Störungsfreiheit' unter 90%",
                "Automated Outlier Detection meldet Anomalien"
            ],
            responseActions: [
                "Dashboard-Alerts sofort überprüfen",
                "Drilldown-Analyse für betroffene Geräte/Bereiche",
                "Präventive Wartung basierend auf AI-Empfehlungen einleiten",
                "Workload-Forecasting für Ressourcenplanung nutzen"
            ]
        },
        "system_down": {
            title: "Kritischer Systemausfall",
            steps: [
                "Sofort: Klasse 1 Support-Protokoll aktivieren",
                "Data Center Dashboard auf Systemstatus prüfen",
                "Alle aktiven Transporte dokumentieren",
                "Automatische Trend-Analyse pausieren",
                "Backup-Verfahren für kritische Operationen aktivieren",
                "AI-Learning pausieren um Datenintegrität zu sichern"
            ]
        },
        "maintenance_mode": {
            title: "Geplanter Wartungsmodus",
            preparation: [
                "Data Center: Alle laufenden Analysen beenden",
                "KPI-Monitoring auf Wartungsmodus umstellen", 
                "Predictive Analytics pausieren",
                "Journal-Daten für 366 Tage Retention sichern"
            ],
            execution: [
                "Sicheres Herunterfahren: Laufende Transporte abschließen",
                "AI-Learning-Daten sichern (5 Jahre Retention)",
                "Techniker-Zugang mit Data Center Integration bereitstellen",
                "Wartungsprotokoll für Trend-Analyse dokumentieren"
            ],
            restart: [
                "Systematischen Neustart mit Data Center Synchronisation",
                "KPI-Baseline neu kalibrieren",
                "Predictive Analytics mit aktualisierten Parametern starten",
                "Erste Trend-Analyse nach 24h Betrieb"
            ]
        }
    },

    // Enhanced common actions with Data Center integration
    commonActions: {
        "extern_buchen": {
            title: "LHM extern buchen",
            description: "Bucht das LHM auf einen definierten externen Ort",
            usage: [
                "LHM physikalisch bereits von der Anlage entfernt",
                "Lagerfach ist nur datentechnisch belegt, physikalisch aber leer"
            ],
            kpiImpact: "Reduziert 'Mittlere Störungsbehebungszeit'",
            dataCenter: "Aktion wird in KPI-Trend-Analyse berücksichtigt"
        },
        "transport_abschliessen": {
            title: "Transport abschließen",
            description: "Bucht das LHM auf den Zielort und löscht den Transportauftrag",
            usage: [
                "LHM befindet sich physikalisch bereits am Ziel",
                "Gerätesensorik meldet fälschlicherweise LAM-Belegung"
            ],
            kpiImpact: "Verbessert 'Prozentuelle Störungsfreiheit'", 
            dataCenter: "Positive Auswirkung auf Availability-Metriken"
        },
        "quit_senden": {
            title: "Quit an Gerät senden", 
            description: "Sendet 'Quittierung' an das Gerät für Verbindungsaufbau",
            usage: [
                "Unterbrochene Kommunikation zwischen GM und MFR",
                "Probleme in gerätespezifischen Telegrammen"
            ],
            kpiImpact: "Kann 'Mittlere störungsfreie Zeit' erhöhen",
            dataCenter: "Kommunikations-Reset wird in Trend-Analyse getrackt"
        },
        "transport_erneut": {
            title: "Transport erneut an das Gerät senden",
            description: "Sendet das Transportauftragstelegramm noch einmal an das Gerät",
            usage: [
                "Nach der Behebung einer physikalischen Störung",
                "Standard-Wiederholung nach Hardware-Fix"
            ],
            kpiImpact: "Reduziert 'Gesamte Störungsdauer'",
            dataCenter: "Retry-Pattern werden für Predictive Maintenance analysiert"
        },
        "predictive_maintenance": {
            title: "Präventive Wartung basierend auf KI-Analyse",
            description: "Wartungsmaßnahmen basierend auf Trend- und Abweichungsanalyse",
            usage: [
                "Automated Outlier Detection meldet Anomalien",
                "Trend-Analyse zeigt Verschlechterung der Performance",
                "AI-Empfehlungen für präventive Maßnahmen"
            ],
            kpiImpact: "Verbessert alle KPI-Kategorien langfristig",
            dataCenter: "Kern-Feature der Data Center AI-Integration"
        }
    },

    // Data Center specific information
    dataCenter: {
        configuration: {
            host: "Data Center Server",
            port: "34021 (Standard)",
            encryption: "Sichere Kommunikation verfügbar",
            retention: {
                journal: "366 Tage",
                analysis: "1830 Tage (5 Jahre)", 
                aiLearning: "1830 Tage (5 Jahre)"
            }
        },
        aiModules: {
            "trend_outlier": "Trend- und Abweichungsanalyse",
            "replenishment": "KI-basierte Nachschuboptimierung",
            "resource_planning": "KI-unterstützte Ressourcenplanung"
        },
        alertSystem: {
            colors: {
                yellow: "Warnungen bei voraussichtlichen Bearbeitungszeit-Problemen",
                red: "Kritische Alerts bei Überschreitung der Restzeit"
            },
            distribution: [
                "Leitstandsmeldungen",
                "Dashboard-Integration", 
                "E-Mail-Benachrichtigungen (nur während Geschäftszeiten)"
            ]
        }
    },

    // Training modules and procedures
    trainingModules: {
        "foundation": {
            title: "Foundation Training (Wochen 1-4)",
            duration: "40 Stunden",
            modules: [
                {
                    id: "system-basics",
                    title: "System Grundlagen",
                    duration: "8h",
                    topics: ["PC-Client Navigation", "Login/Logout", "Interface", "Kommunikationsprotokolle"],
                    prerequisites: "Keine",
                    level: "Beginner"
                },
                {
                    id: "warehouse-modeling",
                    title: "Warehouse Modeling",
                    duration: "12h", 
                    topics: ["HRL für Paletten", "AKL für Container", "Koordinatensysteme", "Lagersegmente"],
                    prerequisites: "System Grundlagen",
                    level: "Beginner"
                },
                {
                    id: "master-data",
                    title: "Stammdaten",
                    duration: "10h",
                    topics: ["Artikel-Stammdaten", "Ladungsträger", "Kunden/Lieferanten", "Parameter"],
                    prerequisites: "Warehouse Modeling",
                    level: "Beginner"
                },
                {
                    id: "safety-procedures",
                    title: "Sicherheitsverfahren",
                    duration: "6h",
                    topics: ["Arbeitssicherheit", "Notfall-Stopp", "Zugangskontrolle", "Dokumentation"],
                    prerequisites: "Keine",
                    level: "Beginner"
                }
            ]
        },
        "operational": {
            title: "Operational Training (Wochen 5-8)",
            duration: "60 Stunden",
            modules: [
                {
                    id: "goods-receipt",
                    title: "Wareneingang",
                    duration: "12h",
                    topics: ["Automatischer WE", "Manueller WE", "Qualitätskontrolle", "Einlagerung"],
                    prerequisites: "Stammdaten",
                    level: "Intermediate"
                },
                {
                    id: "storage-operations",
                    title: "Lagerbewegungen",
                    duration: "15h",
                    topics: ["Ein-/Auslagerung HRL", "Container AKL", "Umlagerungen", "Sperren/Freigaben"],
                    prerequisites: "Wareneingang",
                    level: "Intermediate"
                },
                {
                    id: "order-picking",
                    title: "Kommissionierung",
                    duration: "18h",
                    topics: ["Pick-Strategien", "Batch-Kommissionierung", "Wave Planning", "Versand"],
                    prerequisites: "Lagerbewegungen",
                    level: "Intermediate"
                },
                {
                    id: "inventory-management",
                    title: "Bestandsmanagement",
                    duration: "10h",
                    topics: ["Zyklische Inventur", "Korrekturen", "ABC-Analyse", "Verfügbarkeit"],
                    prerequisites: "Kommissionierung",
                    level: "Intermediate"
                }
            ]
        },
        "advanced": {
            title: "Advanced Training (Wochen 9-12)",
            duration: "80 Stunden",
            modules: [
                {
                    id: "performance-monitoring",
                    title: "Performance Monitoring",
                    duration: "12h",
                    topics: ["Dashboard", "KPI-Metriken", "Trend-Analyse", "Berichte"],
                    prerequisites: "Bestandsmanagement",
                    level: "Advanced"
                },
                {
                    id: "troubleshooting",
                    title: "Störungsbehandlung",
                    duration: "20h",
                    topics: ["Fehlercode-Diagnose", "Eskalation", "Kommunikation", "Hardware"],
                    prerequisites: "Performance Monitoring",
                    level: "Advanced"
                },
                {
                    id: "data-center-ops",
                    title: "Data Center Operations",
                    duration: "15h",
                    topics: ["Predictive Maintenance", "Trend-Erkennung", "Alerts", "Data Retention"],
                    prerequisites: "Störungsbehandlung",
                    level: "Advanced"
                },
                {
                    id: "system-administration",
                    title: "Systemadministration",
                    duration: "25h",
                    topics: ["Benutzerverwaltung", "Konfiguration", "Backup/Recovery", "Integration"],
                    prerequisites: "Data Center Operations",
                    level: "Advanced"
                }
            ]
        }
    },

    // Certification levels
    certificationLevels: {
        "level1": {
            title: "Level 1: Operator",
            duration: "40-60 Stunden",
            competencies: [
                "Grundlegende WMS Navigation",
                "Wareneingang und -ausgang", 
                "Einfache Lagerbewegungen",
                "Sicherheitsverfahren",
                "Basis-Störungsbehandlung"
            ],
            assessment: "Praktische Demonstration + Wissenstest",
            prerequisites: "Foundation Training abgeschlossen"
        },
        "level2": {
            title: "Level 2: Advanced Operator", 
            duration: "80-120 Stunden",
            competencies: [
                "Erweiterte Lagerprozesse",
                "Bestandsmanagement",
                "Kommissionierung und Nachschub",
                "Performance-Überwachung",
                "Mittlere Störungsbehandlung",
                "Teamführung im Schichtbetrieb"
            ],
            assessment: "Komplexe Szenarien + Führungsaufgaben",
            prerequisites: "Level 1 Zertifizierung + Operational Training"
        },
        "level3": {
            title: "Level 3: Administrator",
            duration: "120-150 Stunden", 
            competencies: [
                "Systemadministration",
                "Konfiguration und Anpassungen",
                "Notfallmanagement",
                "Data Center Überwachung",
                "Erweiterte Störungsbehandlung",
                "Support-Koordination"
            ],
            assessment: "Systemkonfiguration + Notfall-Simulation",
            prerequisites: "Level 2 Zertifizierung + Advanced Training"
        }
    },

    // Practical exercises
    practicalExercises: {
        "system-navigation": {
            title: "Übung 1: Systemnavigation",
            duration: "2h",
            objective: "Sichere Navigation im WMS System",
            tasks: [
                "Erfolgreicher Login und Logout",
                "Navigation zwischen Hauptmodulen", 
                "Verwendung von Filtern und Suchfunktionen",
                "Verständnis der Status-Icons"
            ],
            assessment: "Alle Navigationsaufgaben fehlerfrei ausführen"
        },
        "goods-receipt": {
            title: "Übung 2: Wareneingang",
            duration: "4h",
            objective: "Vollständige Wareneingang-Abwicklung",
            tasks: [
                "Avisierte Lieferung bearbeiten",
                "Qualitätskontrolle durchführen",
                "Einlagerung initiieren",
                "Dokumentation vervollständigen"
            ],
            assessment: "100% korrekte Wareneingangsbuchungen"
        },
        "troubleshooting-sim": {
            title: "Übung 3: Störungsbehandlung", 
            duration: "6h",
            objective: "Eigenständige Fehlerdiagnose und -behebung",
            tasks: [
                "Simulierte Störungen erkennen",
                "Fehlercode-Diagnose durchführen",
                "Lösungsschritte umsetzen",
                "Eskalation bei Bedarf"
            ],
            assessment: "80% der Störungen eigenständig lösen"
        },
        "performance-analysis": {
            title: "Übung 4: Performance Analysis",
            duration: "8h", 
            objective: "KPI-Analyse und Optimierung",
            tasks: [
                "Dashboard-Konfiguration",
                "KPI-Trend-Analyse",
                "Problemidentifikation", 
                "Optimierungsvorschläge entwickeln"
            ],
            assessment: "Aussagekräftige Analyse mit Handlungsempfehlungen"
        }
    },

    // Training contacts
    trainingContacts: {
        "training_coordinator": {
            name: "Nicole Schelling",
            role: "WMS Training Manager",
            email: "training@georgfischer.com",
            phone: "+41 81 725 25 25",
            availability: "Mo-Fr 08:00-17:00",
            responsibilities: "Trainingskoordination, Zertifizierung, Curriculum"
        },
        "technical_trainer": {
            name: "Jungheinrich Training Team",
            role: "Technical Trainers",
            email: "training@jungheinrich.at",
            phone: "+43 316 811651 8888",
            availability: "Mo-Fr 06:00-22:00",
            responsibilities: "Technische Schulungen, System-Training"
        },
        "local_mentors": {
            name: "Georg Fischer Mentors",
            role: "On-site Training Support",
            contacts: [
                "Thomas Heusser (+41 79 201 94 90)",
                "Benjamin Simon (+41 76 421 89 64)"
            ],
            responsibilities: "Praktische Unterstützung, Mentoring"
        }
    },

    // Enhanced keywords for natural language processing
    keywords: {
        "kommunikation": ["10003", "10045", "netzwerk", "verbindung", "tcp", "funk", "protokoll"],
        "kontur": ["10006", "20018", "20024", "größe", "höhe", "breite", "gewicht", "dimension"],
        "timeout": ["10039", "zeit", "sensor", "belegung", "wartezeit"],
        "weg": ["10024", "10053", "pfad", "route", "blockiert", "unerreichbar"],
        "lam": ["10007", "10008", "20022", "20028", "lastaufnahme", "belegt", "frei"],
        "fach": ["10004", "10005", "10060", "10061", "belegt", "leer", "zielfach", "quellfach"],
        "scanner": ["20162", "20160", "te-id", "etiketten", "scan", "barcode", "rfid"],
        "notfall": ["emergency", "hilfe", "support", "kontakt", "kritisch", "class1"],
        "kpi": ["performance", "verfügbarkeit", "störungszeit", "resolution", "availability"],
        "predictive": ["trend", "analyse", "ki", "ai", "vorhersage", "präventiv"],
        "data_center": ["datacenter", "überwachung", "monitoring", "dashboard", "analytics"],
        "extern": ["extern_buchen", "lhm", "buchen", "clear"],
        "quit": ["quit_senden", "quittierung", "reset", "verbindung"],
        "training": ["schulung", "ausbildung", "kurs", "lernen", "zertifizierung"],
        "module": ["modul", "lektion", "einheit", "kapitel", "abschnitt"],
        "übung": ["exercise", "aufgabe", "praktisch", "simulation", "demo"],
        "zertifikat": ["certification", "prüfung", "test", "bewertung", "abschluss"],
        "level": ["stufe", "ebene", "grad", "fortschritt", "kompetenz"]
    }
};

// Enhanced search and matching functions
const KnowledgeSearch = {
    findErrorCode: function(input) {
        const codeMatch = input.match(/\b(\d{5}|[A-Z]{6})\b/);
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

    findSupportClass: function(input) {
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('kritisch') || inputLower.includes('notfall') || 
            inputLower.includes('systemausfall') || inputLower.includes('class1')) {
            return WMSKnowledgeBase.supportClasses.class1;
        }
        
        if (inputLower.includes('class2') || inputLower.includes('nicht-kritisch')) {
            return WMSKnowledgeBase.supportClasses.class2;
        }
        
        if (inputLower.includes('class3') || inputLower.includes('schulung') || 
            inputLower.includes('beratung')) {
            return WMSKnowledgeBase.supportClasses.class3;
        }
        
        return null;
    },

    findKPIInfo: function(input) {
        const inputLower = input.toLowerCase();
        const matches = [];
        
        for (const [key, kpi] of Object.entries(WMSKnowledgeBase.kpiMetrics)) {
            if (inputLower.includes(key.replace('_', '')) || 
                inputLower.includes(kpi.name.toLowerCase()) ||
                inputLower.includes('kpi') || inputLower.includes('performance')) {
                matches.push(kpi);
            }
        }
        
        return matches;
    },

    findEmergencyContact: function(input) {
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('software') || inputLower.includes('wms') || 
            inputLower.includes('protokoll')) {
            return WMSKnowledgeBase.emergencyContacts.software_support;
        }
        
        if (inputLower.includes('mechanisch') || inputLower.includes('hardware') || 
            inputLower.includes('wartung')) {
            return WMSKnowledgeBase.emergencyContacts.mechanical_support;
        }
        
        if (inputLower.includes('georg fischer') || inputLower.includes('internal')) {
            return WMSKnowledgeBase.emergencyContacts.georg_fischer_contacts;
        }
        
        return null;
    },

    findTrainingInfo: function(input) {
        const inputLower = input.toLowerCase();
        const matches = [];

        // Search training modules
        for (const [categoryKey, category] of Object.entries(WMSKnowledgeBase.trainingModules)) {
            if (inputLower.includes(categoryKey) || 
                inputLower.includes(category.title.toLowerCase())) {
                matches.push({type: 'category', data: category});
            }

            category.modules.forEach(module => {
                if (inputLower.includes(module.id.replace('-', '')) ||
                    inputLower.includes(module.title.toLowerCase()) ||
                    module.topics.some(topic => inputLower.includes(topic.toLowerCase()))) {
                    matches.push({type: 'module', data: module});
                }
            });
        }

        // Search certification levels
        for (const [levelKey, level] of Object.entries(WMSKnowledgeBase.certificationLevels)) {
            if (inputLower.includes(levelKey) || 
                inputLower.includes(level.title.toLowerCase()) ||
                level.competencies.some(comp => inputLower.includes(comp.toLowerCase()))) {
                matches.push({type: 'certification', data: level});
            }
        }

        // Search exercises
        for (const [exerciseKey, exercise] of Object.entries(WMSKnowledgeBase.practicalExercises)) {
            if (inputLower.includes(exerciseKey.replace('-', '')) ||
                inputLower.includes(exercise.title.toLowerCase()) ||
                exercise.tasks.some(task => inputLower.includes(task.toLowerCase()))) {
                matches.push({type: 'exercise', data: exercise});
            }
        }

        return matches;
    },

    findTrainingContact: function(input) {
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('training') || inputLower.includes('schulung') || 
            inputLower.includes('nicole') || inputLower.includes('schelling')) {
            return WMSKnowledgeBase.trainingContacts.training_coordinator;
        }
        
        if (inputLower.includes('technical') || inputLower.includes('technisch') ||
            inputLower.includes('jungheinrich training')) {
            return WMSKnowledgeBase.trainingContacts.technical_trainer;
        }
        
        if (inputLower.includes('mentor') || inputLower.includes('local') ||
            inputLower.includes('vor ort')) {
            return WMSKnowledgeBase.trainingContacts.local_mentors;
        }
        
        return null;
    },

    searchAll: function(input) {
        const results = {
            errorCode: this.findErrorCode(input),
            keywords: this.findByKeyword(input),
            supportClass: this.findSupportClass(input),
            kpiInfo: this.findKPIInfo(input),
            emergencyContact: this.findEmergencyContact(input),
            trainingInfo: this.findTrainingInfo(input),
            trainingContact: this.findTrainingContact(input),
            predictiveAlert: null,
            emergency: null
        };

        // Check for predictive/AI related queries
        if (input.toLowerCase().includes('trend') || 
            input.toLowerCase().includes('predictive') ||
            input.toLowerCase().includes('ki') || input.toLowerCase().includes('ai')) {
            results.predictiveAlert = WMSKnowledgeBase.predictiveAlerts;
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