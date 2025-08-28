import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

const resources = {
  en: {
    translation: enTranslations
  },
  es: {
    translation: esTranslations
  },
  fr: {
    translation: frTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'es', 'fr'],
    fallbackLng: 'en',
    lng: 'en', // Set default language explicitly
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupQuerystring: 'lng',
      convertDetectedLanguage: (lng) => {
        // Normalize detected language
        const l = lng.toLowerCase();
        if (l.startsWith('en')) return 'en';
        if (l.startsWith('es')) return 'es';
        if (l.startsWith('fr')) return 'fr';
        return 'en';
      }
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: false,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    }
  });

// Ensure <html lang> matches current language and sync ?lng in URL for shareable links
if (typeof document !== 'undefined') {
  const setHtmlLang = (lng: string) => {
    document.documentElement.setAttribute('lang', lng);
  };

  const upsertLngParam = (lng: string) => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('lng') !== lng) {
        url.searchParams.set('lng', lng);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (err) {
      // no-op if URL parsing fails
    }
  };

  // Normalize any detected language to our app's canonical set
  const normalizeToAppLng = (lng?: string | null) => {
    const l = (lng || 'en').toLowerCase();
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('fr')) return 'fr';
    return 'en';
  };

  // Priority order: URL param > localStorage > browser > fallback
  const urlLngRaw = (() => { 
    try { 
      return new URL(window.location.href).searchParams.get('lng'); 
    } catch { 
      return null; 
    } 
  })();
  
  const detected = urlLngRaw || i18n.resolvedLanguage || i18n.language || 'en';
  const initialLng = normalizeToAppLng(detected);

  // Set initial language synchronously
  if (i18n.language?.toLowerCase?.() !== initialLng) {
    i18n.changeLanguage(initialLng);
  }
  setHtmlLang(initialLng);
  upsertLngParam(initialLng);

  i18n.on('languageChanged', (newLng) => {
    const normalized = normalizeToAppLng(newLng);
    setHtmlLang(normalized);
    
    if ((newLng || '').toLowerCase() !== normalized) {
      i18n.changeLanguage(normalized);
    }
  });
}

export default i18n;