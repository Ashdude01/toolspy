export type BrowserId = "chrome" | "edge" | "firefox" | "safari" | "opera";

export interface ExtensionReview {
  author: string;
  role?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // YYYY-MM-DD
  title: string;
  body: string;
}

export interface ExtensionFAQItem {
  question: string;
  answer: string;
}

export interface ExtensionDownloadLink {
  browser: BrowserId;
  label: string;
  href?: string; // if missing => “Coming soon”
}

export interface ExtensionLandingData {
  slug: string;
  name: string;
  shortDescription: string;
  posterImage?: string;
  primaryToolPath?: string;
  highlights: string[];
  features: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  howToInstall: { title: string; steps: string[] }[];
  howToUse: { title: string; steps: string[] }[];
  downloads: ExtensionDownloadLink[];
  reviews: ExtensionReview[];
  faqs: ExtensionFAQItem[];
}

const BASE_DOWNLOADS: ExtensionDownloadLink[] = [
  { browser: "chrome", label: "Chrome" },
  { browser: "edge", label: "Edge" },
  { browser: "firefox", label: "Firefox" },
  { browser: "safari", label: "Safari" },
  { browser: "opera", label: "Opera" },
];

export const extensions: ExtensionLandingData[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor Extension",
    shortDescription:
      "Detect images on the current page, select what you need, and compress with Toolspy-style presets and advanced options.",
    posterImage: "/logo/image_compressor_extn.png",
    primaryToolPath: "/image-compressor",
    highlights: [
      "Auto-detect images on the current page",
      "Select individually or in bulk",
      "Compression presets + quality slider + output format",
      "Optional resize, EXIF removal, and progressive JPEG",
    ],
    features: [
      {
        title: "Automatic image detection",
        description:
          "Scans the active page and lists detected images so you can pick exactly what to compress.",
      },
      {
        title: "Presets and quality controls",
        description:
          "Choose presets (Balanced, High Quality, Max Compression, Web Optimized) or fine-tune quality manually.",
      },
      {
        title: "Format + target size (optional)",
        description:
          "Keep the original format or convert output (JPEG/PNG/WebP). Optionally set a target file size in KB.",
      },
      {
        title: "Advanced options when needed",
        description:
          "Enable resize with aspect ratio lock, remove EXIF metadata, and turn on progressive JPEG loading.",
      },
    ],
    benefits: [
      {
        title: "Faster workflows",
        description:
          "Reduce repetitive “save → upload → compress” steps when you just need optimized assets quickly.",
      },
      {
        title: "Less manual effort",
        description:
          "Pick multiple images from the page at once instead of downloading each file manually.",
      },
      {
        title: "Consistent results",
        description:
          "Use the same presets/settings across projects for predictable output quality and size.",
      },
    ],
    howToInstall: [
      {
        title: "Install on Chrome / Edge / Opera",
        steps: [
          "Open the extension download page for your browser.",
          "Click “Add to browser”.",
          "Pin the extension to your toolbar for quicker access.",
        ],
      },
      {
        title: "Install on Firefox",
        steps: [
          "Open the Firefox Add-ons page.",
          "Click “Add to Firefox”.",
          "Confirm permissions when prompted.",
        ],
      },
      {
        title: "Install on Safari",
        steps: [
          "Open the Safari extension page (App Store if required).",
          "Install and enable the extension in Safari Settings → Extensions.",
        ],
      },
    ],
    howToUse: [
      {
        title: "Compress images from a page",
        steps: [
          "Open the web page that contains the images.",
          "Click the Toolspy extension icon.",
          "Select images (or use Select All / Clear).",
          "Choose a preset or fine-tune quality and output format.",
          "Optional: enable resize / EXIF removal / progressive JPEG.",
          "Compress and download the results.",
        ],
      },
    ],
    downloads: [
      { browser: "chrome", label: "Chrome", href: "/downloads/extensions/image-compressor/chrome.zip" },
      { browser: "edge", label: "Edge", href: "https://microsoftedge.microsoft.com/addons/detail/toolspy-image-compressor/jobmkodfjbikokkbifeddbnmdmbifcgp" },
      { browser: "firefox", label: "Firefox", href: "https://addons.mozilla.org/en-US/firefox/addon/toolspy-image-compressor" },
      { browser: "safari", label: "Safari", href: "/downloads/extensions/image-compressor/safari.zip" },
      { browser: "opera", label: "Opera", href: "https://addons.opera.com/en/extensions/details/toolspy-image-compressor/" },
    ],
    reviews: [
      {
        author: "Ankit S.",
        rating: 5,
        date: "2026-04-01",
        title: "Saves a lot of time",
        body:
          "Picking images directly from a page and compressing in one go is exactly what I needed for weekly content uploads.",
      },
      {
        author: "Priya K.",
        rating: 5,
        date: "2026-03-21",
        title: "Simple UI, good defaults",
        body:
          "No confusing options. I can still adjust quality when needed, but the default compression works for most cases.",
      },
      {
        author: "Rohit M.",
        rating: 4,
        date: "2026-02-28",
        title: "Batch ZIP is the best part",
        body:
          "The ZIP download makes it easy to handle dozens of images. Would love a few more preset profiles, but it’s solid.",
      },
      {
        author: "Sarah D.",
        rating: 5,
        date: "2026-02-10",
        title: "Great for quick optimization",
        body:
          "I use it when building landing pages-download, compress, and drop assets into the project in minutes.",
      },
      {
        author: "Vikram P.",
        rating: 4,
        date: "2026-01-30",
        title: "Works reliably",
        body:
          "Image detection is accurate on most sites I tried. The workflow is predictable and doesn’t feel bloated.",
      },
      {
        author: "Neha J.",
        rating: 5,
        date: "2026-01-14",
        title: "Presets are handy",
        body:
          "Balanced vs Max Compression makes it easy to choose quickly depending on whether I’m uploading to a CMS or sending on WhatsApp.",
      },
      {
        author: "Arjun L.",
        rating: 4,
        date: "2025-12-22",
        title: "Resize option helps",
        body:
          "I often need a fixed width for blog images. Resize with aspect ratio lock is a practical feature.",
      },
      {
        author: "Simran A.",
        rating: 5,
        date: "2025-12-05",
        title: "EXIF removal is useful",
        body:
          "I like that it can remove metadata. It’s a small detail but it matters for some client work.",
      },
      {
        author: "Kunal G.",
        rating: 4,
        date: "2025-11-19",
        title: "Good output control",
        body:
          "Quality slider plus format selection covers most needs. WebP output is great for modern sites.",
      },
      {
        author: "Pooja N.",
        rating: 5,
        date: "2025-11-02",
        title: "Quick export flow",
        body:
          "Selection + compress + download feels fast. I don’t have to bounce between tabs and tools.",
      },
    ],
    faqs: [
      {
        question: "How do I use an image compressor extension?",
        answer:
          "Install it from your browser's store, pin it to your toolbar, then either right-click an image to compress it or drag files straight into the extension's popup. Most tools finish the job in a few seconds with nothing else to set up.",
      },
      {
        question: "Is an image compressor extension safe?",
        answer:
          "Generally, yes, as long as it comes from a reputable source. Check whether it processes images locally or sends them to a server, glance at the permissions it's asking for, and stick to extensions listed on official browser stores with a clear privacy policy.",
      },
      {
        question: "Can you compress images without losing quality?",
        answer:
          "Yes. Lossless compression reduces file size with zero visible loss, and even moderate lossy compression is usually imperceptible to the eye, especially for anything headed to the web rather than a printer.",
      },
      {
        question: "What is the best free image compressor extension?",
        answer:
          "It depends a bit on your browser and how you work, but look for one with batch support, broad format compatibility, and no hidden daily cap. Toolspy checks those boxes without asking for a credit card.",
      },
      {
        question: "How do I compress multiple images at once?",
        answer:
          "Pick an extension with batch or bulk support, then select or drag in several files together. It applies your chosen settings to the whole group at once instead of making you repeat the process file by file.",
      },
      {
        question: "Why should I compress images before uploading?",
        answer:
          "Smaller files upload faster, load quicker for anyone viewing your site or email, use less storage, and are less likely to get rejected by platforms with strict size limits.",
      },
      {
        question: "Should I use an image compressor extension or an online tool?",
        answer:
          "An extension is quicker for regular use since it's already built into your browser. An online tool is fine for the occasional one-off, but you're manually visiting a site and uploading a file every single time, which adds up.",
      },
      {
        question: "How do I compress images to a specific file size?",
        answer:
          "Look for an extension that lets you enter a target size, like 20KB, directly. It handles the adjustment automatically instead of you guessing at compression percentages.",
      },
      {
        question: "Does an image compressor extension slow down my browser?",
        answer:
          "A well-built, lightweight one shouldn't. If you notice real lag after installing an extension, that's usually a sign it's poorly optimized rather than something inherent to compression itself.",
      },
      {
        question: "What image formats can I compress with an extension?",
        answer:
          "Most extensions handle JPEG, PNG, and WebP at minimum, and some cover GIF as well. It's worth checking the listing before assuming a specific format is supported.",
      },
      {
        question: "How should I compress images for my website?",
        answer:
          "Compress before uploading rather than after, lean on WebP where your platform supports it, and pick a moderate compression setting that balances file size against visual quality.",
      },
      {
        question: "Should I use a free or paid image compressor extension?",
        answer:
          "Free versions handle most everyday needs just fine, including basic batch compression. Paid tiers only really make sense if you need unlimited bulk processing, priority speed, or dedicated support at scale.",
      },
    ],
  },
  {
    slug: "facebook-photo-downloader",
    name: "Facebook Photo Downloader",
    shortDescription:
      "Scan the current page for images, select what you need, and download individually or as a ZIP. You can also open selected images in Toolspy to compress or convert.",
    posterImage: "/logo/facebook_photo_downloader.png",
    primaryToolPath: "/facebook-image-downloader",
    highlights: [
      "Scan page → select thumbnails → download",
      "Download selected or download ZIP",
      "Open selected images in Toolspy (compress/convert)",
      "Keyboard-friendly selection (Enter/Space)",
    ],
    features: [
      {
        title: "Scan and detect images",
        description:
          "Runs a page scan and lists detected images with thumbnails and basic dimensions when available.",
      },
      {
        title: "Selective downloads",
        description:
          "Select specific images and download only what you need-useful for posts with multiple photos.",
      },
      {
        title: "ZIP download",
        description:
          "Download a single ZIP when you’re saving multiple images.",
      },
      {
        title: "Toolspy handoff",
        description:
          "Open selected image URLs in Toolspy to compress or convert as the next step.",
      },
    ],
    benefits: [
      {
        title: "Faster saves from posts",
        description:
          "No need to open each image in a new tab-scan once and download what you want.",
      },
      {
        title: "Cleaner workflow",
        description:
          "Selection + ZIP download reduces repetitive clicks when you’re collecting multiple images.",
      },
      {
        title: "Easy next steps",
        description:
          "If the images need optimization, send them directly to Toolspy’s compressor or converter flow.",
      },
    ],
    howToInstall: [
      {
        title: "Install (Chrome / Edge / Opera)",
        steps: [
          "Download the ZIP for your browser.",
          "Open Extensions page in your browser.",
          "Enable developer mode, then load the unpacked folder (or the ZIP after extracting).",
          "Pin the extension to your toolbar for faster access.",
        ],
      },
      {
        title: "Install (Firefox)",
        steps: [
          "Download the Firefox ZIP.",
          "Open about:debugging → This Firefox.",
          "Load Temporary Add-on and select the manifest file (or follow your packaging workflow).",
        ],
      },
      {
        title: "Install (Safari)",
        steps: [
          "Download the Safari folder ZIP and extract it.",
          "Enable the extension using Safari’s extension development workflow.",
        ],
      },
    ],
    howToUse: [
      {
        title: "Download photos from a page",
        steps: [
          "Open the Facebook page/post you want to collect images from.",
          "Click the Toolspy extension icon.",
          "Click Scan page.",
          "Select images (All / Clear available).",
          "Download selected or download ZIP.",
          "Optional: open selected images in Toolspy to compress/convert.",
        ],
      },
    ],
    downloads: [
      { browser: "chrome", label: "Chrome", href: "/downloads/extensions/facebook-photo-downloader/chrome.zip" },
      { browser: "edge", label: "Edge", href: "https://microsoftedge.microsoft.com/addons/detail/facebook-photo-downloader/lakkbdacjloafgcbikclebmblpdephoi" },
      { browser: "firefox", label: "Firefox", href: "https://addons.mozilla.org/en-US/firefox/addon/facebook-photo-downloader/" },
      { browser: "safari", label: "Safari", href: "/downloads/extensions/facebook-photo-downloader/safari.zip" },
      { browser: "opera", label: "Opera", href: "/downloads/extensions/facebook-photo-downloader/opera.zip" },
    ],
    reviews: [
      {
        author: "Nisha R.",
        rating: 5,
        date: "2026-03-30",
        title: "Nice for multi-photo posts",
        body:
          "Scanning and selecting saves time versus opening each image. ZIP download makes it easy to keep everything together.",
      },
      {
        author: "Aman K.",
        rating: 4,
        date: "2026-03-12",
        title: "Simple workflow",
        body:
          "Scan → select → download. Works well for collecting images quickly.",
      },
      {
        author: "Meera S.",
        rating: 5,
        date: "2026-02-23",
        title: "ZIP option is useful",
        body:
          "When there are many photos, downloading as a ZIP is the best feature.",
      },
      {
        author: "Kevin P.",
        rating: 4,
        date: "2026-02-05",
        title: "Good handoff to Toolspy",
        body:
          "After download, opening in Toolspy compressor is a nice next step when I need smaller files.",
      },
      {
        author: "Harsh V.",
        rating: 5,
        date: "2026-01-18",
        title: "Selection UX feels solid",
        body:
          "The selection badge and keyboard toggle makes it faster than I expected.",
      },
      {
        author: "Sonal P.",
        rating: 4,
        date: "2026-01-04",
        title: "ZIP keeps it organized",
        body:
          "When I’m collecting photos for a reference folder, ZIP download keeps everything together and avoids missing files.",
      },
      {
        author: "Rajat M.",
        rating: 5,
        date: "2025-12-17",
        title: "Nice for quick saves",
        body:
          "Scan is quick and the thumbnails make selection easier than guessing file names from URLs.",
      },
      {
        author: "Ayesha K.",
        rating: 4,
        date: "2025-12-02",
        title: "Works in most cases",
        body:
          "On a few pages it detects fewer images, but on typical posts it does the job without extra steps.",
      },
      {
        author: "Deepak S.",
        rating: 5,
        date: "2025-11-10",
        title: "Toolspy handoff is great",
        body:
          "Downloading is step one, and opening in Toolspy compressor is step two. That flow makes sense.",
      },
      {
        author: "Ira J.",
        rating: 4,
        date: "2025-10-29",
        title: "Keyboard selection helps",
        body:
          "Enter/Space toggle is a good touch. I can select faster without chasing the small button every time.",
      },
    ],
    faqs: [
      {
        question: "Does this work only on Facebook?",
        answer:
          "It’s designed for Facebook photo workflows, but it scans the current page for images. Results depend on how the site loads images and restrictions.",
      },
      {
        question: "Where are images saved?",
        answer:
          "Downloads go to your browser’s default downloads folder unless you change it in browser settings.",
      },
      {
        question: "Can I download as ZIP?",
        answer: "Yes. Select multiple images and use the Download ZIP button.",
      },
      {
        question: "Can I compress images after downloading?",
        answer:
          "Yes. You can open selected image URLs in Toolspy to compress or convert as a next step.",
      },
    ],
  },
  {
    slug: "image-downloader",
    name: "Image Downloader",
    shortDescription:
      "Download images from any website. Scan the page, select thumbnails, download selected or as a ZIP, or open in Toolspy to compress/convert.",
    posterImage: "https://res.cloudinary.com/drby9raee/image/upload/v1777785656/toolspy-compressed-1_37_f6pibe.webp",
    primaryToolPath: "/image-compressor",
    highlights: [
      "Works on most sites (depends on restrictions)",
      "Selection UI with dimensions preview",
      "Download selected or download ZIP",
      "Theme toggle inside the popup",
    ],
    features: [
      {
        title: "Scan and select images",
        description:
          "Scans the current page and lists detected images with a fast select/deselect workflow.",
      },
      {
        title: "ZIP download",
        description:
          "Download multiple selected images in a single ZIP archive.",
      },
      {
        title: "Toolspy handoff",
        description:
          "Open selected URLs in Toolspy for compression or conversion when needed.",
      },
      {
        title: "Theme toggle",
        description:
          "Switch between light and dark theme inside the extension popup.",
      },
    ],
    benefits: [
      {
        title: "Quick asset collection",
        description:
          "Useful when you need to collect multiple images from a page without manual saving.",
      },
      {
        title: "Less repetitive work",
        description:
          "Scan once and download in bulk instead of opening each image separately.",
      },
      {
        title: "Optional optimization step",
        description:
          "If you want smaller files, open the same selections in Toolspy to compress/convert.",
      },
    ],
    howToInstall: [
      {
        title: "Install (Chrome/Edge/Opera)",
        steps: [
          "Open the extension download page.",
          "Click “Add to browser”.",
          "Pin the extension for quick picking.",
        ],
      },
      {
        title: "Install (Firefox)",
        steps: [
          "Open the Firefox Add-ons listing.",
          "Click “Add to Firefox”.",
          "Confirm permissions when prompted.",
        ],
      },
      {
        title: "Install (Safari)",
        steps: [
          "Install from the Safari extension page (App Store if needed).",
          "Enable in Safari Settings → Extensions.",
        ],
      },
    ],
    howToUse: [
      {
        title: "Download images from a page",
        steps: [
          "Open the page you want to scan.",
          "Click the Toolspy extension icon.",
          "Click Scan page.",
          "Select images (All / Clear available).",
          "Download selected or download ZIP.",
          "Optional: open selections in Toolspy to compress/convert.",
        ],
      },
    ],
    downloads: [
      { browser: "chrome", label: "Chrome", href: "/downloads/extensions/image-downloader/chrome.zip" },
      { browser: "edge", label: "Edge", href: "https://microsoftedge.microsoft.com/addons/detail/image-downloader/ibgopgamdpjbjijnbfijmbojckelgdpp" },
      { browser: "firefox", label: "Firefox", href: "https://addons.mozilla.org/en-US/firefox/addon/image-downloader-zip-convert/" },
      { browser: "safari", label: "Safari", href: "/downloads/extensions/image-downloader/safari.zip" },
      { browser: "opera", label: "Opera", href: "/downloads/extensions/image-downloader/opera.zip" },
    ],
    reviews: [
      {
        author: "Devansh T.",
        rating: 5,
        date: "2026-04-05",
        title: "Good for collecting assets",
        body:
          "Selection + ZIP download is exactly what I needed when grabbing multiple images from a page.",
      },
      {
        author: "Isha P.",
        rating: 4,
        date: "2026-03-15",
        title: "Useful workflow",
        body:
          "Scan, select, download. The UI is straightforward and it works on most sites I tested.",
      },
      {
        author: "Karan J.",
        rating: 5,
        date: "2026-02-26",
        title: "Theme toggle is nice",
        body:
          "I like the built-in theme toggle. The selection cards are fast and keyboard-friendly.",
      },
      {
        author: "Fatima A.",
        rating: 4,
        date: "2026-02-08",
        title: "ZIP download saves time",
        body:
          "Downloading as a ZIP is a huge time saver for image-heavy pages.",
      },
      {
        author: "Neel S.",
        rating: 5,
        date: "2026-01-22",
        title: "Nice Toolspy integration",
        body:
          "Opening selected images in Toolspy compressor after scan is convenient.",
      },
      {
        author: "Riya M.",
        rating: 4,
        date: "2026-01-09",
        title: "Great for image-heavy pages",
        body:
          "On shopping pages I can grab product images quickly. ZIP download is the feature I use the most.",
      },
      {
        author: "Tushar K.",
        rating: 5,
        date: "2025-12-20",
        title: "Selection is fast",
        body:
          "The card UI makes it easy to pick the right thumbnails. Dimensions preview helps avoid low-res images.",
      },
      {
        author: "Sneha P.",
        rating: 4,
        date: "2025-12-06",
        title: "Good for references",
        body:
          "I collect inspiration images while designing. This is faster than saving one by one.",
      },
      {
        author: "Aditya R.",
        rating: 4,
        date: "2025-11-23",
        title: "Works reliably",
        body:
          "It’s consistent on most sites. On protected pages results vary, but that’s expected with browser limits.",
      },
      {
        author: "Kavya S.",
        rating: 5,
        date: "2025-11-04",
        title: "Clean and practical",
        body:
          "No unnecessary stuff. Just scan, select, and download. Exactly what I wanted.",
      },
    ],
    faqs: [
      {
        question: "How do I download images with a Chrome extension?",
        answer:
          "Install the extension from the Chrome Web Store, pin it to your toolbar, then click it on any page to see all available images. Select the ones you want and download them individually or as a batch, whichever the situation calls for.",
      },
      {
        question: "What is the best image downloader extension?",
        answer:
          "The best option depends on your needs, but look for full-resolution downloads, real bulk support, and broad format compatibility. Toolspy covers all three without a paywall, which makes it a strong default choice for most people.",
      },
      {
        question: "Is there a completely free image downloader extension?",
        answer:
          "Yes — several extensions offer full functionality at no cost, without limiting you to a handful of downloads before asking for payment or an upgrade.",
      },
      {
        question: "How do I download multiple images at once?",
        answer:
          "Look for an extension with bulk or batch selection. Most let you check the images you want from a gallery view and download them all together, often as a single zipped file for convenience.",
      },
      {
        question: "Can I bulk download images from a website?",
        answer:
          "Yes, as long as the extension supports bulk or batch downloading. It will typically scan the entire page, list every image found, and let you select and save several at once instead of one by one.",
      },
      {
        question: "Is an image downloader extension safe to use?",
        answer:
          "Generally yes, provided it's from an official browser store and only requests permissions relevant to viewing and saving images. Avoid anything asking for broader access than that, and check reviews before installing.",
      },
      {
        question: "Which is the fastest image downloader extension?",
        answer:
          "Speed usually comes down to how efficiently an extension handles bulk selections rather than downloading one file at a time in sequence. Lightweight, well-optimized extensions noticeably outperform bloated ones on this front.",
      },
      {
        question: "How do I download full resolution or HD images?",
        answer:
          "Use an extension that pulls the original source file rather than a page thumbnail. Good tools will show you the actual image dimensions before you download, confirming you're getting the full-size version and not a compressed copy.",
      },
      {
        question: "Can I download images from Instagram with an extension?",
        answer:
          "Yes, with an extension built to handle Instagram's dynamic loading. It needs to detect new images as you scroll rather than only scanning what's visible when the page first loads.",
      },
      {
        question: "Can I download images from Pinterest with an extension?",
        answer:
          "Yes — a good extension will pull the full original image a pin links to, rather than the smaller preview shown in Pinterest's grid layout, which is usually much lower resolution.",
      },
      {
        question: "Does an image downloader extension slow down my browser?",
        answer:
          "A well-built, lightweight one shouldn't. If you do notice lag after installing one, that usually points to poor optimization rather than something inherent to the task itself.",
      },
      {
        question: "How do I use an image downloader extension easily?",
        answer:
          "Install it, pin it to your toolbar, and click it on any page with images you want. Most tools are designed to work with no configuration needed beyond that first click.",
      },
      {
        question: "What image formats does an image downloader support?",
        answer:
          "Most support JPG, PNG, and WebP at minimum, with some also handling GIF. Check the extension's store listing if you need a specific, less common format before relying on it.",
      },
      {
        question: "Image downloader extension vs. online tool — which is better?",
        answer:
          "An extension is generally faster for regular use since it works directly on the page you're viewing. An online tool is fine occasionally, but requires copying a link and switching tabs every single time.",
      },
      {
        question: "Can I download images from any website with an extension?",
        answer:
          "Most standard websites work fine. Some platforms with dynamic loading, like social media sites, need an extension specifically built to handle that behavior reliably.",
      },
    ],
  },
];

export function getExtensionBySlug(slug: string) {
  return extensions.find((e) => e.slug === slug);
}

