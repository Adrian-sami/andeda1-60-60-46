import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TikTokIcon } from './TikTokIcon';
export const Footer = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Force re-render when language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  // Show footer on all pages except 404
  const shouldShowFooter = location.pathname !== '/404';
  if (!shouldShowFooter) {
    return null;
  }
  return <footer key={currentLang} className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-1 group">
              <div className="w-8 h-8 bg-andeda-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold animate-zoom-blink">A</span>
              </div>
              <div className="flex flex-col justify-center h-8">
                <h3 className="text-sm gradient-heading group-hover:text-andeda-green transition-colors leading-none mx-px my-0 px-0 py-0 font-extrabold">ANDEDA</h3>
                <p className="text-background/70 leading-none px-0 mx-0 my-0 py-0 text-xs font-extrabold">Data Intelligence</p>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-background/70 hover:text-andeda-blue cursor-pointer transition-colors" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-background/70 hover:text-andeda-blue cursor-pointer transition-colors" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-background/70 hover:text-andeda-blue cursor-pointer transition-colors" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-background/70 hover:text-andeda-green cursor-pointer transition-colors" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4 text-background/70 hover:text-andeda-green cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="mx-0 my-0 py-0 px-0">
            <h4 className="gradient-heading text-lg font-semibold mb-4 my-0">{t('footer.services.title')}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/services#data-analytics" className="hover:text-andeda-green transition-colors">{t('footer.services.dataAnalytics')}</Link></li>
              <li><Link to="/services#consulting" className="hover:text-andeda-green transition-colors">{t('footer.services.businessConsulting')}</Link></li>
              <li><Link to="/services#financial-intelligence" className="hover:text-andeda-green transition-colors">{t('footer.services.financialIntelligence')}</Link></li>
              <li><Link to="/services#market-research" className="hover:text-andeda-green transition-colors">{t('footer.services.marketResearch')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="gradient-heading text-lg font-semibold mb-4 my-0">{t('footer.company.title')}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-andeda-green transition-colors">{t('footer.company.aboutUs')}</Link></li>
              <li><Link to="/contact" className="hover:text-andeda-green transition-colors">{t('footer.company.contact')}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-andeda-green transition-colors">{t('footer.company.privacyPolicy')}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-andeda-green transition-colors">{t('footer.company.termsOfService')}</Link></li>
            </ul>
          </div>

          {/* Contact & Business Hours */}
          <div className="md:-ml-4">
            <h4 className="gradient-heading text-lg font-semibold mb-4 mx-0 my-0">{t('footer.contactInfo.title')}</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-andeda-green" />
                <div>
                  <p>{t('footer.contactInfo.location.line1')}</p>
                  <p>{t('footer.contactInfo.location.line2')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-andeda-blue" />
                <a href="mailto:andeda1@outlook.com" className="hover:text-andeda-blue transition-colors break-all">
                  {t('footer.contactInfo.email')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-andeda-green" />
                <a href="tel:+240222108272" className="hover:text-andeda-green transition-colors">
                  {t('footer.contactInfo.phone')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 my-0">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-sm text-background/70 text-center md:text-left">
              <p>{t('footer.copyright', { year: currentYear })}</p>
            </div>
            <div className="flex space-x-6 text-sm text-background/70">
              <Link to="/privacy-policy" className="hover:text-andeda-green transition-colors">{t('footer.company.privacyPolicy')}</Link>
              <Link to="/terms-of-service" className="hover:text-andeda-green transition-colors">{t('footer.company.termsOfService')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};