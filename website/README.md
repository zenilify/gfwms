# Georg Fischer WMS - Störungsbehandlung Website

## Übersicht

Diese Website enthält die vollständige Dokumentation für die Störungsbehandlung im Georg Fischer Warehouse Management System (WMS). Die Dokumentation basiert auf der offiziellen Schulungsunterlage Version 0.9 vom 20.12.2024.

## Website-Struktur

```
website/
├── index.html                          # Hauptseite mit Übersicht
├── docs/                               # Dokumentationsseiten
│   ├── wiki.html                       # Vollständige Wiki (HTML-Version)
│   ├── conveyor_system_errors.html     # Fördertechnik-Störungen Guide
│   ├── wiki.md                         # Wiki im Markdown-Format
│   ├── conveyor_system_errors.md       # Fördertechnik Guide (Markdown)
│   └── stoerungsbehebung.txt           # Original-Dokument
├── assets/                             # Website-Assets
│   ├── css/
│   │   ├── style.css                   # Haupt-Stylesheet
│   │   └── docs.css                    # Dokumentations-spezifische Styles
│   ├── js/
│   │   └── script.js                   # JavaScript-Funktionalität
│   └── images/                         # Bilder (falls benötigt)
└── README.md                           # Diese Datei
```

## Features

### 🏠 Hauptseite (index.html)
- Moderne, responsive Landingpage
- Übersicht aller verfügbaren Dokumentationen
- Quick Reference für häufige Störungen
- Kontaktinformationen
- Suchfunktionalität (Strg+K)

### 📚 Vollständige Wiki (docs/wiki.html)
- Strukturierte Darstellung aller Störungscodes
- Navigierbare Seitenleiste mit Inhaltsverzeichnis
- Farbkodierte Fehlerkategorien
- Detaillierte Lösungsschritte
- Print-optimierte Darstellung

### 🔧 Fördertechnik-Guide (docs/conveyor_system_errors.html)
- Spezialisierte Anleitung für Fördertechnik-Störungen
- Error Code Index mit Prioritätskennzeichnung
- Schritt-für-Schritt Diagnose-Verfahren
- Quick Resolution Matrix
- Notfallverfahren

### 🎨 Design & Usability
- Responsive Design für Desktop, Tablet und Mobile
- Moderne CSS-Gradients und Animationen
- FontAwesome Icons für bessere Visualisierung
- Smooth Scrolling Navigation
- Sticky Sidebar für einfache Navigation

## Technische Details

### CSS-Framework
- Custom CSS mit CSS Grid und Flexbox
- Responsive Breakpoints
- CSS Custom Properties für Theming
- Print-Styles für Dokumentation

### JavaScript-Features
- Smooth Scrolling Navigation
- Live Search Funktionalität
- Intersection Observer für Animation
- Keyboard Shortcuts (Strg+K für Suche)
- Mobile-optimierte Touch-Events

### Browser-Kompatibilität
- Moderne Browser (Chrome, Firefox, Safari, Edge)
- Progressive Enhancement
- Fallbacks für ältere Browser

## Installation & Deployment

### Lokale Entwicklung
```bash
# Website-Ordner öffnen
cd website/

# Lokalen Server starten (Python)
python -m http.server 8000

# Oder mit Node.js
npx serve .

# Website unter http://localhost:8000 verfügbar
```

### Web-Server Deployment
1. Gesamten `website/` Ordner auf Web-Server hochladen
2. `index.html` als Standard-Seite konfigurieren
3. MIME-Types für .md und .txt Dateien konfigurieren

### GitHub Pages Deployment
```bash
# Repository erstellen und files committen
git init
git add .
git commit -m "Initial website deployment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# GitHub Pages in Repository Settings aktivieren
# Branch: main, Ordner: / (root)
```

## Wartung & Updates

### Inhalts-Updates
1. Original `stoerungsbehebung.txt` aktualisieren
2. Markdown-Dateien entsprechend anpassen
3. HTML-Versionen regenerieren
4. Search-Index in `script.js` aktualisieren

### Design-Updates
- Styles in `assets/css/style.css` und `docs.css` anpassen
- Farbschema über CSS Custom Properties ändern
- JavaScript-Funktionen in `script.js` erweitern

## Dokumentation der Störungscodes

### Fördertechnik-Störungen
- **10003**: Kommunikationsstörung zum Gerät
- **10006**: Konturenfehler (Überhöhe, Überbreite, Überlänge, Übergewicht)
- **10009**: Gerätemanager lehnt Transport wegen befristeter Annahmesperre ab
- **10024**: Ziel unerreichbar - Gerät oder Ort blockiert Weg
- **10039**: Timeout Platzbelegung
- **10045**: Problem im gerätespezifischen Kommunikationsprotokoll
- **10053**: Ziel unerreichbar - Kein Weg zwischen Quelle und Ziel modelliert
- **20162**: TE-ID der Fördertechniksteuerung ist Null (No Read)

### Behälter-Regalbediengerät-Störungen
- **10004**: Zielfach belegt bei Abgabe
- **10005**: Quellfach nicht belegt bei Aufnahme
- **10007**: LAM belegt vor Aufnahme
- **10008**: LAM frei vor Abgabe
- **20018**: Istbelegung > Sollbelegung
- **20019**: Zielfach zu klein
- **20022**: LAM belegt nach Abgabe
- Weitere Codes siehe Vollständige Wiki

### Paletten-Regalbediengerät-Störungen
- **TALOES**: Bediener hat Ladeeinheit entfernt
- **NRUNBE**: LE-Nr ist nicht vorhanden
- **SPLEER**: Startposition ist leer
- **ZPVOLL**: Zielposition ist belegt/voll
- Weitere Codes siehe Vollständige Wiki

## Support & Kontakt

### Technischer Support
- **Jungheinrich Support**: Für Protokollfehler und technische Probleme
- **IT-Abteilung**: Bei Netzwerk- und Kommunikationsstörungen
- **Jungheinrich Kundendienst**: Für spezielle Gerätewartung

### Website-Support
- Repository Issues für Bug-Reports
- Pull Requests für Verbesserungen
- Dokumentations-Updates via Issues

## Lizenz

Dieses Projekt basiert auf der offiziellen Georg Fischer Störungsbehandlung Schulungsunterlage und dient ausschließlich internen Zwecken.

---

*Erstellt auf Basis der Georg Fischer Störungsbehandlung Schulungsunterlage Version 0.9 vom 20.12.2024*