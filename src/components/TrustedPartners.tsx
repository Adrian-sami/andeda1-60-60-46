import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dasmedhubLogo from '/lovable-uploads/a89de76e-82d4-4f44-b07b-86ae327783eb.png';
import empresadeLogo from '/lovable-uploads/f7875f34-4502-4711-abf7-4f114d9db164.png';
import sentravelLogo from '/lovable-uploads/54dff071-b280-40f2-9946-77a9309f7b86.png';
import vendeloLogo from '/lovable-uploads/bfb8e506-55d4-4845-94d2-3d4e340dd36c.png';

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
                      <div className="bg-background rounded-md w-full h-full flex items-center justify-center shadow-inner p-2 sm:p-3 md:p-4 lg:p-5">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} - Trusted partner logo`} 
                          className="object-contain w-full h-full 
                          max-w-[200px] max-h-[120px] 
                          sm:max-w-[240px] sm:max-h-[140px] 
                          md:max-w-[280px] md:max-h-[160px] 
                          lg:max-w-[320px] lg:max-h-[180px]" 
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