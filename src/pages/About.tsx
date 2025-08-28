import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Award, Target, Lightbulb, DollarSign, ArrowRight } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { Link } from 'react-router-dom';
import { openBookingSystem } from '@/lib/booking';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';
import { ValueForAudiences } from '@/components/ValueForAudiences';

const About = () => {
  // Ensure translations are loaded correctly
  const { t, i18n } = useTranslation();
  
  // Force translation reload for Spanish content
  React.useEffect(() => {
    if (i18n.language === 'es') {
      i18n.reloadResources(['es']);
    }
  }, [i18n.language]);
  
  return (
    <div key={i18n.language} className="min-h-screen bg-background relative w-full">
      {/* Animated Background Elements - Fully contained within viewport */}
      <div className="fixed inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="fixed top-20 right-2 sm:right-4 md:right-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-andeda-green/10 rounded-full blur-2xl animate-zoom-blink pointer-events-none" />
      <div className="fixed bottom-32 left-2 sm:left-4 md:left-10 w-36 sm:w-52 md:w-72 h-36 sm:h-52 md:h-72 bg-andeda-blue/10 rounded-full blur-2xl animate-zoom-blink pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-andeda-gradient/5 rounded-full blur-2xl animate-zoom-blink pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10">
        <Header />
        <SEO title="About ANDEDA — Data Intelligence" description={t('about.subtitle')} />
        <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 bg-gray-950 relative">
          <div className="absolute inset-0 bg-gray-900/60" />
          <div className="absolute top-10 left-2 sm:left-4 md:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-andeda-green/20 rounded-full animate-sparkle blur-xl" />
          <div className="absolute bottom-10 right-2 sm:right-4 md:right-10 w-28 sm:w-40 h-28 sm:h-40 bg-andeda-blue/20 rounded-full animate-sparkle blur-xl" />
          
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <div className="text-center">
              {/* Logo */}
              <div className="mb-2 flex justify-center">
                <img
                  src="/lovable-uploads/8faccaae-b45c-41f5-bdf6-50df9a3f3d85.png"
                  alt="ANDEDA logo"
                  loading="eager"
                  className="h-32 md:h-44 lg:h-52 w-auto drop-shadow-lg"
                />
              </div>
              
              {/* Main Heading */}
              <div className="animate-fade-in mb-6">
                <h1 className="mixed-heading-hero leading-tight animate-pulse-glow text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="text-foreground">ANDEDA </span>
                  <span className="gradient-text animate-pulse">S.L</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {t('about.tagline')}
                </p>
              </div>

              {/* Who We Are Section */}
              <div className="animate-slide-up mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  <span className="gradient-text animate-tech-glow">{t('about.whoWeAre.title')}</span>
                </h2>
                
                {/* Services List */}
                <div className="mb-6">
                  <p className="text-lg md:text-xl font-semibold mb-4">
                    {t('about.whoWeAre.servicesList').split(' | ').map((service, index, array) => (
                      <span key={index}>
                        <span className="gradient-text animate-tech-glow">{service}</span>
                        {index < array.length - 1 && ' | '}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Description */}
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {t('about.whoWeAre.description')}
                  </p>
                </div>
              </div>

              {/* Why Clients Choose Us Section */}
              <div className="animate-slide-up">
                <h2 className="text-2xl md:text-3xl font-bold gradient-text-mobile-force mb-6">
                  {t('about.whyChooseUs.title')}
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.whyChooseUs.description1')}
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.whyChooseUs.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="pt-12 md:pt-16 pb-20 relative">
          <div className="container mx-auto px-4 max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto overflow-visible px-4 md:px-8">
              <div className="animate-slide-left text-center h-full max-w-full">
                <div className="p-6 lg:p-8 rounded-xl glass-effect border border-andeda-green/20 hover:border-andeda-green/40 hover:shadow-neon transition-all duration-500 lg:hover:scale-105 group h-full flex flex-col max-w-full overflow-visible">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <AnimatedIcon icon={Target} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    <span className="gradient-text animate-tech-glow">{t('about.mission.title')}</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1 text-center">
                    {t('about.mission.description')}
                  </p>
                </div>
              </div>
              <div className="animate-slide-left text-center h-full max-w-full" style={{ animationDelay: '0.2s' }}>
                <div className="p-6 lg:p-8 rounded-xl glass-effect border border-andeda-blue/20 hover:border-andeda-blue/40 hover:shadow-neon transition-all duration-500 lg:hover:scale-105 group h-full flex flex-col max-w-full overflow-visible">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <AnimatedIcon icon={Lightbulb} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    <span className="gradient-text animate-tech-glow">{t('about.vision.title')}</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1 text-center">
                    {t('about.vision.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900 to-green-800/10" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 relative z-10 overflow-hidden max-w-full">
            <div className="text-center mb-12">
              <h2 className="mixed-heading-section mb-3 animate-pulse-glow text-4xl md:text-5xl lg:text-6xl">
                <span className="gradient-text">{t('about.values.title')}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('about.values.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto overflow-visible px-2 md:px-4">
              <div className="text-center animate-slide-up p-6 md:p-8 mt-8 mb-4 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:-translate-y-4 group md:hover:scale-110">
                <div className="w-20 h-20 bg-andeda-gradient rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <AnimatedIcon icon={Award} className="w-10 h-10 text-white" animation="zoom-blink" />
                </div>
                <h3 className="text-lg font-semibold lg:text-2xl lg:font-bold mb-4">
                  <span className="gradient-text animate-tech-glow text-xl sm:text-2xl">{t('about.values.excellence.title')}</span>
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {t('about.values.excellence.description')}
                </p>
              </div>
              
              <div className="text-center animate-slide-up p-6 md:p-8 mt-8 mb-4 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:-translate-y-4 group md:hover:scale-110" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-andeda-gradient rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <AnimatedIcon icon={Users} className="w-10 h-10 text-white" animation="zoom-blink" />
                </div>
                <h3 className="text-lg font-semibold lg:text-2xl lg:font-bold mb-4">
                  <span className="gradient-text animate-tech-glow text-xl sm:text-2xl">{t('about.values.collaboration.title')}</span>
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {t('about.values.collaboration.description')}
                </p>
              </div>
              
              <div className="text-center animate-slide-up p-6 md:p-8 mt-8 mb-4 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:-translate-y-4 group md:hover:scale-110" style={{ animationDelay: '0.4s' }}>
                <div className="w-20 h-20 bg-andeda-gradient rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <AnimatedIcon icon={TrendingUp} className="w-10 h-10 text-white" animation="zoom-blink" />
                </div>
                <h3 className="text-lg font-semibold lg:text-2xl lg:font-bold mb-4">
                  <span className="gradient-text animate-tech-glow text-xl sm:text-2xl">{t('about.values.innovation.title')}</span>
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {t('about.values.innovation.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Help Section */}
        <section id="who-we-help" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-andeda-green/5 via-transparent to-andeda-blue/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="mixed-heading-section mb-6 text-4xl md:text-5xl lg:text-6xl">
                <span className="gradient-text animate-tech-glow">{t('audiences.shortTitle', 'Who We Help')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
                {t('audiences.description')}
              </p>
              
            </div>
            <ValueForAudiences showHeader={false} />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="mixed-heading-section mb-6 text-4xl md:text-5xl lg:text-6xl">
                <span className="gradient-text animate-tech-glow">{t('about.expertise.title')}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('about.expertise.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch">
              <div className="group text-center animate-slide-up transition-all duration-500 md:hover:scale-105 hover:-translate-y-2 hover:shadow-elegant cursor-pointer">
                <div className="p-6 rounded-xl glass-effect border border-andeda-green/20 hover:border-andeda-green/40 hover:shadow-neon h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-andeda-gradient rounded-full mb-4 flex items-center justify-center">
                      <AnimatedIcon icon={BarChart3} className="w-10 h-10 text-white" animation="zoom-blink" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 min-h-[4rem] flex items-center">
                      <span className="gradient-text text-center animate-tech-glow">{t('about.expertise.dataAnalytics')}</span>
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">{t('about.expertise.dataAnalyticsDesc')}</p>
                </div>
              </div>
              
              <div className="group text-center animate-slide-up transition-all duration-500 md:hover:scale-105 hover:-translate-y-2 hover:shadow-elegant cursor-pointer" style={{ animationDelay: '0.1s' }}>
                <div className="p-6 rounded-xl glass-effect border border-andeda-blue/20 hover:border-andeda-blue/40 hover:shadow-neon h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-andeda-gradient rounded-full mb-4 flex items-center justify-center">
                      <AnimatedIcon icon={TrendingUp} className="w-10 h-10 text-white" animation="zoom-blink" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 min-h-[4rem] flex items-center">
                      <span className="gradient-text text-center animate-tech-glow">
                        <span className="lg:hidden">{t('about.expertise.consulting')}</span>
                        <span className="hidden lg:inline">{t('about.expertise.consulting').split(' ')[0]}<br />{t('about.expertise.consulting').split(' ')[1]}</span>
                      </span>
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">{t('about.expertise.consultingDesc')}</p>
                </div>
              </div>
              
              <div className="group text-center animate-slide-up transition-all duration-500 md:hover:scale-105 hover:-translate-y-2 hover:shadow-elegant cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <div className="p-6 rounded-xl glass-effect border border-andeda-green/20 hover:border-andeda-green/40 hover:shadow-neon h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-andeda-gradient rounded-full mb-4 flex items-center justify-center">
                      <AnimatedIcon icon={DollarSign} className="w-10 h-10 text-white" animation="zoom-blink" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 min-h-[4rem] flex items-center">
                      <span className="gradient-text text-center animate-tech-glow">{t('about.expertise.financialIntelligence')}</span>
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">{t('about.expertise.financialIntelligenceDesc')}</p>
                </div>
              </div>
              
              <div className="group text-center animate-slide-up transition-all duration-500 md:hover:scale-105 hover:-translate-y-2 hover:shadow-elegant cursor-pointer" style={{ animationDelay: '0.3s' }}>
                <div className="p-6 rounded-xl glass-effect border border-andeda-blue/20 hover:border-andeda-blue/40 hover:shadow-neon h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-andeda-gradient rounded-full mb-4 flex items-center justify-center">
                      <AnimatedIcon icon={Users} className="w-10 h-10 text-white" animation="zoom-blink" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 min-h-[4rem] flex items-center">
                      <span className="gradient-text text-center animate-tech-glow">{t('about.expertise.marketResearch')}</span>
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">{t('about.expertise.marketResearchDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-andeda-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mixed-heading-section mb-6">
                <span className="gradient-text">{t('about.cta.title')}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('about.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="gradient-intense" size="lg" className="text-lg px-8 py-4" onClick={openBookingSystem}>
                  {t('about.cta.scheduleConsultation')}
                </Button>
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/services">
                    {t('about.cta.learnMoreServices')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose ANDEDA Section */}
        <section className="py-16 bg-gray-900/80 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-andeda-green/5 via-transparent to-andeda-blue/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-tech-glow leading-tight">
                  <span className="gradient-text drop-shadow-lg">{t('about.whyChoose.title')} {t('about.whyChoose.subtitle')}</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {t('about.whyChoose.description')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 md:hover:scale-105 group">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <AnimatedIcon icon={BarChart3} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{t('about.whyChoose.realTimeAnalytics.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.whyChoose.realTimeAnalytics.description')}</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 md:hover:scale-105 group">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <AnimatedIcon icon={TrendingUp} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{t('about.whyChoose.predictiveModeling.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.whyChoose.predictiveModeling.description')}</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 md:hover:scale-105 group">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <AnimatedIcon icon={Users} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{t('about.whyChoose.expertSupport.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.whyChoose.expertSupport.description')}</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 md:hover:scale-105 group">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <AnimatedIcon icon={ArrowRight} className="w-8 h-8 text-white" animation="zoom-blink" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{t('about.whyChoose.quickImplementation.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.whyChoose.quickImplementation.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default About;