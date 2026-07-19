/**
 * German (de) content seed — BATCH 3: 9 aur tools
 *
 * Chalane ka tarika:
 *   npx payload run scripts/seed-de-content-3.ts
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
  'heic-to-pdf': {
    metaTitle: "HEIC in PDF umwandeln – iPhone-Fotos konvertieren | Toolspy",
    metaDescription: "HEIC-Fotos vom iPhone kostenlos in PDF umwandeln – einzeln oder mehrere zu einem Dokument. Ohne Upload, ohne Anmeldung, direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("iPhones speichern Fotos standardmäßig im HEIC-Format – platzsparend, aber auf Windows-PCs und in vielen Programmen nicht ohne Weiteres nutzbar. Dieses Tool wandelt Ihre HEIC-Fotos direkt in ein universell lesbares PDF um.", "Die Konvertierung läuft komplett lokal in Ihrem Browser – Ihre privaten Fotos werden nie hochgeladen.") },
      { anchorId: "anleitung", heading: "So wandeln Sie HEIC in PDF um", body: body("Schritt 1: HEIC-Dateien auswählen oder per Drag & Drop hinzufügen – auch mehrere gleichzeitig.", "Schritt 2: Reihenfolge festlegen, falls mehrere Fotos in ein Dokument sollen.", "Schritt 3: Konvertieren und das fertige PDF herunterladen – bereit zum Teilen und Drucken.") },
      { anchorId: "warum-pdf", heading: "Warum HEIC in PDF umwandeln?", body: body("Universelle Kompatibilität: PDFs öffnen sich auf jedem Gerät – Windows, Android, Mac – ohne Zusatzsoftware, während HEIC oft Probleme macht.", "Dokumente aus Fotos: Abfotografierte Belege, Verträge oder Notizen werden als PDF zu ordentlichen, teilbaren Dokumenten.", "Mehrere Fotos, eine Datei: Statt zehn einzelner Bilder verschicken Sie ein sauber sortiertes PDF.") },
    ],
    faqs: [
      { question: "Was ist das HEIC-Format überhaupt?", answer: "HEIC (High Efficiency Image Container) ist Apples modernes Fotoformat. Es spart etwa die Hälfte des Speicherplatzes gegenüber JPG, wird aber außerhalb der Apple-Welt nicht überall unterstützt." },
      { question: "Werden meine Fotos hochgeladen?", answer: "Nein, die Umwandlung passiert vollständig lokal in Ihrem Browser. Ihre Fotos verlassen Ihr Gerät nicht." },
      { question: "Kann ich mehrere HEIC-Fotos in ein PDF packen?", answer: "Ja, laden Sie einfach mehrere Dateien hoch, legen Sie die Reihenfolge fest und erhalten Sie ein einziges PDF mit allen Fotos." },
      { question: "Verlieren die Fotos an Qualität?", answer: "Die Fotos werden in hoher Qualität in das PDF eingebettet – für Ansicht, Versand und Druck praktisch ohne sichtbaren Unterschied." },
    ],
  },
  'jfif-to-jpg': {
    metaTitle: "JFIF in JPG umwandeln – Kostenlos online konvertieren | Toolspy",
    metaDescription: "JFIF-Dateien kostenlos in JPG umwandeln – damit Bilder überall funktionieren. Stapelverarbeitung, ohne Upload, ohne Anmeldung, direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Windows speichert aus dem Internet kopierte Bilder manchmal mit der Endung .jfif – und plötzlich akzeptiert das Bewerbungsportal, der Onlineshop oder das CMS die Datei nicht mehr. Die Lösung: einmal kurz in JPG umwandeln.", "Unser Tool erledigt das in Sekunden, lokal in Ihrem Browser, ohne dass Ihre Bilder irgendwo hochgeladen werden.") },
      { anchorId: "was-ist-jfif", heading: "Was ist eine JFIF-Datei?", body: body("JFIF (JPEG File Interchange Format) ist technisch gesehen ein ganz normales JPEG-Bild – nur mit anderer Dateiendung. Genau deshalb lehnen viele Systeme die Datei ab, obwohl der Inhalt identisch ist.", "Die Umwandlung in .jpg ist daher verlustfrei möglich: Das Tool korrigiert Format und Endung, ohne das Bild neu zu komprimieren.") },
      { anchorId: "anleitung", heading: "So wandeln Sie JFIF in JPG um", body: body("Schritt 1: JFIF-Dateien auswählen oder hineinziehen – auch dutzende auf einmal.", "Schritt 2: Auf „Konvertieren“ klicken – die Umwandlung dauert nur einen Augenblick.", "Schritt 3: Die fertigen JPG-Dateien einzeln oder als ZIP herunterladen.") },
    ],
    faqs: [
      { question: "Verliert mein Bild bei der Umwandlung an Qualität?", answer: "Nein. JFIF ist technisch bereits ein JPEG – die Umwandlung ist praktisch verlustfrei und ändert primär das Containerformat und die Dateiendung." },
      { question: "Warum speichert Windows Bilder als JFIF?", answer: "Ältere Windows-Versionen nutzen für aus Browsern kopierte JPEG-Bilder die Zuordnung .jfif. Das Bild selbst ist normal – nur die Endung ist unüblich." },
      { question: "Kann ich mehrere Dateien gleichzeitig umwandeln?", answer: "Ja, das Tool unterstützt Stapelverarbeitung – laden Sie beliebig viele JFIF-Dateien hoch und laden Sie alle JPGs gebündelt herunter." },
      { question: "Werden meine Bilder hochgeladen?", answer: "Nein, die Konvertierung läuft vollständig lokal in Ihrem Browser – ohne Upload, ohne Speicherung." },
    ],
  },
  'ocr-text-extractor': {
    metaTitle: "OCR online – Text aus Bildern & Scans extrahieren | Toolspy",
    metaDescription: "Text aus Fotos, Screenshots und gescannten Dokumenten extrahieren – kostenlose OCR-Texterkennung im Browser. Ohne Upload, ohne Anmeldung, auch für Deutsch.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Ein abfotografiertes Dokument, ein Screenshot mit wichtigen Daten oder ein alter Scan – der Text ist sichtbar, aber nicht kopierbar. Unsere OCR-Texterkennung (Optical Character Recognition) macht daraus in Sekunden editierbaren Text.", "Die Erkennung läuft direkt in Ihrem Browser – sensible Dokumente wie Verträge oder Ausweise werden nie hochgeladen.") },
      { anchorId: "anleitung", heading: "So extrahieren Sie Text aus einem Bild", body: body("Schritt 1: Bild oder Scan auswählen – JPG, PNG und weitere Formate werden unterstützt.", "Schritt 2: Sprache des Textes wählen (z. B. Deutsch) – das verbessert die Erkennungsgenauigkeit deutlich.", "Schritt 3: Auf „Text extrahieren“ klicken, Ergebnis prüfen und mit einem Klick kopieren oder herunterladen.") },
      { anchorId: "tipps", heading: "Tipps für beste Erkennungsqualität", body: body("Gerade und scharf fotografieren: Je klarer die Vorlage, desto genauer die Erkennung. Vermeiden Sie Schatten und schräge Winkel.", "Hoher Kontrast: Dunkler Text auf hellem Hintergrund funktioniert am besten.", "Richtige Sprache wählen: Umlaute und ß werden nur mit deutscher Spracheinstellung zuverlässig erkannt.") },
    ],
    faqs: [
      { question: "Erkennt das Tool auch deutsche Umlaute?", answer: "Ja, wählen Sie einfach Deutsch als Erkennungssprache – dann werden ä, ö, ü und ß zuverlässig erkannt." },
      { question: "Werden meine Dokumente hochgeladen?", answer: "Nein, die Texterkennung läuft vollständig lokal in Ihrem Browser. Vertrauliche Dokumente bleiben auf Ihrem Gerät." },
      { question: "Funktioniert OCR auch mit Handschrift?", answer: "Gedruckter Text wird sehr zuverlässig erkannt. Saubere Druckbuchstaben funktionieren teilweise, Schreibschrift ist derzeit nicht zuverlässig erkennbar." },
      { question: "Welche Bildformate werden unterstützt?", answer: "Alle gängigen Formate wie JPG, PNG und WebP. Für mehrseitige gescannte PDFs nutzen Sie am besten zuerst unser PDF-zu-Bild-Tool." },
    ],
  },
  'favicon-generator': {
    metaTitle: "Favicon erstellen – Generator für alle Größen | Toolspy",
    metaDescription: "Favicon kostenlos aus Bild oder Logo generieren: alle Größen (16x16 bis 512x512), ICO & PNG, inklusive HTML-Code. Ohne Upload, ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Das Favicon ist das kleine Symbol im Browser-Tab – ein Detail, das über Professionalität entscheidet. Websites ohne Favicon wirken unfertig, und auch Google zeigt Favicons in den Suchergebnissen an.", "Mit diesem Generator erstellen Sie aus Ihrem Logo in Sekunden ein komplettes Favicon-Paket in allen benötigten Größen – kostenlos und ohne Designkenntnisse.") },
      { anchorId: "anleitung", heading: "So erstellen Sie Ihr Favicon", body: body("Schritt 1: Logo oder Bild hochladen – am besten quadratisch und mindestens 512 × 512 Pixel.", "Schritt 2: Vorschau prüfen – so sieht Ihr Favicon im Browser-Tab, auf dem Smartphone und in Lesezeichen aus.", "Schritt 3: Das komplette Paket herunterladen: ICO- und PNG-Dateien in allen Größen plus fertigen HTML-Code zum Einbinden.") },
      { anchorId: "groessen", heading: "Welche Größen brauchen Sie?", body: body("16 × 16 und 32 × 32: Die Klassiker für Browser-Tabs und Lesezeichen.", "180 × 180: Apple Touch Icon – erscheint, wenn Nutzer Ihre Seite auf dem iPhone-Homescreen ablegen.", "192 × 192 und 512 × 512: Für Android und Progressive Web Apps – der Generator erstellt alle automatisch mit.") },
    ],
    faqs: [
      { question: "Welches Format sollte mein Ausgangsbild haben?", answer: "Ideal ist ein quadratisches PNG mit mindestens 512 × 512 Pixeln und klaren, einfachen Formen – Details gehen bei 16 × 16 Pixeln verloren." },
      { question: "Bekomme ich auch den HTML-Code?", answer: "Ja, der Generator liefert die fertigen Link-Tags zum Kopieren – einfach in den Head-Bereich Ihrer Website einfügen." },
      { question: "Brauche ich noch eine .ico-Datei?", answer: "Ja, favicon.ico im Website-Root ist weiterhin der zuverlässigste Fallback für ältere Browser – das Paket enthält sie automatisch." },
      { question: "Ist der Generator wirklich kostenlos?", answer: "Ja, komplett kostenlos, ohne Wasserzeichen und ohne Anmeldung – alle Dateien gehören Ihnen." },
    ],
  },
  'color-picker': {
    metaTitle: "Color Picker – Farben auswählen, HEX, RGB & HSL | Toolspy",
    metaDescription: "Farben präzise auswählen und in alle Formate umwandeln: HEX, RGB, HSL. Mit Live-Vorschau – kostenlos, direkt im Browser, ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Ob Website-Design, Präsentation oder Branding – die richtige Farbe macht den Unterschied. Unser Color Picker hilft Ihnen, Farben präzise auszuwählen und sofort in allen gängigen Formaten zu verwenden.", "HEX für CSS, RGB für Design-Tools, HSL für feine Anpassungen – alle Werte werden live angezeigt und lassen sich mit einem Klick kopieren.") },
      { anchorId: "formate", heading: "HEX, RGB und HSL erklärt", body: body("HEX (#3b82f6): Der Standard im Web – sechs Zeichen definieren die Farbe eindeutig, perfekt für CSS und HTML.", "RGB (59, 130, 246): Rot-, Grün- und Blau-Anteile von 0 bis 255 – das Format der meisten Design-Programme.", "HSL (217°, 91 %, 60 %): Farbton, Sättigung und Helligkeit – ideal, um hellere oder dunklere Abstufungen derselben Farbe zu erstellen.") },
      { anchorId: "anleitung", heading: "So nutzen Sie den Color Picker", body: body("Schritt 1: Farbe im Farbfeld auswählen oder einen bekannten Wert (z. B. HEX-Code) eingeben.", "Schritt 2: Die Werte in allen Formaten ablesen – sie aktualisieren sich live.", "Schritt 3: Gewünschtes Format mit einem Klick kopieren und direkt in CSS, Figma oder PowerPoint einfügen.") },
    ],
    faqs: [
      { question: "Wie wandle ich HEX in RGB um?", answer: "Einfach den HEX-Code eingeben – der RGB-Wert (und HSL) wird sofort angezeigt. Die Umrechnung erfolgt automatisch in beide Richtungen." },
      { question: "Kann ich Farben aus einem Bild auswählen?", answer: "Ja, mit unserem Farbpaletten-Generator können Sie Farben direkt aus hochgeladenen Bildern extrahieren – ideal für Markenfarben aus einem Logo." },
      { question: "Was ist der Unterschied zwischen HSL und RGB?", answer: "RGB mischt Rot, Grün und Blau. HSL beschreibt Farbton, Sättigung und Helligkeit – intuitiver, wenn Sie dieselbe Farbe heller oder gedeckter brauchen." },
      { question: "Ist das Tool kostenlos?", answer: "Ja, vollständig kostenlos und ohne Anmeldung – beliebig oft nutzbar." },
    ],
  },
  'json-formatter': {
    metaTitle: "JSON Formatter – JSON formatieren & validieren | Toolspy",
    metaDescription: "JSON online formatieren, validieren und minifizieren – mit Fehleranzeige und Syntax-Highlighting. Kostenlos, ohne Upload, direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Unformatiertes JSON aus einer API-Antwort oder Logdatei ist kaum lesbar – eine einzige Zeile mit tausenden Zeichen. Unser JSON Formatter macht daraus in Sekunden sauber eingerücktes, lesbares JSON.", "Gleichzeitig validiert das Tool die Syntax und zeigt Fehler mit genauer Position an – Ihre Daten bleiben dabei lokal im Browser.") },
      { anchorId: "funktionen", heading: "Formatieren, validieren, minifizieren", body: body("Formatieren (Pretty Print): Einrückungen und Zeilenumbrüche machen die Struktur sofort erkennbar – verschachtelte Objekte und Arrays inklusive.", "Validieren: Fehlende Kommas, falsche Anführungszeichen oder unbalancierte Klammern werden mit Zeilenangabe gemeldet.", "Minifizieren: Für den Produktiveinsatz entfernt das Tool alle Leerzeichen und macht Ihr JSON so kompakt wie möglich.") },
      { anchorId: "anleitung", heading: "So formatieren Sie JSON", body: body("Schritt 1: JSON in das Eingabefeld einfügen oder eine Datei laden.", "Schritt 2: „Formatieren“ oder „Minifizieren“ wählen – das Ergebnis erscheint sofort mit Syntax-Highlighting.", "Schritt 3: Ergebnis kopieren oder als Datei herunterladen.") },
    ],
    faqs: [
      { question: "Werden meine JSON-Daten hochgeladen?", answer: "Nein, alles läuft lokal in Ihrem Browser – auch vertrauliche API-Antworten oder Konfigurationsdaten bleiben privat." },
      { question: "Zeigt das Tool Syntaxfehler an?", answer: "Ja, bei ungültigem JSON erhalten Sie eine Fehlermeldung mit der genauen Position – so finden Sie fehlende Kommas oder Klammern sofort." },
      { question: "Was bedeutet Minifizieren?", answer: "Dabei werden alle unnötigen Leerzeichen und Zeilenumbrüche entfernt. Das Ergebnis ist funktional identisch, aber deutlich kleiner – ideal für die Produktion." },
      { question: "Gibt es eine Größenbeschränkung?", answer: "Auch große JSON-Dateien mit tausenden Zeilen werden flüssig verarbeitet, da die Verarbeitung direkt auf Ihrem Gerät stattfindet." },
    ],
  },
  'base64-encoder-decoder': {
    metaTitle: "Base64 kodieren & dekodieren – Online-Tool | Toolspy",
    metaDescription: "Text in Base64 kodieren oder Base64 zurück in Text dekodieren – kostenlos, ohne Upload, mit UTF-8-Unterstützung. Direkt im Browser.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Base64 begegnet Entwicklern überall: in API-Tokens, E-Mail-Anhängen, Data-URLs und Konfigurationsdateien. Dieses Tool kodiert und dekodiert Base64 in Echtzeit – ohne Installation, direkt im Browser.", "Auch Sonderzeichen und Umlaute werden dank UTF-8-Unterstützung korrekt verarbeitet – ein häufiges Problem einfacher Base64-Tools.") },
      { anchorId: "was-ist-base64", heading: "Was ist Base64?", body: body("Base64 ist ein Verfahren, um beliebige Binärdaten als reinen Text darzustellen – mit nur 64 sicheren Zeichen. So lassen sich Bilder, Dateien oder Sonderzeichen problemlos in Textformaten wie JSON oder HTML transportieren.", "Wichtig: Base64 ist eine Kodierung, keine Verschlüsselung – die Daten sind für jeden dekodierbar und daher nicht geschützt.") },
      { anchorId: "anleitung", heading: "So kodieren und dekodieren Sie", body: body("Kodieren: Text in das Eingabefeld einfügen – der Base64-String erscheint sofort und lässt sich mit einem Klick kopieren.", "Dekodieren: Base64-String einfügen – das Tool zeigt den ursprünglichen Text an, inklusive korrekter Umlaute.", "Beide Richtungen funktionieren in Echtzeit, während Sie tippen.") },
    ],
    faqs: [
      { question: "Ist Base64 eine Verschlüsselung?", answer: "Nein. Base64 ist nur eine Kodierung zur Darstellung von Daten als Text – jeder kann sie dekodieren. Für vertrauliche Daten brauchen Sie echte Verschlüsselung." },
      { question: "Werden Umlaute korrekt verarbeitet?", answer: "Ja, das Tool nutzt UTF-8 – ä, ö, ü, ß und auch Emojis werden korrekt kodiert und dekodiert." },
      { question: "Warum ist Base64 länger als der Originaltext?", answer: "Base64 stellt je 3 Bytes als 4 Zeichen dar – die Ausgabe ist daher etwa 33 % größer als die Eingabe. Das ist normal und kein Fehler." },
      { question: "Bleiben meine Daten privat?", answer: "Ja, Kodierung und Dekodierung laufen vollständig lokal in Ihrem Browser – nichts wird übertragen oder gespeichert." },
    ],
  },
  'currency-converter': {
    metaTitle: "Währungsrechner – Euro, Dollar & 150+ Währungen | Toolspy",
    metaDescription: "Währungen mit aktuellen Wechselkursen umrechnen: EUR, USD, GBP, CHF und über 150 weitere. Kostenlos, ohne Anmeldung – mit aktualisierten Kursen.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Ob Urlaubsplanung, Online-Shopping im Ausland oder internationale Überweisung – aktuelle Wechselkurse braucht man ständig. Unser Währungsrechner rechnet über 150 Währungen mit tagesaktuellen Kursen um.", "Einfach Betrag eingeben, Währungen wählen – das Ergebnis erscheint sofort, inklusive des verwendeten Wechselkurses.") },
      { anchorId: "anleitung", heading: "So rechnen Sie Währungen um", body: body("Schritt 1: Ausgangswährung wählen (z. B. Euro) und Zielwährung (z. B. US-Dollar).", "Schritt 2: Betrag eingeben – die Umrechnung erscheint in Echtzeit.", "Schritt 3: Mit dem Tauschen-Button die Richtung wechseln, um schnell zurückzurechnen.") },
      { anchorId: "hinweise", heading: "Gut zu wissen", body: body("Tagesaktuelle Kurse: Die Wechselkurse werden regelmäßig aktualisiert und eignen sich hervorragend zur Orientierung.", "Bank-Aufschläge beachten: Banken und Kartenanbieter rechnen meist mit einem Aufschlag von 1–3 % auf den Mittelkurs – der tatsächliche Betrag kann daher leicht abweichen.", "Reise-Tipp: Im Ausland an Automaten immer in Landeswährung abrechnen lassen – die Vor-Ort-Umrechnung in Euro (DCC) ist fast immer teurer.") },
    ],
    faqs: [
      { question: "Wie aktuell sind die Wechselkurse?", answer: "Die Kurse werden regelmäßig von zuverlässigen Quellen aktualisiert und spiegeln den aktuellen Marktkurs wider – ideal zur Orientierung für Reisen und Einkäufe." },
      { question: "Warum weicht der Betrag bei meiner Bank ab?", answer: "Banken und Kreditkartenanbieter schlagen auf den Mittelkurs meist 1–3 % Gebühren auf. Der Rechner zeigt den Marktkurs ohne diese Aufschläge." },
      { question: "Welche Währungen werden unterstützt?", answer: "Über 150 Währungen – von Euro, US-Dollar und Schweizer Franken bis zu allen wichtigen Reise- und Handelswährungen weltweit." },
      { question: "Ist der Währungsrechner kostenlos?", answer: "Ja, vollständig kostenlos und ohne Anmeldung – beliebig oft nutzbar, auch mobil." },
    ],
  },
  'loan-calculator': {
    metaTitle: "Kreditrechner – Rate, Zinsen & Laufzeit berechnen | Toolspy",
    metaDescription: "Kredit durchrechnen: monatliche Rate, Gesamtkosten und Zinsanteil bei beliebiger Laufzeit. Kostenlos, anonym, mit sofortigem Ergebnis – ohne Anmeldung.",
    sections: [
      { anchorId: "einfuehrung", heading: "Einführung", body: body("Was kostet ein Kredit über 20.000 € wirklich – und wie verändert sich die Rate bei 48 statt 60 Monaten Laufzeit? Unser Kreditrechner beantwortet diese Fragen sofort, anonym und ohne Anmeldung.", "Geben Sie Kreditsumme, Zinssatz und Laufzeit ein – Sie sehen die monatliche Rate, die gesamten Zinskosten und die Gesamtrückzahlung auf einen Blick.") },
      { anchorId: "berechnung", heading: "Wie berechnet sich die Kreditrate?", body: body("Der Rechner nutzt die Annuitätenformel: eine konstante monatliche Rate, die aus einem Zins- und einem Tilgungsanteil besteht. Zu Beginn ist der Zinsanteil höher, mit jeder Rate wächst der Tilgungsanteil.", "Beispiel: 20.000 € über 60 Monate bei 6 % effektivem Jahreszins ergeben etwa 387 € Monatsrate und rund 3.200 € Zinskosten insgesamt.") },
      { anchorId: "tipps", heading: "Tipps vor der Kreditaufnahme", body: body("Effektiven Jahreszins vergleichen: Er enthält alle Kosten und ist die einzige verlässliche Vergleichszahl zwischen Angeboten – nicht der Sollzins.", "Laufzeit bewusst wählen: Längere Laufzeit heißt kleinere Rate, aber deutlich höhere Gesamtkosten. Rechnen Sie beide Varianten durch.", "Sondertilgungen prüfen: Verträge mit kostenlosen Sondertilgungen geben Flexibilität, den Kredit schneller und günstiger abzubezahlen.") },
    ],
    faqs: [
      { question: "Was ist der Unterschied zwischen Sollzins und effektivem Jahreszins?", answer: "Der Sollzins ist der reine Zins auf die Kreditsumme. Der effektive Jahreszins enthält zusätzlich alle Kosten und Gebühren – nur er eignet sich zum Vergleich von Angeboten." },
      { question: "Werden meine Eingaben gespeichert?", answer: "Nein, die Berechnung läuft anonym in Ihrem Browser – ohne Anmeldung, ohne Übertragung Ihrer finanziellen Daten." },
      { question: "Kann ich verschiedene Szenarien vergleichen?", answer: "Ja, ändern Sie einfach Laufzeit oder Zinssatz – das Ergebnis aktualisiert sich sofort. So finden Sie die Rate, die zu Ihrem Budget passt." },
      { question: "Ersetzt der Rechner eine Finanzberatung?", answer: "Nein, er dient der Orientierung. Die Ergebnisse sind mathematisch korrekt, ersetzen aber keine individuelle Beratung – Konditionen unterscheiden sich je nach Anbieter und Bonität." },
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

  console.log('\nBatch 3 done! 9 tools (total ab 21). Website par abhi koi change nahi (contentSource "code").')
  console.log('Live karne ke liye: Admin -> Tool Content -> <tool> -> contentSource: "cms" -> Save')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
