import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Headphones, Globe } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import ContactForm from '@/components/ContactForm';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Stunning Background Effects */}
      <div className="fixed inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="fixed top-32 right-4 sm:right-16 w-60 sm:w-80 h-60 sm:h-80 bg-andeda-green/10 rounded-full blur-3xl animate-zoom-blink pointer-events-none" />
      <div className="fixed bottom-40 left-4 sm:left-16 w-72 sm:w-96 h-72 sm:h-96 bg-andeda-blue/10 rounded-full blur-3xl animate-zoom-blink pointer-events-none" />
      <div className="fixed top-1/3 left-1/4 sm:left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-andeda-gradient/5 rounded-full blur-3xl animate-zoom-blink pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        <SEO title="Contact — ANDEDA Analytics" description={t('contact.hero.subtitle')} />
        <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-andeda-gradient-dark relative overflow-x-hidden overflow-y-visible">
          <div className="absolute inset-0 glass-effect" />
          <div className="absolute top-10 right-10 w-48 h-48 bg-andeda-green/15 rounded-full animate-sparkle blur-2xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-andeda-blue/15 rounded-full animate-sparkle blur-2xl" style={{ animationDelay: '2s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <h1 className="mixed-heading-hero mb-6 leading-tight animate-pulse-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {(() => {
                    const title = t('contact.hero.title');
                    if (title.includes('in Touch')) {
                      const parts = title.split('in Touch');
                      return (
                        <>
                          <span className="text-foreground">{parts[0]}</span>
                          <span className="gradient-text animate-tech-glow">in Touch</span>
                          <span className="text-foreground">{parts[1]}</span>
                        </>
                      );
                    }
                    return <span className="text-foreground">{title}</span>;
                  })()}
                </h1>
              </div>
              <div className="animate-slide-up">
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('contact.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="mixed-heading-section mb-6">
                <span className="gradient-text">{t('contact.info.teamTitle')}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
                {t('contact.info.subtitle')}
              </p>
              
              {/* Instruction with arrow */}
              <div className="animate-fade-in">
                <p className="text-base md:text-lg text-muted-foreground mb-3">
                  {t('contact.info.clickToConnect')}
                </p>
                <div className="flex justify-center mb-6">
                  <svg 
                    width="50" 
                    height="30" 
                    viewBox="0 0 50 30" 
                    fill="none" 
                    className="text-andeda-blue animate-zoom"
                  >
                    <path 
                      d="M25 3 Q12 15 25 27 Q38 15 25 3" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    <defs>
                      <marker 
                        id="arrowhead" 
                        markerWidth="8" 
                        markerHeight="6" 
                        refX="7" 
                        refY="3" 
                        orient="auto"
                      >
                        <polygon 
                          points="0 0, 8 3, 0 6" 
                          fill="currentColor" 
                        />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 md:px-8 overflow-visible">
              
              {/* Left Column - 3 Contact Boxes */}
              <div className="space-y-4 lg:space-y-6">
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center" onClick={() => window.open('mailto:andeda1@outlook.com', '_blank')}>
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={Mail} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('common.email')}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-lg leading-tight truncate">andeda1@outlook.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center" onClick={() => window.open('tel:+240222108272', '_self')}>
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={Phone} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('common.phone')}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-lg leading-tight">+240 222 108 272</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center" onClick={() => {
                  const message = `${t('common.whatsappMessage.greeting')}\n\n${t('common.whatsappMessage.services')}\n\n${t('common.whatsappMessage.closing')}`;
                  window.open(`https://wa.me/240222108272?text=${encodeURIComponent(message)}`, '_blank');
                }}>
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={MessageSquare} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('common.whatsapp')}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-lg leading-tight truncate">{t('contact.info.whatsappAction')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - 3 Contact Boxes */}
              <div className="space-y-4 lg:space-y-6">
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center">
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={MapPin} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('common.office')}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-lg leading-tight">Banapa, Malabo, Equatorial Guinea</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center">
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={Clock} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('common.businessHours')}</span>
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed break-words overflow-hidden">{t('contact.info.hours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 lg:hover:scale-105 lg:hover:-translate-y-2 group cursor-pointer h-24 sm:h-28 flex items-center">
                  <CardContent className="p-4 lg:p-6 w-full">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AnimatedIcon icon={Headphones} className="w-6 h-6 lg:w-8 lg:h-8 text-white" animation="zoom-blink" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold mb-0 leading-none">
                          <span className="gradient-text animate-tech-glow">{t('contact.info.technicalSupport')}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-lg leading-tight truncate">{t('contact.info.techSupportHours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-br from-andeda-green/5 via-transparent to-andeda-blue/5" />
          <div className="container mx-auto px-4 relative z-10 overflow-visible">
            <div className="text-center mb-12">
              <h2 className="mixed-heading-section mb-6">
                <span className="gradient-text">{t('contact.form.title')}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('contact.form.subtitle')}
              </p>
            </div>
            
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-andeda-blue/5 via-transparent to-andeda-green/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="mixed-heading-section mb-6">
                <span className="gradient-text">{t('contact.faq.title')}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('contact.faq.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-blue/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-blue transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q1.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q1.answer')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-green/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-green transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q2.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q2.answer')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-blue/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-blue transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q3.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q3.answer')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-green/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-green transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q5.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q5.answer')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-blue/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-blue transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q6.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q6.answer')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-border overflow-hidden md:overflow-visible md:hover:border-andeda-green/30 md:hover:shadow-neon transition-all duration-500 md:hover:scale-105 group">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-andeda-green transition-colors duration-300">
                    <span className="gradient-text animate-tech-glow">{t('contact.faq.q7.question')}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contact.faq.q7.answer')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Contact;