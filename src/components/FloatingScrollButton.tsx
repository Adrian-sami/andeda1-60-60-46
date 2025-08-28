import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      
      // Show button after scrolling a bit
      setIsVisible(scrollTop > 100);
      
      // Determine scroll direction
      if (scrollTop > lastScrollY) {
        // Scrolling down - show down arrow
        setShowUpArrow(false);
      } else if (scrollTop < lastScrollY) {
        // Scrolling up - show up arrow
        setShowUpArrow(true);
      }
      
      // Update last scroll position
      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    // Scroll to the very top of the page so header is fully visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    // Scroll to just before the footer
    const footer = document.querySelector('footer');
    if (footer) {
      const footerTop = footer.offsetTop - window.innerHeight + 100; // 100px before footer
      window.scrollTo({ top: footerTop, behavior: 'smooth' });
    } else {
      // Fallback to document bottom with offset
      window.scrollTo({ top: document.body.scrollHeight - window.innerHeight, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-50">
      <Button
        onClick={showUpArrow ? scrollToTop : scrollToBottom}
        size="icon"
        className="w-8 h-8 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        aria-label={showUpArrow ? "Scroll to top" : "Scroll to bottom"}
      >
        {showUpArrow ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};