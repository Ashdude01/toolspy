/**
 * German (de) pilot content seed — 3 tools: image-compressor, merge-pdf, qr-code-generator
 *
 * Chalane ka tarika:
 *   npx payload run scripts/seed-de-content.ts
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
  'image-compressor': {
    metaTitle: 'Bilder komprimieren online – Kostenlos & ohne Qualitätsverlust | Toolspy',
    metaDescription:
      'Komprimieren Sie JPG, PNG und WebP direkt im Browser – kostenlos, ohne Anmeldung. Ihre Bilder werden lokal verarbeitet und nie hochgeladen. Bis zu 90 % kleinere Dateien.',
    sections: [
      {
        anchorId: 'einfuehrung',
        heading: 'Einführung',
        body: body(
          'Große Bilddateien verlangsamen Webseiten, verbrauchen Speicherplatz und machen den Versand per E-Mail oder Messenger mühsam. Mit unserem kostenlosen Bild-Komprimierer verkleinern Sie JPG-, PNG- und WebP-Dateien in Sekunden – direkt in Ihrem Browser.',
          'Das Besondere: Ihre Bilder verlassen Ihren Computer nie. Die gesamte Komprimierung läuft lokal im Browser ab – ideal für sensible Fotos, Ausweisdokumente oder Firmenunterlagen.'
        ),
      },
      {
        anchorId: 'wie-funktioniert-es',
        heading: 'Wie funktioniert die Bildkomprimierung?',
        body: body(
          'Die Komprimierung reduziert die Dateigröße, indem redundante Bilddaten intelligent zusammengefasst werden. Bei verlustbehafteter Komprimierung (JPG, WebP) werden Details entfernt, die das menschliche Auge kaum wahrnimmt. Bei verlustfreier Komprimierung (PNG) bleibt jedes Pixel erhalten.',
          'Unser Tool nutzt moderne Browser-APIs, um die optimale Balance zwischen Dateigröße und Bildqualität zu finden. Über den Qualitätsregler bestimmen Sie selbst, wie stark komprimiert wird – mit Live-Vorschau des Ergebnisses.'
        ),
      },
      {
        anchorId: 'anleitung',
        heading: 'So komprimieren Sie Ihre Bilder',
        body: body(
          'Schritt 1: Ziehen Sie Ihre Bilder in das Upload-Feld oder klicken Sie, um Dateien auszuwählen. Sie können mehrere Bilder gleichzeitig verarbeiten.',
          'Schritt 2: Stellen Sie die gewünschte Qualität mit dem Regler ein. Ein Wert zwischen 70 und 85 % bietet meist die beste Balance aus Größe und Qualität.',
          'Schritt 3: Klicken Sie auf „Komprimieren" und laden Sie die verkleinerten Bilder einzeln oder als ZIP-Archiv herunter.'
        ),
      },
      {
        anchorId: 'vorteile',
        heading: 'Vorteile unseres Komprimierers',
        body: body(
          '100 % Datenschutz: Alle Bilder werden lokal in Ihrem Browser verarbeitet – kein Upload auf fremde Server, keine Speicherung, keine Anmeldung.',
          'Bis zu 90 % kleinere Dateien: Perfekt für schnellere Webseiten (besseres Google-Ranking), E-Mail-Anhänge und Cloud-Speicher.',
          'Unbegrenzt und kostenlos: Komprimieren Sie so viele Bilder, wie Sie möchten – ohne Wasserzeichen, ohne Limits, ohne versteckte Kosten.'
        ),
      },
    ],
    faqs: [
      {
        question: 'Werden meine Bilder auf einen Server hochgeladen?',
        answer:
          'Nein. Die gesamte Komprimierung findet lokal in Ihrem Browser statt. Ihre Bilder verlassen Ihren Computer zu keinem Zeitpunkt – das garantiert maximalen Datenschutz.',
      },
      {
        question: 'Verliert mein Bild durch die Komprimierung an Qualität?',
        answer:
          'Bei einer Qualitätseinstellung von 70–85 % ist der Unterschied mit bloßem Auge kaum erkennbar, während die Dateigröße um 60–90 % sinkt. Sie sehen das Ergebnis in der Live-Vorschau, bevor Sie herunterladen.',
      },
      {
        question: 'Welche Bildformate werden unterstützt?',
        answer:
          'Das Tool unterstützt JPG/JPEG, PNG und WebP. Sie können das Ausgabeformat auch wechseln – zum Beispiel PNG zu WebP konvertieren, um noch kleinere Dateien zu erhalten.',
      },
      {
        question: 'Gibt es ein Limit für die Anzahl oder Größe der Bilder?',
        answer:
          'Sie können beliebig viele Bilder komprimieren. Einzelne Dateien können bis zu 100 MB groß sein – mehr als genug für Fotos in voller Auflösung.',
      },
    ],
  },

  'merge-pdf': {
    metaTitle: 'PDF zusammenfügen online – Kostenlos & sicher | Toolspy',
    metaDescription:
      'Mehrere PDF-Dateien in Sekunden zu einem Dokument zusammenfügen – kostenlos, ohne Anmeldung. Verarbeitung direkt im Browser, Ihre Dokumente werden nie hochgeladen.',
    sections: [
      {
        anchorId: 'einfuehrung',
        heading: 'Einführung',
        body: body(
          'Ob Bewerbungsunterlagen, Rechnungen, Verträge oder Scans – oft müssen mehrere PDF-Dateien zu einem einzigen Dokument zusammengefügt werden. Unser kostenloses Tool erledigt das in Sekunden, direkt in Ihrem Browser.',
          'Im Gegensatz zu vielen anderen Online-Diensten werden Ihre Dokumente dabei nie auf einen Server hochgeladen. Gerade bei Verträgen, Zeugnissen oder Finanzunterlagen ist das ein entscheidender Sicherheitsvorteil.'
        ),
      },
      {
        anchorId: 'anleitung',
        heading: 'So fügen Sie PDFs zusammen',
        body: body(
          'Schritt 1: Wählen Sie Ihre PDF-Dateien aus oder ziehen Sie sie per Drag & Drop in das Tool. Sie können beliebig viele Dokumente hinzufügen.',
          'Schritt 2: Ordnen Sie die Dateien per Drag & Drop in der gewünschten Reihenfolge an.',
          'Schritt 3: Klicken Sie auf „Zusammenfügen" und laden Sie das fertige PDF sofort herunter.'
        ),
      },
      {
        anchorId: 'vorteile',
        heading: 'Warum dieses Tool?',
        body: body(
          'Maximaler Datenschutz: Die Verarbeitung erfolgt vollständig lokal im Browser – DSGVO-freundlich, ohne Upload, ohne Speicherung.',
          'Keine Grenzen: Unbegrenzt viele Dokumente, keine Wasserzeichen, keine Registrierung, komplett kostenlos.',
          'Originalqualität: Seiten, Schriften, Links und Formatierungen bleiben beim Zusammenfügen zu 100 % erhalten.'
        ),
      },
      {
        anchorId: 'anwendungsfaelle',
        heading: 'Typische Anwendungsfälle',
        body: body(
          'Bewerbungen: Anschreiben, Lebenslauf und Zeugnisse zu einer einzigen professionellen PDF-Datei kombinieren – genau so, wie Personalabteilungen es erwarten.',
          'Buchhaltung: Monatliche Rechnungen und Belege zu einem Sammeldokument für den Steuerberater zusammenfassen.',
          'Studium und Schule: Skripte, Notizen und gescannte Unterlagen zu einem durchsuchbaren Gesamtdokument bündeln.'
        ),
      },
    ],
    faqs: [
      {
        question: 'Sind meine PDF-Dokumente sicher?',
        answer:
          'Ja. Das Zusammenfügen passiert vollständig in Ihrem Browser – Ihre Dokumente werden nie auf einen Server übertragen. Nach dem Schließen der Seite bleiben keine Daten zurück.',
      },
      {
        question: 'Kann ich die Reihenfolge der PDFs ändern?',
        answer:
          'Ja, ordnen Sie die hochgeladenen Dateien einfach per Drag & Drop in der gewünschten Reihenfolge an, bevor Sie sie zusammenfügen.',
      },
      {
        question: 'Gibt es ein Limit für Dateigröße oder Anzahl?',
        answer:
          'Sie können beliebig viele PDFs zusammenfügen, einzelne Dateien bis 100 MB. Auch umfangreiche Dokumente mit hunderten Seiten sind kein Problem.',
      },
      {
        question: 'Bleibt die Qualität der PDFs erhalten?',
        answer:
          'Ja, das Tool fügt die Originaldateien verlustfrei zusammen. Texte, Bilder, Links und Lesezeichen bleiben unverändert erhalten.',
      },
    ],
  },

  'qr-code-generator': {
    metaTitle: 'QR-Code erstellen – Kostenloser QR-Code-Generator | Toolspy',
    metaDescription:
      'Erstellen Sie kostenlos QR-Codes für URLs, WLAN, vCards und mehr – mit Logo, Farben und hoher Auflösung. Ohne Anmeldung, ohne Wasserzeichen, direkt im Browser.',
    sections: [
      {
        anchorId: 'einfuehrung',
        heading: 'Einführung',
        body: body(
          'QR-Codes verbinden die physische mit der digitalen Welt: auf Visitenkarten, Speisekarten, Plakaten, Verpackungen oder Rechnungen. Mit unserem kostenlosen Generator erstellen Sie professionelle QR-Codes in Sekunden.',
          'Alle Codes werden direkt in Ihrem Browser generiert – ohne Anmeldung, ohne Wasserzeichen und ohne Ablaufdatum. Einmal erstellt, funktioniert Ihr QR-Code für immer.'
        ),
      },
      {
        anchorId: 'was-kann-man-verlinken',
        heading: 'Was kann ein QR-Code enthalten?',
        body: body(
          'Webseiten-URLs: Der Klassiker – führen Sie Kunden direkt auf Ihre Website, Ihr Angebot oder Ihr Bewertungsprofil.',
          'WLAN-Zugang: Gäste scannen den Code und sind sofort im WLAN – ohne Passwort abtippen. Perfekt für Cafés, Praxen und Ferienwohnungen.',
          'Kontaktdaten (vCard): Ein Scan und Ihre kompletten Kontaktdaten landen im Adressbuch des Gegenübers – ideal für Visitenkarten und E-Mail-Signaturen.'
        ),
      },
      {
        anchorId: 'anleitung',
        heading: 'So erstellen Sie Ihren QR-Code',
        body: body(
          'Schritt 1: Wählen Sie den Typ (URL, Text, WLAN, vCard) und geben Sie Ihre Daten ein.',
          'Schritt 2: Passen Sie Farben und Größe an. Achten Sie auf ausreichenden Kontrast, damit der Code zuverlässig gescannt werden kann.',
          'Schritt 3: Laden Sie den fertigen Code als hochauflösendes PNG herunter – bereit für Druck und Web.'
        ),
      },
      {
        anchorId: 'tipps',
        heading: 'Tipps für den perfekten QR-Code',
        body: body(
          'Kontrast ist entscheidend: Dunkler Code auf hellem Hintergrund funktioniert am zuverlässigsten. Vermeiden Sie zu helle Farben.',
          'Testen Sie vor dem Druck: Scannen Sie den Code mit mehreren Geräten, bevor Sie ihn auf Flyer oder Plakate drucken.',
          'Mindestgröße beachten: Für Druckmaterialien sollte der Code mindestens 2 × 2 cm groß sein – je größer der Scan-Abstand, desto größer der Code.'
        ),
      },
    ],
    faqs: [
      {
        question: 'Sind die erstellten QR-Codes wirklich kostenlos?',
        answer:
          'Ja, vollständig kostenlos – ohne Wasserzeichen, ohne Anmeldung und ohne versteckte Kosten. Die Codes gehören Ihnen und funktionieren unbegrenzt.',
      },
      {
        question: 'Laufen die QR-Codes irgendwann ab?',
        answer:
          'Nein. Es sind statische QR-Codes, deren Daten direkt im Code gespeichert sind. Sie funktionieren für immer, solange das Ziel (z. B. Ihre Website) erreichbar ist.',
      },
      {
        question: 'In welcher Auflösung kann ich den QR-Code herunterladen?',
        answer:
          'Sie können den Code in hoher Auflösung als PNG herunterladen – scharf genug für Visitenkarten, Flyer, Plakate und andere Druckmaterialien.',
      },
      {
        question: 'Kann ich die Farben meines QR-Codes anpassen?',
        answer:
          'Ja, Vorder- und Hintergrundfarbe sind frei wählbar. Achten Sie auf ausreichenden Kontrast (dunkel auf hell), damit alle Smartphones den Code zuverlässig lesen können.',
      },
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

  console.log('\nDone! Website par abhi KOI change nahi hua (contentSource "code" hai).')
  console.log('German content live dekhne ke liye: Admin → Tool Content → <tool> → contentSource: "cms" → Save')
  console.log('→ phir kholo: http://localhost:3000/de/image-compressor/')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
