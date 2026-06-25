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
      "No. Everything runs in your browser — there's nothing to download or sign up for.",
  },
  {
    question: "Is it safe to use?",
    answer:
      "Yes. Images are fetched directly in your browser. Please only download photos you have permission to use.",
  },
  {
    question: "Can I download a Facebook profile picture?",
    answer:
      "Yes. Paste a public profile link and the tool works as a Facebook profile pic downloader — it saves the profile photo (DP) at the largest size that's publicly available.",
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
];

registerToolFAQ("facebook-image-downloader", () => facebookImageDownloaderFAQs);
