import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedIcon from '@/components/AnimatedIcon';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import heroImage from '@/assets/andeda-hero-dashboard.jpg';
import { openBookingSystem } from '@/lib/booking';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateStats } from '@/lib/statsCalculator';

export const Hero = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const stats = calculateStats();
  return (
    <section id="home" className="relative min-h-[100dvh] md:min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-56px)] flex items-start md:items-center justify-center overflow-x-hidden overflow-y-visible pt-28 md:pt-12 lg:pt-44">
      {/* Development Banner */}

      {/* Background */}
      <div className="absolute inset-0 bg-andeda-gradient-subtle"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Data Analytics Dashboard" 
          className="w-full h-full object-cover border-0"
          loading="eager"
          decoding="async"
          {...{ fetchpriority: "high" }}
          sizes="100vw"
        />
      </div>

      {/* Floating Elements - Hidden on mobile to prevent text overlap */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-20 w-16 h-16 bg-andeda-green/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-andeda-blue/20 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-andeda-green/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-andeda-blue/15 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="mixed-heading-hero mb-4 leading-tight px-2 animate-floating-text mt-8 md:mt-0">
              <span className="text-foreground">{t('hero.titlePart1')} </span>
              <span className="gradient-text-mobile-force animate-continuous-glow">{t('hero.titlePart2')}</span>
            </h1>
          </div>

          {/* Subtitle with Typewriter Effect */}
          <div className="animate-slide-up">
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed px-4">
              <TypewriterEffect 
                text={t('hero.subtitle')}
                speed={30}
                startDelay={0}
                className="inline-block"
                key={t('hero.subtitle')}
              />
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-4 px-4">
            <Button variant="gradient" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto" onClick={openBookingSystem}>
              {isMobile ? (
                <TypewriterEffect
                  text={t('hero.scheduleConsultation')}
                  speed={30}
                  startDelay={0}
                  className="inline-block gradient-text-mobile-force animate-continuous-glow"
                  key={t('hero.scheduleConsultation')}
                />
              ) : (
                t('hero.scheduleConsultation')
              )}
              <AnimatedIcon icon={ArrowRight} className="ml-2 w-4 sm:w-5 h-4 sm:h-5" animation="pulse-scale" />
            </Button>
            <Link to="/analytics" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-andeda-blue/30 text-foreground hover:bg-andeda-blue hover:text-white hover:border-andeda-blue hover:shadow-glow transform hover:scale-105 transition-all duration-300 w-full">
                {t('hero.seeWhatBuilding')}
                <AnimatedIcon icon={BarChart3} className="ml-2 w-4 sm:w-5 h-4 sm:h-5" animation="rotate-slow" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-slide-up grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4 mb-2 lg:mb-2">
            <div className="text-center p-3 rounded-lg transition-all duration-300 hover:bg-andeda-green/10 hover:shadow-neon cursor-pointer glass-effect">
              <div className="flex items-center justify-center mb-2">
                <AnimatedIcon icon={BarChart3} className="w-6 h-6 text-andeda-green mr-2" animation="zoom-blink" />
                <span className="text-3xl font-bold text-foreground">{stats.organizations}</span>
              </div>
              <p className="text-muted-foreground">{t('hero.organizationsEmpowered')}</p>
            </div>
            <div className="text-center p-3 rounded-lg transition-all duration-300 hover:bg-andeda-blue/10 hover:shadow-neon cursor-pointer glass-effect">
              <div className="flex items-center justify-center mb-2">
                <AnimatedIcon icon={TrendingUp} className="w-6 h-6 text-andeda-blue mr-2" animation="zoom-blink" />
                <span className="text-3xl font-bold text-foreground">{stats.dataAccuracy}</span>
              </div>
              <p className="text-muted-foreground">{t('hero.dataAccuracy')}</p>
            </div>
            <div className="text-center p-3 rounded-lg transition-all duration-300 hover:bg-andeda-green/10 hover:shadow-neon cursor-pointer glass-effect">
              <div className="flex items-center justify-center mb-2">
                <AnimatedIcon icon={Users} className="w-6 h-6 text-andeda-green mr-2" animation="zoom-blink" />
                <span className="text-3xl font-bold text-foreground">{stats.endUsers}</span>
              </div>
              <p className="text-muted-foreground">{t('hero.endUsersReached')}</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};