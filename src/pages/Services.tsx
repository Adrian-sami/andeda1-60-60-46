
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { getServiceCategories } from '@/data/servicesData';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';

const Services = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="hidden md:block fixed inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
      <div className="hidden md:block fixed top-40 left-20 w-96 h-96 bg-andeda-green/10 rounded-full blur-3xl animate-zoom pointer-events-none" />
      <div className="hidden md:block fixed bottom-20 right-20 w-72 h-72 bg-andeda-blue/10 rounded-full blur-3xl animate-zoom pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        <SEO title="Services — ANDEDA Analytics" description={t('services.subtitle')} />
        <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-andeda-gradient-dark relative overflow-x-hidden overflow-y-visible">
          <div className="absolute inset-0 glass-effect" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-40 h-40 bg-andeda-green/15 rounded-full animate-sparkle blur-2xl" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-andeda-blue/15 rounded-full animate-sparkle blur-2xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <h1 className="mixed-heading-hero mb-6 leading-tight">
                  <span className="text-foreground">{t('services.headerPrefix')} </span><span className="gradient-text">{t('services.headerMain')}</span>
                </h1>
              </div>
              <div className="animate-slide-up">
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('services.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-8 bg-transparent relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 rounded-3xl glass-effect gradient-border animate-slide-up">
                <h2 className="mixed-heading-section mb-6">
                  <span className="gradient-text">What We Do</span>
                </h2>
                <p className="text-base lg:text-lg leading-relaxed gradient-text">
                  {t('services.whoWeAre.description2')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mt-0 py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {getServiceCategories(t).map((category) => (
                <div key={category.id} id={category.id} className="w-full pt-4 md:pt-6 scroll-mt-56 md:scroll-mt-64 lg:scroll-mt-72">
                  <ServiceCard 
                    {...category}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Services;
