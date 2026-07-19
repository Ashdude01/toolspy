/**
 * German (de) content seed — BATCH 2: 9 aur Germany-relevant tools
 *
 * Chalane ka tarika:
 *   npx payload run scripts/seed-de-content-2.ts
 *
 * Kya karta hai:
 *  - Har tool ki tool-content entry me GERMAN locale ka content bharta hai
 *    (metaTitle, metaDescription, sections, faqs)
 *  - contentSource ko touch NAHI karta — website par koi change nahi hota
 *    jab tak aap admin me contentSource='cms' na karo
 *  - Dobara chalana safe hai (overwrite karta hai — manual German edits ke baad
 *    dobara mat chalana)
 *
 * German content dekhne ke liye (seed ke baad):
 *   Admin → Tool Content → image-compressor → contentSource: 'cms' → Save
 *   → http://localhost:3000/de/image-compressor/ par German content, coast-fire layout me
 */
import { getPayload } from 'payload'
import config from '@payload-config'

// ---- Lexical richText helpers (Payload ka editor format) ----
function text(t: string) {
  return { type: 'text', version: 1, text: t, detail: 0, format: 0, mode: 'normal', style: '' }
}
function paragraph(t: string) {
  return { type: 'paragraph', version: 1, children: [text(t)], direction: 'ltr' as const, format: '' as const, indent: 0 }
}
function body(...paras: string[]) {
  return {
    root: {
      type: 'root', version: 1, direction: 'ltr' as const, format: '' as const, indent: 0,
      children: paras.map(paragraph),
    },
  }
}

interface DeContent {
  metaTitle: string
  metaDescription: string
  sections: Array<{ anchorId: string; heading: string; body: ReturnType<typeof body> }>
  faqs: Array<{ question: string; answer: string }>
}

const DE_CONTENT: Record<string, DeContent> = {
  'compress-pdf': {
    metaTitle: "PDF komprimieren online – Kostenlos & ohne Upload | Toolspy",
    metaDescription: "PDF-Dateien in Sekunden verkleinern – direkt im Browser, ohne Anmeldung. Bis zu 80 % kleinere Dateien bei voller Lesbarkeit. DSGVO-freundlich: kein Upload.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Zu große PDF-Dateien sind ein alltägliches Problem: Bewerbungsportale begrenzen die Dateigröße, E-Mail-Anhänge werden abgelehnt und Cloud-Speicher füllt sich unnötig. Unser PDF-Komprimierer verkleinert Ihre Dokumente in Sekunden – direkt im Browser.", "Da die Verarbeitung vollständig lokal auf Ihrem Gerät stattfindet, bleiben vertrauliche Dokumente wie Verträge, Zeugnisse oder Rechnungen zu 100 % privat.") },
      { anchorId: "wie-funktioniert-es", heading: "Wie funktioniert die PDF-Komprimierung?", body: body("Das Tool analysiert Ihr PDF und optimiert die größten Speicherfresser: eingebettete Bilder werden neu kodiert, redundante Daten entfernt und die interne Struktur gestrafft.", "Über die Qualitätsstufen steuern Sie das Ergebnis: Die mittlere Stufe reduziert die Dateigröße meist um 50–80 %, während Texte gestochen scharf bleiben.") },
      { anchorId: "anleitung", heading: "So komprimieren Sie Ihr PDF", body: body("Schritt 1: PDF-Datei auswählen oder per Drag & Drop in das Tool ziehen.", "Schritt 2: Kompressionsstufe wählen – für Bewerbungen und E-Mails empfehlen wir die mittlere Stufe.", "Schritt 3: Auf „Komprimieren“ klicken und die verkleinerte Datei herunterladen. Vorher-Nachher-Größe wird direkt angezeigt.") },
      { anchorId: "anwendungsfaelle", heading: "Typische Anwendungsfälle", body: body("Bewerbungen: Viele Portale erlauben maximal 2–5 MB. Komprimieren Sie Ihre Unterlagen, ohne dass Zeugnis-Scans unleserlich werden.", "E-Mail-Versand: Bleiben Sie unter der üblichen 10-MB-Grenze, statt Dokumente aufzuteilen oder externe Links zu verschicken.", "Archivierung: Jahrzehnte an gescannten Unterlagen belegen schnell Gigabytes – komprimiert sparen Sie dauerhaft Speicherplatz.") },
    ],
    faqs: [
      { question: "Wird mein PDF auf einen Server hochgeladen?", answer: "Nein. Die Komprimierung läuft vollständig lokal in Ihrem Browser. Ihre Dokumente verlassen Ihr Gerät nicht – ideal für vertrauliche Unterlagen." },
      { question: "Bleibt der Text nach der Komprimierung lesbar?", answer: "Ja. Die Komprimierung optimiert vor allem eingebettete Bilder. Text bleibt als Vektor erhalten und ist in jeder Zoomstufe gestochen scharf." },
      { question: "Wie stark wird mein PDF verkleinert?", answer: "Je nach Inhalt sind 50–80 % üblich. PDFs mit vielen Fotos oder Scans lassen sich am stärksten verkleinern; reine Text-PDFs sind oft schon kompakt." },
      { question: "Gibt es Limits bei Dateigröße oder Anzahl?", answer: "Sie können beliebig viele PDFs komprimieren, einzelne Dateien bis 100 MB – ohne Anmeldung, ohne Wasserzeichen, komplett kostenlos." },
    ],
  },
  'pdf-to-word': {
    metaTitle: "PDF in Word umwandeln – Kostenlos online konvertieren | Toolspy",
    metaDescription: "PDF zu Word (DOCX) konvertieren und direkt weiterbearbeiten – kostenlos, ohne Anmeldung, ohne Upload. Layout und Formatierung bleiben bestmöglich erhalten.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Ein PDF lässt sich nicht ohne Weiteres bearbeiten – genau dafür gibt es dieses Tool. Es wandelt Ihre PDF-Datei in ein editierbares Word-Dokument (DOCX) um, das Sie in Microsoft Word, LibreOffice oder Google Docs weiterbearbeiten können.", "Die Konvertierung läuft direkt in Ihrem Browser – Ihre Dokumente werden nicht hochgeladen und bleiben vollständig privat.") },
      { anchorId: "anleitung", heading: "So wandeln Sie PDF in Word um", body: body("Schritt 1: PDF-Datei auswählen oder in das Upload-Feld ziehen.", "Schritt 2: Auf „Konvertieren“ klicken – das Tool extrahiert Texte, Absätze und Grundstruktur.", "Schritt 3: Die fertige DOCX-Datei herunterladen und in Ihrem Textprogramm öffnen.") },
      { anchorId: "was-bleibt-erhalten", heading: "Was bleibt bei der Konvertierung erhalten?", body: body("Fließtext, Absätze und die Lesereihenfolge werden zuverlässig übernommen. Auch Überschriften-Hierarchien bleiben in der Regel erhalten.", "Komplexe Layouts mit mehrspaltigen Designs, Tabellen oder eingebetteten Grafiken können je nach Ausgangs-PDF leichte Anpassungen im Word-Dokument erfordern. Bei gescannten PDFs empfehlen wir zusätzlich unser OCR-Tool.") },
      { anchorId: "anwendungsfaelle", heading: "Typische Anwendungsfälle", body: body("Verträge und Vorlagen: Eine PDF-Vorlage als Word-Datei weiterverwenden, statt alles neu abzutippen.", "Lebensläufe aktualisieren: Den alten PDF-Lebenslauf in Word umwandeln und mit wenigen Klicks auf den neuesten Stand bringen.", "Zitate und Recherchen: Textpassagen aus PDF-Berichten sauber in eigene Dokumente übernehmen.") },
    ],
    faqs: [
      { question: "Ist die Konvertierung wirklich kostenlos?", answer: "Ja, vollständig kostenlos – ohne Anmeldung, ohne Wasserzeichen und ohne Begrenzung der Anzahl an Konvertierungen." },
      { question: "Werden meine Dokumente hochgeladen?", answer: "Nein. Die Umwandlung findet lokal in Ihrem Browser statt. Vertrauliche Dokumente bleiben zu jeder Zeit auf Ihrem Gerät." },
      { question: "Funktioniert das auch mit gescannten PDFs?", answer: "Gescannte PDFs bestehen aus Bildern und enthalten keinen auswählbaren Text. Nutzen Sie dafür zuerst unser OCR-Tool (Bild-zu-Text), um den Text zu extrahieren." },
      { question: "Bleibt die Formatierung erhalten?", answer: "Fließtext, Absätze und Struktur werden zuverlässig übernommen. Sehr komplexe Layouts können im Word-Dokument kleine Nacharbeiten erfordern." },
    ],
  },
  'split-pdf': {
    metaTitle: "PDF teilen online – Seiten extrahieren & aufteilen | Toolspy",
    metaDescription: "PDF-Dateien kostenlos aufteilen: einzelne Seiten extrahieren oder Seitenbereiche als neue PDFs speichern. Ohne Upload, ohne Anmeldung – direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Oft braucht man nur bestimmte Seiten eines PDFs: eine einzelne Rechnung aus einem Sammeldokument, ein Kapitel aus einem Skript oder die Anlage eines Vertrags. Mit diesem Tool teilen Sie PDFs in Sekunden – ohne Software-Installation.", "Wie alle unsere PDF-Tools arbeitet auch dieses vollständig lokal im Browser: Ihre Dokumente werden nie hochgeladen.") },
      { anchorId: "anleitung", heading: "So teilen Sie ein PDF", body: body("Schritt 1: PDF auswählen oder per Drag & Drop hinzufügen – eine Seitenvorschau erscheint.", "Schritt 2: Wählen Sie die gewünschten Seiten oder Seitenbereiche aus (z. B. Seite 3–7).", "Schritt 3: Auf „Teilen“ klicken und die neuen PDF-Dateien einzeln oder als ZIP herunterladen.") },
      { anchorId: "modi", heading: "Flexible Aufteilungs-Optionen", body: body("Seiten extrahieren: Ausgewählte Seiten als ein neues PDF speichern – perfekt, um Anhänge oder Kapitel zu isolieren.", "In Einzelseiten zerlegen: Jede Seite wird ein eigenes PDF – nützlich für Rechnungen, Belege oder Zertifikate, die einzeln abgelegt werden sollen.", "Bereiche aufteilen: Ein langes Dokument in mehrere logische Teile zerlegen, etwa ein Skript in Kapitel.") },
      { anchorId: "anwendungsfaelle", heading: "Typische Anwendungsfälle", body: body("Buchhaltung: Aus einem Sammel-Scan einzelne Belege für den Steuerberater extrahieren.", "Behörden und Bewerbungen: Nur die geforderten Seiten einreichen, statt das komplette Dokument zu versenden.", "Studium: Aus umfangreichen Skripten genau die Kapitel ziehen, die für die Prüfung relevant sind.") },
    ],
    faqs: [
      { question: "Bleibt die Qualität der Seiten erhalten?", answer: "Ja. Die Seiten werden verlustfrei aus dem Original übernommen – Texte, Bilder und Formatierungen bleiben unverändert." },
      { question: "Kann ich mehrere Seitenbereiche gleichzeitig extrahieren?", answer: "Ja, Sie können mehrere Bereiche definieren und erhalten die Ergebnisse bequem als einzelne PDFs oder gebündelt als ZIP-Archiv." },
      { question: "Sind meine Dokumente sicher?", answer: "Ja. Das Aufteilen geschieht vollständig lokal in Ihrem Browser – ohne Upload, ohne Speicherung auf fremden Servern." },
      { question: "Gibt es ein Seitenlimit?", answer: "Nein, auch umfangreiche Dokumente mit hunderten Seiten lassen sich problemlos aufteilen. Einzelne Dateien können bis zu 100 MB groß sein." },
    ],
  },
  'image-converter': {
    metaTitle: "Bilder konvertieren – JPG, PNG, WebP umwandeln | Toolspy",
    metaDescription: "Bildformate kostenlos umwandeln: JPG zu PNG, PNG zu WebP, und mehr. Direkt im Browser, ohne Upload, ohne Anmeldung – in Sekunden fertig.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Jedes Bildformat hat seinen Zweck: JPG für Fotos, PNG für Transparenz, WebP für schnelle Webseiten. Mit unserem Konverter wandeln Sie Bilder in Sekunden ins passende Format um – kostenlos und ohne Installation.", "Die Konvertierung läuft vollständig in Ihrem Browser. Ihre Bilder werden nie hochgeladen – auch private Fotos bleiben privat.") },
      { anchorId: "formate", heading: "Welches Format wofür?", body: body("JPG: Der Standard für Fotos – kleine Dateien bei guter Qualität, aber ohne Transparenz.", "PNG: Verlustfrei und mit Transparenz – ideal für Logos, Screenshots und Grafiken mit Text.", "WebP: Das moderne Web-Format – bis zu 30 % kleiner als JPG bei gleicher Qualität. Erste Wahl für schnelle Webseiten und besseres Google-Ranking.") },
      { anchorId: "anleitung", heading: "So konvertieren Sie Ihre Bilder", body: body("Schritt 1: Bilder auswählen oder in das Tool ziehen – auch mehrere gleichzeitig.", "Schritt 2: Zielformat wählen (JPG, PNG oder WebP) und bei Bedarf die Qualität anpassen.", "Schritt 3: Konvertieren und die fertigen Bilder einzeln oder als ZIP herunterladen.") },
      { anchorId: "vorteile", heading: "Vorteile des Tools", body: body("Stapelverarbeitung: Dutzende Bilder in einem Durchgang konvertieren, statt jedes einzeln zu bearbeiten.", "Volle Kontrolle: Qualität und Format selbst bestimmen – mit sofortiger Vorschau der Dateigröße.", "Keine Grenzen: Unbegrenzt viele Konvertierungen, ohne Wasserzeichen, ohne Anmeldung, komplett kostenlos.") },
    ],
    faqs: [
      { question: "Welche Formate werden unterstützt?", answer: "Sie können zwischen JPG, PNG und WebP konvertieren. Für HEIC-Fotos vom iPhone gibt es zusätzlich unser spezialisiertes HEIC-Tool." },
      { question: "Verlieren meine Bilder an Qualität?", answer: "Bei PNG als Zielformat ist die Konvertierung verlustfrei. Bei JPG und WebP bestimmen Sie die Qualität selbst – bei 80–90 % ist ein Unterschied kaum sichtbar." },
      { question: "Kann ich mehrere Bilder gleichzeitig umwandeln?", answer: "Ja, das Tool unterstützt Stapelverarbeitung. Laden Sie einfach mehrere Bilder hoch und laden Sie alle Ergebnisse als ZIP herunter." },
      { question: "Werden meine Bilder gespeichert?", answer: "Nein. Die Konvertierung läuft lokal in Ihrem Browser – kein Upload, keine Speicherung, kein Zugriff durch Dritte." },
    ],
  },
  'image-resizer': {
    metaTitle: "Bildgröße ändern online – Bilder skalieren in Pixel & Prozent | Toolspy",
    metaDescription: "Bilder kostenlos auf exakte Maße bringen: Pixel, Prozent oder Vorlagen für Social Media. Ohne Qualitätsverlust, ohne Upload – direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Ob Bewerbungsfoto in Passbildgröße, Produktbild für den Onlineshop oder Header für Social Media – fast überall sind exakte Bildmaße gefragt. Mit diesem Tool ändern Sie die Größe Ihrer Bilder in Sekunden.", "Alles läuft lokal in Ihrem Browser: keine Uploads, keine Anmeldung, keine Wartezeiten.") },
      { anchorId: "anleitung", heading: "So ändern Sie die Bildgröße", body: body("Schritt 1: Bild auswählen oder per Drag & Drop hinzufügen.", "Schritt 2: Neue Maße eingeben – in Pixeln oder Prozent. Das Seitenverhältnis bleibt auf Wunsch automatisch erhalten, damit nichts verzerrt wird.", "Schritt 3: Herunterladen – fertig für Web, Druck oder Upload.") },
      { anchorId: "qualitaet", heading: "Größe ändern ohne Qualitätsverlust", body: body("Beim Verkleinern nutzt das Tool hochwertige Interpolation, damit Details und Kanten scharf bleiben – deutlich besser als einfaches Browser-Skalieren.", "Beim Vergrößern gilt: Moderat bleiben. Mehr als das Doppelte der Originalgröße führt physikalisch bedingt zu sichtbarer Unschärfe – dafür empfehlen wir unser KI-Upscaler-Tool.") },
      { anchorId: "anwendungsfaelle", heading: "Typische Anwendungsfälle", body: body("Social Media: Profilbilder, Posts und Header exakt in den geforderten Maßen – ohne abgeschnittene Ränder.", "Onlineshops und Marktplätze: Produktbilder in einheitlicher Größe für ein professionelles Erscheinungsbild.", "E-Mail und Web: Kleinere Maße bedeuten kleinere Dateien – schnellere Ladezeiten und problemloser Versand.") },
    ],
    faqs: [
      { question: "Wird das Seitenverhältnis beibehalten?", answer: "Ja, standardmäßig bleibt das Seitenverhältnis gesperrt, damit Ihr Bild nicht verzerrt wird. Sie können es bei Bedarf auch frei anpassen." },
      { question: "Verliert mein Bild beim Verkleinern an Qualität?", answer: "Nein, beim Verkleinern bleibt die Bildqualität durch hochwertige Interpolation praktisch vollständig erhalten." },
      { question: "Kann ich Bilder auch vergrößern?", answer: "Ja, moderates Vergrößern ist möglich. Für starke Vergrößerungen ohne Unschärfe empfehlen wir unseren KI-Bild-Upscaler." },
      { question: "Welche Formate werden unterstützt?", answer: "JPG, PNG und WebP werden vollständig unterstützt – inklusive Transparenz bei PNG-Dateien." },
    ],
  },
  'image-to-pdf': {
    metaTitle: "Bilder in PDF umwandeln – JPG zu PDF kostenlos | Toolspy",
    metaDescription: "Fotos und Bilder (JPG, PNG) in ein PDF umwandeln – mehrere Bilder zu einem Dokument, Reihenfolge frei wählbar. Ohne Upload, ohne Anmeldung, kostenlos.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Gescannte Dokumente als Fotos, Belege aus der Handykamera oder eine Bildserie für eine Präsentation – oft sollen mehrere Bilder in einem einzigen, ordentlichen PDF landen. Genau das macht dieses Tool.", "Ihre Bilder werden dabei lokal im Browser verarbeitet und nie hochgeladen – wichtig bei Ausweisen, Verträgen und privaten Fotos.") },
      { anchorId: "anleitung", heading: "So wandeln Sie Bilder in ein PDF um", body: body("Schritt 1: Bilder auswählen oder hineinziehen – JPG und PNG werden unterstützt, auch gemischt.", "Schritt 2: Reihenfolge per Drag & Drop festlegen und Seitenformat wählen (z. B. A4, Hochformat).", "Schritt 3: Auf „In PDF umwandeln“ klicken und das fertige Dokument herunterladen.") },
      { anchorId: "vorteile", heading: "Vorteile des Tools", body: body("Mehrere Bilder, ein Dokument: Alle Fotos landen sauber nacheinander in einem einzigen PDF – ideal zum Verschicken und Archivieren.", "Automatische Anpassung: Bilder werden proportional auf die Seite eingepasst, ohne Verzerrung oder abgeschnittene Ränder.", "Komplett kostenlos: Ohne Wasserzeichen, ohne Anmeldung, ohne Limits.") },
      { anchorId: "anwendungsfaelle", heading: "Typische Anwendungsfälle", body: body("Dokumente einreichen: Abfotografierte Unterlagen als ein professionelles PDF an Behörden, Vermieter oder Arbeitgeber senden.", "Belege sammeln: Quittungen und Rechnungen eines Monats in einem Dokument für die Buchhaltung bündeln.", "Portfolios: Fotos oder Designs als übersichtliche PDF-Mappe präsentieren.") },
    ],
    faqs: [
      { question: "Kann ich die Reihenfolge der Bilder ändern?", answer: "Ja, ordnen Sie die Bilder vor der Umwandlung einfach per Drag & Drop in der gewünschten Reihenfolge an." },
      { question: "Welche Bildformate werden unterstützt?", answer: "JPG und PNG werden vollständig unterstützt – Sie können beide Formate auch gemischt in einem PDF kombinieren." },
      { question: "Werden meine Bilder hochgeladen?", answer: "Nein, das PDF wird lokal in Ihrem Browser erstellt. Ihre Bilder verlassen Ihr Gerät zu keinem Zeitpunkt." },
      { question: "Kann ich das Seitenformat wählen?", answer: "Ja, Sie können unter anderem A4 im Hoch- oder Querformat wählen – die Bilder werden automatisch proportional eingepasst." },
    ],
  },
  'bmi-calculator': {
    metaTitle: "BMI-Rechner – Body-Mass-Index online berechnen | Toolspy",
    metaDescription: "BMI kostenlos berechnen: Gewicht und Größe eingeben, sofort Ergebnis mit Einordnung nach WHO-Kategorien. Für Erwachsene – schnell, anonym, ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Der Body-Mass-Index (BMI) ist die weltweit gebräuchlichste Kennzahl, um das Verhältnis von Körpergewicht zu Körpergröße einzuordnen. Unser Rechner ermittelt Ihren BMI in Sekunden – anonym und ohne Anmeldung.", "Geben Sie einfach Größe und Gewicht ein; das Ergebnis wird sofort berechnet und nach den offiziellen WHO-Kategorien eingeordnet.") },
      { anchorId: "berechnung", heading: "Wie wird der BMI berechnet?", body: body("Die Formel ist einfach: Körpergewicht in Kilogramm geteilt durch das Quadrat der Körpergröße in Metern (kg/m²).", "Beispiel: Bei 70 kg und 1,75 m ergibt sich ein BMI von 70 ÷ (1,75 × 1,75) = 22,9 – ein Wert im Normalbereich.", "Nach WHO gilt für Erwachsene: unter 18,5 = Untergewicht, 18,5–24,9 = Normalgewicht, 25–29,9 = Übergewicht, ab 30 = Adipositas.") },
      { anchorId: "grenzen", heading: "Was der BMI aussagt – und was nicht", body: body("Der BMI ist ein bewährter Richtwert für die Bevölkerung, unterscheidet aber nicht zwischen Muskel- und Fettmasse. Sportliche Menschen mit viel Muskulatur können einen erhöhten BMI haben, ohne übergewichtig zu sein.", "Auch Alter, Geschlecht und Körperbau spielen eine Rolle. Betrachten Sie den BMI daher als Orientierung, nicht als Diagnose – bei Fragen zur Gesundheit ist ärztlicher Rat der richtige Weg.") },
    ],
    faqs: [
      { question: "Welcher BMI ist normal?", answer: "Für Erwachsene gilt nach WHO ein BMI zwischen 18,5 und 24,9 als Normalgewicht. Werte darunter deuten auf Untergewicht, Werte ab 25 auf Übergewicht hin." },
      { question: "Gilt der BMI auch für Kinder und Jugendliche?", answer: "Nein, für Kinder und Jugendliche gelten alters- und geschlechtsspezifische Perzentilkurven. Dieser Rechner ist für Erwachsene ab 18 Jahren ausgelegt." },
      { question: "Werden meine Daten gespeichert?", answer: "Nein. Die Berechnung erfolgt komplett in Ihrem Browser – Größe und Gewicht werden weder übertragen noch gespeichert." },
      { question: "Ist der BMI für Sportler aussagekräftig?", answer: "Nur bedingt. Muskelmasse wiegt mehr als Fett, daher haben muskulöse Menschen oft einen erhöhten BMI bei niedrigem Körperfettanteil. Hier sind Körperfettmessungen aussagekräftiger." },
    ],
  },
  'percentage-calculator': {
    metaTitle: "Prozentrechner – Prozent online berechnen | Toolspy",
    metaDescription: "Prozente einfach berechnen: Prozentwert, Prozentsatz, Grundwert, Rabatte und prozentuale Veränderung. Kostenlos, mit Sofort-Ergebnis – ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Wie viel sind 19 % von 250 €? Wie viel Prozent Rabatt stecken im reduzierten Preis? Um wie viel Prozent ist die Miete gestiegen? Unser Prozentrechner beantwortet alle gängigen Prozentfragen mit einem Klick.", "Kein Formelbuch nötig: Werte eingeben, Ergebnis ablesen – inklusive verständlicher Rechenweg-Anzeige.") },
      { anchorId: "rechenarten", heading: "Was Sie berechnen können", body: body("Prozentwert: Wie viel sind X % von Y? – z. B. 19 % Mehrwertsteuer auf einen Nettopreis.", "Prozentsatz: Wie viel Prozent sind X von Y? – z. B. wie viel Prozent 45 richtige Antworten von 60 Fragen sind.", "Prozentuale Veränderung: Um wie viel Prozent ist ein Wert gestiegen oder gefallen? – z. B. Preiserhöhungen oder Gehaltssprünge.") },
      { anchorId: "beispiele", heading: "Praktische Beispiele aus dem Alltag", body: body("Rabatt beim Einkaufen: Ein Pullover kostet statt 80 € nur noch 56 € – das Tool zeigt sofort: 30 % Rabatt.", "Trinkgeld: 10 % auf eine Rechnung von 47,50 € sind 4,75 € – im Kopf umständlich, hier ein Klick.", "Mehrwertsteuer: Aus 100 € netto werden mit 19 % MwSt. 119 € brutto – oder umgekehrt aus dem Bruttopreis den Nettopreis ermitteln.") },
    ],
    faqs: [
      { question: "Wie berechne ich X Prozent von einem Betrag?", answer: "Betrag × Prozentsatz ÷ 100. Beispiel: 15 % von 200 € = 200 × 15 ÷ 100 = 30 €. Der Rechner erledigt das automatisch und zeigt den Rechenweg." },
      { question: "Wie berechne ich die prozentuale Veränderung?", answer: "(Neuer Wert − Alter Wert) ÷ Alter Wert × 100. Beispiel: Von 50 € auf 65 € ist eine Steigerung von 30 %." },
      { question: "Kann ich auch rückwärts rechnen (Grundwert)?", answer: "Ja. Wenn 25 % eines Wertes 50 € sind, ermittelt der Rechner den Grundwert: 200 €." },
      { question: "Ist der Rechner kostenlos?", answer: "Ja, vollständig kostenlos und ohne Anmeldung – beliebig oft nutzbar, auch mobil." },
    ],
  },
  'unit-converter': {
    metaTitle: "Einheiten umrechnen – Längen, Gewicht, Temperatur & mehr | Toolspy",
    metaDescription: "Einheiten kostenlos umrechnen: Kilometer/Meilen, Kilogramm/Pfund, Celsius/Fahrenheit, Liter/Gallonen und mehr. Sofort-Ergebnis, ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Meilen in Kilometer, Fahrenheit in Celsius, Unzen in Gramm – spätestens bei Reisen, Rezepten oder Onlinekäufen aus dem Ausland braucht jeder einen zuverlässigen Einheitenumrechner.", "Unser Tool rechnet die wichtigsten Größen in Echtzeit um: Länge, Gewicht, Temperatur, Fläche, Volumen und mehr – während Sie tippen.") },
      { anchorId: "kategorien", heading: "Verfügbare Kategorien", body: body("Länge: Kilometer, Meter, Meilen, Fuß, Zoll – z. B. für Reiseentfernungen oder Möbelmaße aus US-Shops.", "Gewicht: Kilogramm, Gramm, Pfund (lbs), Unzen – unverzichtbar für internationale Rezepte und Paketgewichte.", "Temperatur: Celsius, Fahrenheit, Kelvin – nie wieder rätseln, wie warm 75 °F wirklich sind (23,9 °C).") },
      { anchorId: "anleitung", heading: "So funktioniert die Umrechnung", body: body("Schritt 1: Kategorie wählen – etwa Länge, Gewicht oder Temperatur.", "Schritt 2: Ausgangs- und Zieleinheit festlegen.", "Schritt 3: Wert eingeben – das Ergebnis erscheint sofort, ohne Klick, mit präzisen Nachkommastellen.") },
    ],
    faqs: [
      { question: "Wie genau sind die Umrechnungen?", answer: "Die Umrechnungen basieren auf den international definierten Umrechnungsfaktoren und sind auf mehrere Nachkommastellen genau." },
      { question: "Funktioniert der Umrechner auch offline?", answer: "Nach dem ersten Laden der Seite rechnet das Tool lokal in Ihrem Browser – eine dauerhafte Internetverbindung ist nicht nötig." },
      { question: "Welche Einheiten sind verfügbar?", answer: "Alle gängigen metrischen und imperialen Einheiten für Länge, Gewicht, Temperatur, Fläche und Volumen – von Millimetern bis Meilen, von Gramm bis Gallonen." },
      { question: "Ist das Tool kostenlos?", answer: "Ja, komplett kostenlos, ohne Anmeldung und ohne Werbe-Unterbrechungen im Rechenablauf." },
    ],
  },
}

async function seed() {
  const payload = await getPayload({ config })

  for (const [slug, content] of Object.entries(DE_CONTENT)) {
    const existing = await payload.find({
      collection: 'tool-content',
      where: { toolSlug: { equals: slug } },
      limit: 1,
      draft: true,
    })

    let id: string | number
    if (existing.docs.length > 0) {
      id = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'tool-content',
        locale: 'en' as never,
        data: { toolSlug: slug, contentSource: 'code', _status: 'published' } as never,
      })
      id = created.id
      console.log(`created shell (en): ${slug}`)
    }

    await payload.update({
      collection: 'tool-content',
      id,
      locale: 'de' as never,
      data: {
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        sections: content.sections,
        faqs: content.faqs,
      } as never,
    })
    console.log(`German content seeded: ${slug} (${content.sections.length} sections, ${content.faqs.length} FAQs)`)
  }

  console.log('\nBatch 2 done! 9 tools. Website par abhi koi change nahi (contentSource "code").')
  console.log('Live karne ke liye: Admin -> Tool Content -> <tool> -> contentSource: "cms" -> Save')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
