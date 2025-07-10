/**
 * Custom Image Loader for Static Export
 * This enables image optimization even with output: 'export'
 */

export default function imageLoader({ src, width, quality }) {
  // Check for external optimization services
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const imagekitUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL;
  
  // Cloudinary optimization (best option)
  if (cloudinaryUrl && !src.startsWith('/')) {
    return `${cloudinaryUrl}/w_${width},q_${quality || 'auto'},f_auto,c_limit/${encodeURIComponent(src)}`;
  }
  
  // ImageKit optimization
  if (imagekitUrl && !src.startsWith('/')) {
    return `${imagekitUrl}/tr:w-${width},q-${quality || 'auto'},f-auto,c-at_max/${encodeURIComponent(src)}`;
  }
  
  // For local images with static export
  if (src.startsWith('/')) {
    // Generate responsive image path
    const params = new URLSearchParams();
    if (width) params.set('w', width);
    if (quality) params.set('q', quality);
    
    return `${src}${params.toString() ? '?' + params.toString() : ''}`;
  }
  
  // Fallback for external images without optimization
  return src;
} 