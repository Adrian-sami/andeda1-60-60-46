import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { openBookingSystem } from '@/lib/booking';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const tabletLangRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleLangClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop = desktopLangRef.current?.contains(target);
      const insideTablet = tabletLangRef.current?.contains(target);
      if (!insideDesktop && !insideTablet) {
        setIsLangOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLangOpen(false);
    };

    const handleScroll = () => setIsLangOpen(false);

    if (isLangOpen) {
      document.addEventListener('mousedown', handleLangClickOutside);
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleLangClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLangOpen]);

  // Close mobile menu on scroll when open (mobile only)
  useEffect(() => {
    if (!isMenuOpen || !isMobile) return;
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isMobile]);

  const navItems = [
    { label: t('nav.home'), href: '/', type: 'route' },
    { label: t('nav.services'), href: '/services', type: 'route' },
    { label: t('nav.about'), href: '/about', type: 'route' },
    { label: t('nav.contact'), href: '/contact', type: 'route' },
    { label: t('nav.analytics'), href: '/analytics', type: 'route' },
  ];

  const mobileNavItems = [
    { label: t('nav.home'), href: '/', type: 'route' },
    { label: t('nav.services'), href: '/services', type: 'route' },
    { label: t('nav.about'), href: '/about', type: 'route' },
    { label: t('nav.contact'), href: '/contact', type: 'route' },
    { label: t('nav.analytics'), href: '/analytics', type: 'route' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    const lng = (i18n.language || 'en').toLowerCase();
    navigate({ pathname: item.href, search: `?lng=${lng}` });
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode).then(() => {
      // Update URL without reload for better UX
      const url = new URL(window.location.href);
      url.searchParams.set('lng', langCode);
      window.history.pushState({}, '', url.toString());
      // Language change will trigger re-render through i18n context
    }).catch((error) => {
      console.error('Failed to change language:', error);
    });
  };

  const languages = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
  ];
  const currentLang = (i18n.language || '').toLowerCase();
  const isFrench = currentLang.startsWith('fr');
  const isLongLang = currentLang === 'es' || currentLang === 'fr';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-0 md:py-0 lg:py-0 overflow-visible">
        <div className="flex items-center justify-between min-h-[52px] md:min-h-[48px] lg:min-h-[56px]">
          {/* Logo with Icon */}
          <button
            onClick={() => {
              const lng = (i18n.language || 'en').toLowerCase();
              navigate({ pathname: '/', search: `?lng=${lng}` });
            }}
            className="transition-all duration-300 hover:scale-105 mr-2 md:mr-4 lg:mr-8 flex items-center -gap-1"
          >
            <div className="scale-110 md:scale-125 lg:scale-125 origin-left -ml-1">
              <Logo />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-foreground transition-all duration-300 font-medium text-lg whitespace-nowrap hover:scale-105 relative ${
                  location.pathname === item.href 
                    ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                    : 'hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Tablet Navigation - iPad mode */}
          <nav className={`hidden md:flex lg:hidden items-center ${isLongLang ? 'gap-0' : 'gap-1'} ${isFrench ? 'tracking-wide' : ''} flex-shrink min-w-0 overflow-visible`}>
            <button
              onClick={() => handleNavClick({ label: t('nav.home'), href: '/', type: 'route' })}
              className={`text-foreground font-medium ${isLongLang ? 'text-sm px-1.5 py-1' : 'text-sm px-2 py-1'} whitespace-nowrap flex-shrink-0 relative ${
                location.pathname === '/' 
                  ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                  : 'hover:text-primary'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => handleNavClick({ label: t('nav.services'), href: '/services', type: 'route' })}
              className={`text-foreground font-medium ${isLongLang ? 'text-sm px-1.5 py-1' : 'text-sm px-2 py-1'} whitespace-nowrap flex-shrink-0 relative ${
                location.pathname === '/services' 
                  ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                  : 'hover:text-primary'
              }`}
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => handleNavClick({ label: t('nav.about'), href: '/about', type: 'route' })}
              className={`text-foreground font-medium ${isLongLang ? 'text-sm px-1.5 py-1' : 'text-sm px-2 py-1'} whitespace-nowrap flex-shrink-0 relative ${
                location.pathname === '/about' 
                  ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                  : 'hover:text-primary'
              }`}
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => handleNavClick({ label: t('nav.contact'), href: '/contact', type: 'route' })}
              className={`text-foreground font-medium ${isLongLang ? 'text-sm px-1.5 py-1' : 'text-sm px-2 py-1'} whitespace-nowrap flex-shrink-0 relative ${
                location.pathname === '/contact' 
                  ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                  : 'hover:text-primary'
              }`}
            >
              {t('nav.contact')}
            </button>
            <button
              onClick={() => handleNavClick({ label: t('nav.analytics'), href: '/analytics', type: 'route' })}
              className={`text-foreground font-medium ${isLongLang ? 'text-sm px-1.5 py-1' : 'text-sm px-2 py-1'} whitespace-nowrap flex-shrink-0 relative ${
                location.pathname === '/analytics' 
                  ? 'text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' 
                  : 'hover:text-primary'
              }`}
            >
              {t('nav.analytics')}
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-8 ml-6">
            {/* Language Switcher */}
            <div ref={desktopLangRef} className="relative">
              <button
                onClick={() => setIsLangOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={isLangOpen}
                className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-primary whitespace-nowrap"
              >
                <Globe className="w-6 h-6" />
                <span>{(i18n.language as string)?.toUpperCase?.() || i18n.language}</span>
              </button>
              <div
                className={`absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-[60] ${
                  isLangOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                role="menu"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { handleLanguageChange(lang.code); setIsLangOpen(false); }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent w-full text-left"
                    role="menuitem"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <Button variant="gradient" size="lg" onClick={openBookingSystem}>
              {t('common.scheduleConsultation')}
            </Button>
          </div>

          {/* Tablet Actions - iPad mode */}
          <div className={`hidden md:flex lg:hidden items-center gap-3 ml-3 flex-shrink-0 overflow-visible`}>
            {/* Language Switcher */}
            <div ref={tabletLangRef} className="relative flex-shrink-0">
              <button
                onClick={() => setIsLangOpen((o) => !o)}
                aria-haspopup="menu"
                 aria-expanded={isLangOpen}
                className={`flex items-center gap-1 text-xs ${isFrench ? 'tracking-wide' : ''} font-bold text-foreground hover:text-primary`}
              >
                <Globe className="w-4 h-4" />
                <span>{(i18n.language as string)?.toUpperCase?.() || i18n.language}</span>
              </button>
              <div
                className={`absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-[60] ${
                  isLangOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                role="menu"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { handleLanguageChange(lang.code); setIsLangOpen(false); }}
                    className="flex items-center space-x-1 px-2 py-1 text-xs hover:bg-accent w-full text-left whitespace-nowrap"
                    role="menuitem"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <Button variant="gradient" size="sm" onClick={openBookingSystem} className={`text-[10px] px-2 py-1.5 ${isFrench ? 'tracking-wide' : ''} whitespace-nowrap flex-shrink-0`}>
              {t('common.schedule')}
            </Button>
          </div>

          {/* Mobile Language Switcher & Menu Button */}
          <div className={`md:hidden flex items-center ${isFrench ? 'space-x-2' : 'space-x-3'}`}>
            <select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-background text-foreground text-sm font-medium border border-border rounded px-1 py-0.5 min-w-0"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-background text-foreground">
                  {lang.flag} {lang.code}
                </option>
              ))}
            </select>
            
            {/* Current Page & Menu Button */}
            <div className="flex items-center space-x-2">
              <span className={`font-medium text-andeda-blue truncate ${isFrench ? 'text-[10px] max-w-[100px]' : 'text-xs max-w-[80px]'}`}>
              {location.pathname === '/services' 
                ? t('services.title') 
                : (navItems.find(item => item.href === location.pathname)?.label || t('nav.home'))}
            </span>
            <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden mt-2 pb-4 border-t border-border pt-2">
            <nav className="flex flex-col space-y-4">
              {mobileNavItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="transition-colors font-medium text-left text-sm text-foreground hover:text-primary"
                  >
                    <span
                      className={active ? 'relative inline-block pb-0.5 text-andeda-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-andeda-blue after:rounded-full' : ''}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-border">
                <Button variant="gradient" size="sm" onClick={openBookingSystem} className={`w-full ${isFrench ? 'text-xs' : ''}`}>
                  {t('common.scheduleConsultation')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};