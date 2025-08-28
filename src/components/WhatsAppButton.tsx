import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const WhatsAppButton = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [showCallout, setShowCallout] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use sessionStorage to track if toast was shown during this session
  const hasShownToast = () => sessionStorage.getItem('whatsapp-toast-shown') === 'true';
  const setToastShown = () => sessionStorage.setItem('whatsapp-toast-shown', 'true');

  // Only show on home page, contact page, and services page
  const shouldShow = location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/services';

  // Function to open WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '240222108272';
    const languagePrefix = `[${i18n.language.toUpperCase()}] `;
    
    // Format message with proper spacing and line breaks
    const greeting = t('common.whatsappMessage.greeting');
    const services = t('common.whatsappMessage.services');
    const closing = t('common.whatsappMessage.closing');
    
    const message = `${languagePrefix}${greeting}

${services}

${closing}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Show toast automatically when page loads - only if should show
  useEffect(() => {
    if (!shouldShow) {
      return;
    }
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Only show toast if we haven't shown one yet in this session
    if (!hasShownToast()) {
      timerRef.current = setTimeout(() => {
        setToastShown();
        toast("📊 Need Data Clarity?", {
          description: "Chat us now",
          duration: 5000,
          position: "bottom-right",
          style: {
            position: "fixed",
            bottom: "90px",
            right: "16px",
            marginBottom: "0",
            zIndex: 9999,
          },
          action: {
            label: "Chat Now",
            onClick: openWhatsApp,
          },
          cancel: {
            label: <X className="w-4 h-4" />,
            onClick: () => {},
          },
        });
      }, 2000); // Show after 2 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname, shouldShow]);

  // Return null after all hooks have been called
  if (!shouldShow) return null;

  const handleWhatsAppClick = () => {
    // Show confirmation toast
    toast("💬 Opening WhatsApp...", {
      description: "Connecting you with our experts!",
      duration: 3000,
      position: "bottom-right",
      style: {
        position: "fixed",
        bottom: "90px",
        right: "16px",
        marginBottom: "0",
        zIndex: 9999,
      },
    });

    // Open WhatsApp
    openWhatsApp();
  };

  return (
    <div className="fixed bottom-32 md:bottom-20 right-6 z-50">
      <Button
        variant="gradient"
        size="default"
        className="rounded-full w-8 h-8 md:w-12 md:h-12 shadow-glow"
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
      </Button>
    </div>
  );
};