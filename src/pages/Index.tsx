import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { ServiceComparison } from '@/components/ServiceComparison';
import { CaseStudies } from '@/components/CaseStudies';

import { ClientTestimonials } from '@/components/ClientTestimonials';
import { PlatformCTA } from '@/components/PlatformCTA';
import { TrustedPartners } from '@/components/TrustedPartners';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { AudiencesTeaser } from '@/components/AudiencesTeaser';

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[100svh] bg-background relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="hidden md:block fixed inset-0 bg-radial-gradient opacity-50 pointer-events-none" />
      <div className="hidden md:block fixed top-0 left-1/4 w-96 h-96 bg-andeda-green/10 rounded-full blur-3xl animate-zoom motion-reduce:animate-none will-change-transform pointer-events-none" />
      <div className="hidden md:block fixed bottom-0 right-1/4 w-80 h-80 bg-andeda-blue/10 rounded-full blur-3xl animate-zoom motion-reduce:animate-none will-change-transform pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10">
        <Header />
        <SEO 
          title="ANDEDA Analytics — Data Intelligence & Consulting"
          description="ANDEDA is a modern analytics and business consulting firm helping organizations harness data for smarter decisions, operational optimization, and sustainable growth across Africa and beyond."
          structuredData={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ANDEDA Analytics & Consulting",
              "url": typeof window !== 'undefined' ? window.location.origin : undefined,
              "logo": typeof window !== 'undefined' ? `${window.location.origin}${import.meta.env.BASE_URL}lovable-uploads/19f2777a-37a9-4b6c-9701-d837eef94ced.png` : undefined
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ANDEDA",
              "url": typeof window !== 'undefined' ? window.location.origin : undefined,
              "inLanguage": "en"
            }
          ]}
        />
        <main className="pb-0 md:pb-0 overflow-x-hidden">
          <section id="home" className="relative">
            <Hero />
          </section>
          
          <section id="value" className="relative cv-auto bg-background/60 border-t border-border/50">
            <AudiencesTeaser />
          </section>
          
          
          <section id="services" className="relative glass-effect backdrop-blur-sm cv-auto">
            <Services />
          </section>
          
          <section className="cv-auto">
            <ServiceComparison />
          </section>
          
          
          <section className="cv-auto">
            <TrustedPartners />
          </section>
          
          <section className="cv-auto">
            <ClientTestimonials />
          </section>
          
          <section className="cv-auto">
            <CaseStudies />
          </section>
          
          <section className="cv-auto">
            <PlatformCTA />
          </section>
          
          <section id="contact" className="relative glass-effect backdrop-blur-sm cv-auto">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
