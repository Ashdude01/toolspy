import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Scroll to element with header offset - default app scroll behavior
 * @param element - HTMLElement or React ref to scroll to
 * @param headerOffset - Offset for sticky header (default: 80px)
 */
export function scrollToElement(
  element: HTMLElement | React.RefObject<HTMLElement | null>, 
  headerOffset: number = 80
) {
  // Check if we're on the client side
  if (typeof window === 'undefined') return;
  
  const targetElement = 'current' in element ? element.current : element;
  if (!targetElement) return;

  targetElement.scrollIntoView({ 
    behavior: "smooth", 
    block: "nearest", 
    inline: "nearest" 
  });
  
  setTimeout(() => {
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + elementPosition - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }, 100);
}
