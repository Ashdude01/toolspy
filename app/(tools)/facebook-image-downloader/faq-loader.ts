import { registerToolFAQ } from "@/components/seo/faq-types";

const facebookImageDownloaderFAQs = [
  {
    question: "Is the Facebook image downloader free?",
    answer:
      "Yes. It's completely free to use. There's no signup, no software to install, and no watermarks on your downloads.",
  },
  {
    question: "Which Facebook links work?",
    answer:
      "You can use public post URLs, photo page links that contain an fbid, and direct image links ending in .jpg, .png, or .webp.",
  },
  {
    question: "Can I download photos from private posts?",
    answer:
      "No. If a post requires you to log in to see it, the images can't be pulled. The tool only works with content that's publicly visible.",
  },
  {
    question: "Can it download more than one photo at once?",
    answer:
      "Yes. When a post contains a gallery, every photo shows up separately, so you can grab them one at a time or all together.",
  },
  {
    question: "Do I need an account or an app?",
    answer:
      "No. Everything runs in your browser - there's nothing to download or sign up for.",
  },
  {
    question: "Is it safe to use?",
    answer:
      "Yes. Images are fetched directly in your browser. Please only download photos you have permission to use.",
  },
  {
    question: "Can I download a Facebook profile picture?",
    answer:
      "Yes. Paste a public profile link and the tool works as a Facebook profile pic downloader - it saves the profile photo (DP) at the largest size that's publicly available.",
  },
  {
    question: "Can I download HD or full-size Facebook photos?",
    answer:
      "Yes. Whenever Facebook provides a full-size version of an image, you can download HD photos from Facebook at the highest resolution available for that link.",
  },
  {
    question: "Can I download a Facebook cover photo?",
    answer:
      "Yes. Paste the public profile or page URL and you can download the Facebook cover photo just like any other image in a post.",
  },
  {
    question: "Is there a Chrome extension?",
    answer:
      "Yes. If you'd rather save images while you browse, our Chrome Facebook photo downloader extension lets you scan and download pictures in one click.",
  },
  {
    question: "How do I download photos from a Facebook group?",
    answer:
      "If the group is public, paste the post URL and the tool will extract the images. Private group posts require login and cannot be downloaded - only publicly accessible content works.",
  },
  {
    question: "Can I download all photos from a Facebook album?",
    answer:
      'Yes, when an album or gallery post is publicly accessible, the tool detects all images in it. Use the "Download All" button to save every photo from the album in one go.',
  },
  {
    question: "Does it work on mobile (Android and iPhone)?",
    answer:
      "Yes. The tool is fully responsive and works in any modern mobile browser. On Android or iPhone, open your browser, paste the Facebook link, and download as usual. No app installation needed.",
  },
  {
    question: "Why can't I download this photo?",
    answer:
      "The most common reasons are: (1) the post is private or requires login, (2) the link format isn't supported - try using the direct post URL instead of a shared link, (3) Facebook may have changed the page structure. If downloads fail, the tool will open the image in a new tab as a fallback.",
  },
  {
    question: "Is it legal to download Facebook photos?",
    answer:
      "Downloading publicly available Facebook photos is technically possible with this tool, but legality depends on your intended use. Saving photos for personal use is generally fine. Republishing, selling, or using someone else's photos commercially without permission may violate copyright law and Facebook's Terms of Service. Always respect the original creator's rights.",
  },
];

registerToolFAQ("facebook-image-downloader", () => facebookImageDownloaderFAQs);
