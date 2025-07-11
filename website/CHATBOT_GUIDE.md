# WMS Troubleshooting Chatbot - User Guide

## Overview

Der WMS Troubleshooting Chatbot ist ein intelligenter Assistent, der Mitarbeitern bei der Behebung von Störungen im Georg Fischer Warehouse Management System hilft. Der Chatbot basiert auf der vollständigen Dokumentation und kann sofort Antworten zu Fehlercodes, Lösungsschritten und Kontaktinformationen liefern.

## Features

### 🤖 Intelligente Antworten
- Erkennt Fehlercodes automatisch (z.B. "10003", "20162")
- Versteht natürliche Sprache und Schlüsselwörter
- Bietet strukturierte, detaillierte Antworten

### 🔍 Umfassende Wissensbasis
- **30+ Fehlercodes** aus allen Gerätekategorien
- **Fördertechnik-Störungen**: 10003-20162
- **Behälter-RBG-Störungen**: 10004-20160
- **Paletten-RBG-Störungen**: TALOES, NRUNBE, etc.

### 💬 Benutzerfreundliche Oberfläche
- Moderne Chat-Oberfläche mit Echtzeit-Antworten
- Schnellzugriff-Buttons für häufige Fragen
- Auto-Vervollständigung und Vorschläge
- Export-Funktion für Chat-Verläufe

## Beispiel-Gespräche

### Test 1: Fehlercode-Abfrage
**Benutzer**: "Was ist Fehlercode 10003?"

**Chatbot**: 
```
🔴 Hohe Priorität - Kommunikationsfehler

Problem: Transport kann nicht an Gerät weitergegeben werden - TCP/IP-Verbindung fehlgeschlagen

Mögliche Ursachen:
• Gerät hardwareseitig deaktiviert ('Strom aus')
• Unterbrochene Funkverbindung zum Access-Point
• Defekter Funkempfänger
• Probleme im hausinternen Netzwerk

Lösungsschritte:
1. Gerät neu starten ('Strom aus' → 'Strom ein')
2. Gerät im Handbetrieb verfahren für Funkverbindung
3. IT-Abteilung kontaktieren bei Netzwerkproblemen

WMS-Aktion: Standard transport retry nach Hardware-Lösung

Verwandte Fehlercodes: 10045, 10024
```

### Test 2: Problem-Beschreibung
**Benutzer**: "LAM belegt Problem"

**Chatbot**:
```
Ich habe 4 relevante Störungen gefunden:

10007 - LAM belegt vor Aufnahme (Mittel)
10008 - LAM frei vor Abgabe (Mittel)
20022 - LAM belegt nach Abgabe (Mittel)
20028 - LAM frei nach Aufnahme (Mittel)

Klicken Sie auf einen Fehlercode für detaillierte Informationen.
```

### Test 3: Kontakt-Anfrage
**Benutzer**: "Notfallkontakte anzeigen"

**Chatbot**:
```
📞 Kontaktinformationen

🎧 Jungheinrich Support
Zuständig für: Für Protokollfehler und technische Probleme
Wann kontaktieren: Bei wiederholten Störungen, Protokollfehlern

🌐 IT-Abteilung
Zuständig für: Bei Kommunikations- und Netzwerkstörungen
Wann kontaktieren: Netzwerkprobleme, Kommunikationsstörungen

🔧 Jungheinrich Kundendienst
Zuständig für: Für spezielle Gerätewartung und -reparatur
Wann kontaktieren: Hardware-Probleme, Gerätewartung

💡 Tipp: Bei dringenden Problemen immer zuerst den technischen Support kontaktieren.
```

### Test 4: Allgemeine Hilfe
**Benutzer**: "Hilfe"

**Chatbot**:
```
🤔 Wie kann ich Ihnen helfen?

⚠️ Fehlercodes
Fragen Sie nach spezifischen Codes wie "10003", "10006", etc.

🔍 Problemsuche
Beschreiben Sie Ihr Problem: "Kommunikationsstörung", "LAM belegt", etc.

📞 Kontakte
Fragen Sie nach "Kontakte" oder "Support"

🚨 Notfall
Fragen Sie nach "Notfall" oder "kritisch"
```

## Unterstützte Anfrage-Typen

### 1. Direkte Fehlercode-Eingabe
- `"10003"`
- `"Fehlercode 10006"`
- `"Was ist 20162?"`

### 2. Problem-Beschreibungen
- `"Kommunikationsstörung"`
- `"LAM belegt"`
- `"Timeout Problem"`
- `"Konturenfehler"`
- `"Zielfach belegt"`

### 3. Aktions-Anfragen
- `"LHM extern buchen"`
- `"Transport abschließen"`
- `"Quit an Gerät senden"`

### 4. Kontakt & Hilfe
- `"Kontakte"`
- `"Support"`
- `"Notfall"`
- `"Hilfe"`

## Chatbot-Funktionen

### Schnellzugriff-Buttons
- **Fehlercode 10003**: Direkte Abfrage des häufigsten Fehlers
- **Kommunikationsstörung**: Allgemeine Hilfe bei Verbindungsproblemen
- **Konturenfehler**: Hilfe bei Dimensionsproblemen
- **Notfallkontakte**: Sofortiger Zugriff auf Support-Informationen

### Chat-Management
- **Chat löschen**: Gesamten Gesprächsverlauf zurücksetzen
- **Chat exportieren**: Protokoll als Textdatei herunterladen
- **Statistiken**: Anzahl beantworteter Fragen verfolgen

### Suchvorschläge
- Auto-Vervollständigung beim Tippen
- Kontextuelle Vorschläge basierend auf Eingabe
- Verwandte Fehlercodes-Links

## Technische Features

### Natürliche Sprachverarbeitung
- Erkennt Fehlercodes in natürlicher Sprache
- Versteht Synonyme und verwandte Begriffe
- Schlägt ähnliche Probleme vor

### Responsive Design
- Funktioniert auf Desktop, Tablet und Mobile
- Touch-optimierte Bedienung
- Adaptive Benutzeroberfläche

### Performance
- Sofortige Antworten (< 2 Sekunden)
- Lokale Wissensbasis für schnelle Suche
- Keine externe API-Abhängigkeiten

## Best Practices

### Für Benutzer
1. **Spezifisch sein**: Verwenden Sie genaue Fehlercodes wenn bekannt
2. **Problembeschreibung**: Beschreiben Sie Symptome wenn Fehlercode unbekannt
3. **Schrittweise vorgehen**: Folgen Sie den vorgeschlagenen Lösungsschritten
4. **Chat exportieren**: Speichern Sie wichtige Lösungswege

### Für Administratoren
1. **Wissensbasis aktualisieren**: Neue Fehlercodes in `chatbot-knowledge.js` hinzufügen
2. **Suchbegriffe erweitern**: Keywords für bessere Erkennung ergänzen
3. **Statistiken überwachen**: Häufige Anfragen analysieren
4. **Feedback sammeln**: Benutzererfahrungen auswerten

## Wartung & Updates

### Wissensbasis erweitern
```javascript
// Neuen Fehlercode hinzufügen
"10099": {
    title: "Neuer Fehler",
    category: "Fördertechnik",
    priority: "Hoch",
    description: "Beschreibung des neuen Fehlers",
    causes: ["Ursache 1", "Ursache 2"],
    solutions: ["Lösung 1", "Lösung 2"],
    wmsAction: "Entsprechende WMS-Aktion",
    relatedCodes: ["10003", "10006"]
}
```

### Keywords aktualisieren
```javascript
// Neue Suchbegriffe hinzufügen
"keywords": {
    "neuer_begriff": ["10099", "verwandte", "codes"]
}
```

## Deployment

### Lokale Installation
1. Website-Ordner auf Server kopieren
2. Alle JavaScript-Dateien sind bereits optimiert
3. Keine zusätzlichen Dependencies erforderlich

### Anpassungen
- **Styling**: `assets/css/chatbot.css` anpassen
- **Wissensbasis**: `assets/js/chatbot-knowledge.js` erweitern
- **Verhalten**: `assets/js/chatbot.js` modifizieren

---

## Zusammenfassung

Der WMS Troubleshooting Chatbot bietet:

✅ **Sofortige Hilfe** bei allen dokumentierten Störungen  
✅ **Intelligente Suche** mit natürlicher Sprache  
✅ **Strukturierte Antworten** mit Ursachen und Lösungen  
✅ **Kontaktinformationen** für weiterführende Hilfe  
✅ **Benutzerfreundliche Oberfläche** für alle Geräte  
✅ **Exportfunktionen** für Dokumentation  

Der Chatbot ist bereit für den Produktiveinsatz und kann bei Bedarf einfach erweitert werden.

*Erstellt für das Georg Fischer WMS Troubleshooting System*