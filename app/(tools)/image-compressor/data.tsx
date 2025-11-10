// FAQ and testimonial data for image-compressor tool
export interface IFaq {
  id: number;
  question: string;
  answer: string;
}

export interface ITestimonial {
  id: number;
  name: string;
  rating: number;
  desc: string;
  role?: string;
  company?: string;
}

// FAQ data for image compressor


// Testimonials for image compressor
export const testimonial: ITestimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    desc: "This image compressor is a game-changer! I reduced my website's image sizes by 70% without any noticeable quality loss. The batch processing feature saved me hours of work.",
    role: "Web Developer",
    company: "TechStart Inc."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    rating: 5,
    desc: "Perfect for my e-commerce store. The Web Optimized preset gives me exactly what I need for fast-loading product images. Customer satisfaction has improved significantly.",
    role: "E-commerce Manager",
    company: "ShopFast"
  },
  {
    id: 3,
    name: "Emily Watson",
    rating: 5,
    desc: "As a photographer, I was skeptical about online compression tools. But this one maintains excellent quality while dramatically reducing file sizes. The privacy-first approach is exactly what I needed.",
    role: "Professional Photographer",
    company: "Watson Photography"
  },
  {
    id: 4,
    name: "David Kim",
    rating: 5,
    desc: "The advanced settings are incredible. Being able to set target file sizes and remove EXIF data selectively gives me complete control. This tool has become essential for my workflow.",
    role: "Digital Marketing Specialist",
    company: "GrowthLab"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    desc: "I love how fast and reliable this compressor is. Processing 50+ images takes just minutes, and the ZIP download feature makes it so convenient. Highly recommended!",
    role: "Content Creator",
    company: "Creative Studio"
  },
  {
    id: 6,
    name: "James Wilson",
    rating: 5,
    desc: "The compression presets are spot-on. I use different ones for different purposes - High Quality for print materials and Web Optimized for online use. Saves me so much time!",
    role: "Graphic Designer",
    company: "Design Pro"
  }
];
