# Störungsbehandlung Wiki - Georg Fischer WMS

## Inhaltsverzeichnis

1. [Automatik Störungsbehandlung](#automatik-störungsbehandlung)
   - [Störungsbehandlungsmöglichkeiten](#störungsbehandlungsmöglichkeiten)
   - [Störungsbehandlung Assistent](#störungsbehandlung-assistent)
2. [Störungen auf der Fördertechnik](#störungen-auf-der-fördertechnik)
3. [Störungen am Behälter-Regalbediengerät](#störungen-am-behälter-regalbediengerät)
4. [Störungen am Paletten-Regalbediengerät](#störungen-am-paletten-regalbediengerät)
5. [Troubleshooting Quick Reference](#troubleshooting-quick-reference)

---

## Automatik Störungsbehandlung

### Übersicht

Automatik > Störungsbehandlung

Tritt während eines Transports eine Störung auf, wird diese umgehend in den Dialog Störungsbehandlung eingeschrieben. Damit der betroffene Transport fortgesetzt werden kann, muss dieser in der Störungsbehandlung bearbeitet werden.

**Wichtige Unterscheidung:**
- **Transportbezogene Störungen**: Logische Störungen
- **Gerätebezogene Störungen**: Physikalische Störungen (anlagenbedingt)

**Erkennungszeichen**: Störung am Hauptbildschirm des Jungheinrich WMS erkennbar durch rot hinterlegtes Feld "Automatik".

### Störungsbehandlungsmöglichkeiten

#### 1. Transport erneut an das Gerät senden

**Standard**: Nach der Behebung einer physikalischen Störung wird das Transportauftragstelegramm noch einmal an das Gerät gesendet.

**Varianten:**
- **Lagerort sperren und neues Ziel suchen**: Für Ein- und Umlagerungen wenn LHM-Abgabe am Zielort nicht möglich
- **Neues Ziel suchen**: Automatische Suche nach neuem Ziel für Transport
- **LHM-Abmessungen ändern**: Öffnet Dialog für Korrektur der LHM-Abmessungen
- **LHM-Abmessungen ändern und neues Ziel suchen**: Kombination aus Abmessungskorrektur und neuer Zielsuche
- **LHM wurde bereits aufgenommen**: Sendet Abgabetelegramm wenn LHM bereits am LAM ist
- **LHM anfordern**: Für NOK-Behandlung bei Konturenfehlern

#### 2. LHM extern buchen

Bucht das LHM auf einen definierten externen Ort.

**Anwendungsfälle:**
- LHM wurde physikalisch bereits von der Anlage entfernt
- Lagerfach ist nur datentechnisch belegt, physikalisch aber leer

#### 3. Transport abschließen

Bucht das LHM auf den Zielort und löscht den Transportauftrag.

**Anwendungsfälle:**
- LHM befindet sich physikalisch bereits am Ziel
- Gerätesensorik meldet fälschlicherweise LAM-Belegung

#### 4. Quit an Gerät senden

Sendet 'Quittierung' an das Gerät für Verbindungsaufbau zwischen GM und MFR.

**Anwendungsfälle:**
- Unterbrochene Kommunikation zwischen GM und MFR
- Probleme in gerätespezifischen Telegrammen

#### 5. Störung löschen

Löscht nicht transportabhängige Störungen (nur zur Information).

**Anwendungsfälle:**
- Allgemeine Anlagenstörungen (z.B. Personenschutzlichtschranke)

#### 6. Transport rücksetzen

LHM bleibt verbucht, Transport wird storniert.

**Anwendungsfälle:**
- LHM soll auf der Anlage bleiben (z.B. bei erkanntem Versatz)
- Transportkette soll gelöscht werden

#### 7. Transport abbrechen

LHM wird auf aktuellen Ort gebucht, gesamte Transportkette wird gelöscht.

**Anwendungsfälle:**
- LHM wird an unerwarteten Ort gescannt
- Transportkette kann von aktuellem Ort nicht weiterfahren

### Störungsbehandlung Assistent

Der Assistent unterstützt Benutzer bei der Störungsbehandlung durch strukturierte Führung.

**Dialogbestandteile:**
- **Situation**: Beschreibung der aktuellen Störungssituation
- **Ursache & Behebung**: Mögliche Ursachen und Behebungsoptionen
- **Behandlung**: Verfügbare Behandlungsoptionen

**Störungsinformationen:**
- Gerät, Störungsnummer, Beschreibung
- Zeitstempel, Laufende Störungs-ID, Transport-ID
- Kommentar, Quittierbereich, Betroffener Lagerort, LHM-Nummer

---

## Störungen auf der Fördertechnik

### 10003 - Kommunikationsstörung zum Gerät

**Situation**: Transport kann nicht an Gerät weitergegeben werden (TCP/IP-Problem)

**Ursachen:**
- Gerät hardwareseitig deaktiviert
- Unterbrochene Funkverbindung zum Access-Point
- Defekter Funkempfänger
- Probleme im hausinternen Netzwerk

**Behebung:**
- Gerät neu starten
- Gerät im Handbetrieb verfahren für Funkverbindung
- IT-Abteilung kontaktieren bei Netzwerkproblemen

### 10006 - Konturenfehler

**Situation**: LHM kommt am Richtplatz heraus wegen Überhöhe, Überbreite, Überlänge oder Übergewicht

**Ursachen:**
- Abmessungen entsprechen nicht den Vorgaben

**Behebung:**
- Abmessungen anpassen
- LHM von Anlage nehmen wenn nicht anpassbar

### 10009 - Befristete Annahmesperre

**Situation**: Gerätemanager lehnt Transport ab bei vorhandener Störung

**Ursachen:**
- Tritt mit anderen Störungen auf

**Behebung:**
- Nach Behebung der ursprünglichen Störung: "Transport erneut senden" + "Standard"

### 10024 - Ziel unerreichbar

**Situation**: Nicht verfahrbares Gerät oder langfristig gestörter Ort blockiert den Weg

**Ursachen:**
- Gerät blockiert den Weg (offline/gestört)
- Ort ist langfristig gestört

**Behebung:**
- Blockierendes Gerät überprüfen und aktivieren
- Langfristige Störung aufheben oder neues Ziel suchen

### 10039 - Timeout Platzbelegung

**Situation**: Keine Belegungsmeldung von Fördertechnik nach Timeout

**Ursachen:**
- Lichttaster/Lichtschranke erkennt keine Belegung

**Behebung:**
- Lichttaster/Lichtschranke justieren
- "Transport erneut senden" + "Standard"

### 10045 - Protokollfehler

**Situation**: Problem im gerätespezifischen Kommunikationsprotokoll

**Ursachen:**
- Protokoll nicht korrekt implementiert

**Behebung:**
- "Quit an Gerät senden"
- Jungheinrich Support kontaktieren

### 10053 - Kein Weg modelliert

**Situation**: Kein durchgehender Weg zwischen Quelle und Ziel

**Ursachen:**
- Modellierungsfehler

**Behebung:**
- Wege in Transportmanager-Konfiguration korrigieren
- Transportmanager neu starten

### 20162 - TE-ID ist Null (No Read)

**Situation**: TE-ID des Auftrages gesetzt, aber Fördertechnik-TE-ID nicht gesetzt

**Ursachen:**
- No-read beim Scanner der Fördertechniksteuerung

**Behebung:**
- "Transport erneut senden" + "LHM anfordern"
- LHM-Etikett-Qualität überprüfen

---

## Störungen am Behälter-Regalbediengerät

### Geräteprotokollabhängige Störungen

**Verschiedene Meldungen:**
- Unerlaubter Befehl
- RBG nicht betriebsbereit
- Auftragsnummer falsch
- Platz gesperrt
- LAM-Stellung nicht benötigt
- Timeout bei Auftragswarten
- Unzulässige Kombinationen

**Behebung:**
- Störung beheben/Handbetrieb beenden
- "Transport weiterführen" + "Standard"
- Bei wiederholten Störungen: Jungheinrich kontaktieren

### 10003 - Kommunikationsstörung zum Gerät

Identisch mit Fördertechnik-Störung 10003.

### 10004 - Zielfach belegt bei Abgabe

**Situation**: Ziellagerfach ist bei Abgabe belegt

**Ursachen:**
- Fach tatsächlich belegt
- Folie oder Gegenstände verursachen Belegungserkennung
- Verstelle Sensorik

**Behebung:**
- Gegenstand entfernen + "Transport erneut senden"
- Neues Ziel suchen + Lagerort sperren
- Sensorik einstellen

### 10005 - Quellfach nicht belegt bei Aufnahme

**Situation**: Quellfach ist leer bei geplanter Aufnahme

**Ursachen:**
- Fach ist tatsächlich leer
- Verstelle Sensorik

**Behebung:**
- Bei leerem Fach: "LHM extern buchen" auf CLEAR
- Entnahmemenge auf 0 korrigieren bei Kommissionierung
- Sensorik korrigieren

### 10006 - Konturenfehler

Identisch mit Fördertechnik-Störung 10006.

### 10007 - LAM belegt vor Aufnahme

**Situation**: Lastaufnahmemittel bereits belegt vor Aufnahme

**Ursachen:**
- Aufnahme nach Störung nicht abgeschlossen
- Anderes LHM oder Fremdkörper am LAM
- Verstelle Sensorik

**Behebung:**
- Kontrolle der physischen Belegung
- "LHM wurde bereits aufgenommen" wenn korrekt
- Fremdkörper entfernen oder Sensorik korrigieren

### 10008 - LAM frei vor Abgabe

**Situation**: LAM ist frei vor geplanter Abgabe

**Ursachen:**
- Abgabe nach Störung nicht abgeschlossen
- Verstelle Sensorik

**Behebung:**
- Kontrolle ob LHM am richtigen Ort abgegeben
- "Transport abschließen" oder Sensorik korrigieren

### 10009 - Befristete Annahmesperre

Identisch mit Fördertechnik-Störung 10009.

### 10014 - Koordinaten für Fach nicht gültig

**Situation**: Koordinate kann nicht angefahren werden

**Ursachen:**
- Lagerort in RBG als nicht anfahrbar, im WMS als verfügbar markiert

**Behebung:**
- Lagerort im WMS sperren
- "Lagerort sperren und neues Ziel suchen"

### 10045 - Protokollfehler

Identisch mit Fördertechnik-Störung 10045.

### 10039 - Timeout Platzbelegung

Identisch mit Fördertechnik-Störung 10039.

### 10060 - Quellfach verdeckt

**Situation**: Quellfach durch anderes LHM verdeckt

**Ursachen:**
- Falsche Sensorik
- Anderes LHM verdeckt aufzunehmendes LHM

**Behebung:**
- Sensorik justieren
- Verdeckendes LHM entfernen und extern buchen
- Daten richtigstellen bei Buchungsfehlern

### 10061 - Zielfach verdeckt

**Situation**: Zielfach durch anderes LHM verdeckt

**Ursachen:**
- Falsche Sensorik
- LHM verdeckt Zielort

**Behebung:**
- Sensorik justieren
- Verdeckendes LHM entfernen
- Neues Ziel suchen wenn nicht möglich

### 20018 - Istbelegung > Sollbelegung

**Situation**: Gemessene Höhe größer als mitgeteilte Höhe

**Ursachen:**
- LHM-Veränderung seit letzter Kontrolle
- Unterschiedliche Konturenkontrollen

**Behebung:**
- Höhe prüfen und mit WMS-Wert vergleichen
- "LHM-Abmessungen ändern und neues Ziel suchen"

### 20019 - Zielfach zu klein

**Situation**: Zielfach für LHM zu klein

**Ursachen:**
- Fehler in Lagerort-Definition (Gerät oder WMS)

**Behebung:**
- Korrektur am Gerät
- WMS-Dimensionen anpassen
- Neues Ziel suchen

### 20022 - LAM belegt nach Abgabe

**Situation**: LAM noch belegt nach Abgabe

**Ursachen:**
- Falsche Sensorik
- Problem bei Abgabe

**Behebung:**
- Sensorik überprüfen + "Transport abschließen"
- Ursache beheben (Ortshöhe, Regalquerträger)
- Lagerort sperren wenn nicht kurzfristig behebbar

### 20023 - Quell-/Zielfach verdeckt

**Situation**: Quell- oder Zielfach verdeckt

**Ursachen:**
- Falsche Sensorik
- Verdeckendes LHM

**Behebung:**
- Sensorik justieren
- Verdeckendes LHM entfernen und extern buchen
- Neues Ziel suchen bei Zielfach-Verdeckung

### 20024 - Konturenfehler

**Situation**: Konturenfehler bei Aufnahme durch RBG

**Ursachen:**
- Konturenkontrolle erst am RBG
- Inkorrekte Einstellung
- Ladungsverschiebung

**Behebung:**
- "LHM anfordern" für Ausschleusung
- Sensorik justieren
- Ladung sichern

### 20026 - Übergabe nicht bereit

**Situation**: Fördertechnik erlaubt keine Aufnahme/Abgabe

**Ursachen:**
- Fördertechnik gestört
- Laufende Bewegungen nicht abgeschlossen

**Behebung:**
- Fördertechnik-Problem beheben
- "Transport erneut senden" + "Standard"

### 20028 - LAM frei nach Aufnahme

**Situation**: LAM frei nach Aufnahme trotz erkanntem LHM

**Ursachen:**
- Falsche Sensorik
- Problem bei Aufnahme

**Behebung:**
- Problem beheben + "Transport erneut senden"
- Ursache feststellen (Ortshöhe, Regalquerträger)
- Manuell aufnehmen + "LHM wurde bereits aufgenommen"

### 20160 - TE-ID abweichend

**Situation**: TE-ID des RBG-Auftrages stimmt nicht mit Fördertechnik überein

**Ursachen:**
- Versatz bei LHM-Daten
- LHM entfernt ohne WMS-Behandlung

**Behebung:**
- Sichtkontrolle am RBG
- Transportstatus kontrollieren
- "LHM extern buchen" je nach Situation

### 20162 - TE-ID ist Null (No Read)

Identisch mit Fördertechnik-Störung 20162.

---

## Störungen am Paletten-Regalbediengerät

### TALOES - Ladeeinheit entfernt

**Situation**: LHM manuell vom RBG entfernt

**Behebung**: LHM extern buchen, Transport wird gelöscht

### NRUNBE - LE-Nr nicht vorhanden

**Situation**: LHM soll abgegeben werden, liegt aber nicht am RBG

**Behebung**: LHM extern buchen, alle Transporte werden gelöscht

### SPNBER - Startposition nicht bereit

**Situation**: Fördertechnik nicht zur Entnahme bereit

**Behebung**: Fördertechnik-Störung beheben, Transport erneut senden

### SPLEER - Startposition ist leer

**Situation**: Aufnahmeort ist leer

**Behebung**: Prüfung ob tatsächlich leer, dann extern buchen oder Sensoren einstellen

### SPVERD - Startposition verdeckt

**Situation**: LHM durch anderes LHM verdeckt

**Behebung**: Prüfung ob tatsächlich verdeckt, Sensoren einstellen

### SPSPER - Startposition gesperrt

**Situation**: Lagerort RBG-seitig gesperrt

**Behebung**: Ort sperren und neues Ziel suchen

### ZPSPER - Zielposition gesperrt

**Situation**: Zielort RBG-seitig gesperrt

**Behebung**: Ort sperren und neuen Zielort suchen

### ZPNBER - Zielposition nicht bereit

**Situation**: Fördertechnik nicht zur Übernahme bereit

**Behebung**: Fördertechnik-Störung beheben, Transport erneut senden

### ZPVOLL - Zielposition belegt

**Situation**: Zielposition ist belegt

**Behebung**: Prüfung der Belegung, anderen Lagerort suchen oder Sensoren einstellen

### ZPVERD - Zielposition verdeckt

**Situation**: Zielort von LHM verdeckt

**Behebung**: Sensoren einstellen und Transport erneut senden

### ZPBSPE - Zielposition durch Bediener gesperrt

**Situation**: Lagerort RBG-seitig gesperrt

**Behebung**: Jungheinrich Kundendienst kontaktieren

### LEGEAN - Ladeeinheit geändert

**Situation**: LHM-Abmessungen stimmen nicht überein

**Behebung**: Sensoren einstellen, Abmessungen im WMS neu definieren

### Sammelstörung

**Behandlung**: Störung am Gerät quittieren, weitere Meldungen werden dann angezeigt

---

## Troubleshooting Quick Reference

### Häufige Störungsbehandlungen

| Aktion | Verwendung |
|--------|------------|
| Transport erneut senden + Standard | Nach Behebung physikalischer Störungen |
| LHM extern buchen | LHM physikalisch entfernt oder Fach nur datentechnisch belegt |
| Transport abschließen | LHM bereits am Ziel oder falsche Sensorik |
| Quit an Gerät senden | Kommunikationsprobleme |
| Lagerort sperren + neues Ziel | Ort physikalisch blockiert |
| LHM anfordern | Ausschleusung bei Konturenfehlern |

### Kontakte bei wiederholten Störungen

- **Jungheinrich Support**: Bei Protokollfehlern und technischen Problemen
- **IT-Abteilung**: Bei Netzwerkproblemen
- **Jungheinrich Kundendienst**: Bei speziellen Geräteproblemen

### Wichtige Prüfungen

1. **Physikalische Kontrolle**: Immer prüfen ob LHM tatsächlich dort ist wo es sein sollte
2. **Sensorik-Justierung**: Häufigste Ursache für falsche Belegungsmeldungen
3. **Transportstatus**: Status im WMS mit physikalischer Situation abgleichen
4. **LHM-Abmessungen**: Bei Konturenfehlern prüfen und korrigieren

---

*Schulungsunterlage: Georg Fischer Störungsbehandlung*  
*Version 0.9 - Stand: 20.12.2024*  
*Erstellt aus stoerungsbehebung.txt*