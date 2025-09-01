import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dasmedhubLogo from '/lovable-uploads/f5b8c081-0688-476f-9a9b-bd478ea14c14.png';
import empresadeLogo from '/lovable-uploads/7a3a7f11-19a9-4dd7-870c-0d44a297ea22.png';
import sentravelLogo from '/lovable-uploads/0b51faee-4301-4a6e-a760-c989e686526a.png';
import vendeloLogo from '/lovable-uploads/6bd994ca-7eae-4f35-9232-77596c9a0fa7.png';

const partners = [
  { 
    name: "DasMedHub", 
    logo: dasmedhubLogo
  },
  { 
    name: "Empresa de Mantenimiento GOASL", 
    logo: empresadeLogo
  },
  { 
    name: "Sen Travel", 
    logo: sentravelLogo
  },
  { 
    name: "Vendelo", 
    logo: vendeloLogo
  }
];

export const TrustedPartners = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextPartner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
  };

  const prevPartner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    // Continuous slow sliding handled by CSS animation
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 px-2">
            <span className="gradient-text">{t('partners.title')}</span>{' '}
            <span className="gradient-text animate-continuous-glow md:animate-none">{t('partners.leaders')}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('partners.subtitle')}
          </p>
        </div>

        <div className="relative flex items-center justify-center h-72 sm:h-80 overflow-hidden">
          {/* Sliding container with continuous motion and pause functionality */}
          <div className="flex justify-center items-center w-full">
            <div 
              className="flex space-x-4 md:space-x-6 lg:space-x-8 w-max animate-[slide-across_45s_linear_infinite]"
              style={{ 
                animationDelay: `${-currentIndex * 11.25}s`,
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {/* Duplicate partners for seamless infinite loop */}
              {[...partners, ...partners, ...partners].map((partner, index) => {
                const actualIndex = index % partners.length;
                const isActive = actualIndex === currentIndex;
                
                return (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer select-none"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div className="bg-gradient-to-br from-background/90 to-muted/80 border border-andeda-green/30 rounded-lg shadow-lg hover:shadow-xl hover:border-andeda-blue/50 transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:scale-105 shadow-[0_0_25px_rgba(34,197,94,0.25)] 
                    w-64 h-40 
                    sm:w-72 sm:h-48 
                    md:w-80 md:h-52 
                    lg:w-96 lg:h-64 
                    p-3 sm:p-4 md:p-5 lg:p-6">
                      <div className="bg-white rounded-md w-full h-full flex items-center justify-center shadow-inner p-2 sm:p-3 md:p-4 lg:p-5">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} - Trusted partner logo`} 
                          className="object-cover w-full h-full scale-110" 
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Arrows Below */}
        <div className="flex justify-center items-center space-x-4 mt-4 sm:mt-6">
          <button
            onClick={prevPartner}
            className="bg-background/80 hover:bg-background rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground group-hover:text-andeda-blue transition-colors duration-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {partners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? 'bg-andeda-blue' 
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button
            onClick={nextPartner}
            className="bg-background/80 hover:bg-background rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Next partner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground group-hover:text-andeda-blue transition-colors duration-300" />
          </button>
        </div>

        <div className="text-center mt-3 sm:mt-4 px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t('partners.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};