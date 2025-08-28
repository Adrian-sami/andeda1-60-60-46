import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Database, TrendingUp } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PlatformCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-andeda-blue/5 to-andeda-green/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-andeda-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-andeda-green/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-andeda-gradient/10 border border-andeda-blue/20 rounded-full mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
            <AnimatedIcon icon={Code} className="w-5 h-5 text-andeda-blue mr-3" animation="pulse-scale" />
            <span className="text-lg font-bold text-andeda-blue">{t('platform.development')}</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 sm:mb-6 animate-fade-in px-2">
            <span className="gradient-text animate-tech-glow drop-shadow-lg">{t('platform.title')}</span>{' '}
            <span className="text-white drop-shadow-md">{t('platform.platform')}</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in px-4">
            {t('platform.description')}
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in px-2">
            <div className="flex items-center justify-center space-x-3 p-3 sm:p-4 bg-andeda-gradient-subtle backdrop-blur-sm rounded-lg border border-andeda-blue/20 hover:bg-andeda-gradient transition-all duration-300 md:hover:scale-105 hover:shadow-glow">
              <AnimatedIcon icon={Database} className="w-4 sm:w-5 h-4 sm:h-5 text-andeda-blue" animation="pulse-scale" />
              <span className="text-xs sm:text-sm font-medium text-white">{t('platform.features.realtime')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-3 sm:p-4 bg-andeda-gradient-subtle backdrop-blur-sm rounded-lg border border-andeda-green/20 hover:bg-andeda-gradient transition-all duration-300 md:hover:scale-105 hover:shadow-glow">
              <AnimatedIcon icon={TrendingUp} className="w-4 sm:w-5 h-4 sm:h-5 text-andeda-green" animation="pulse-scale" />
              <span className="text-xs sm:text-sm font-medium text-white">{t('platform.features.visualizations')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-3 sm:p-4 bg-andeda-gradient-subtle backdrop-blur-sm rounded-lg border border-andeda-blue/20 hover:bg-andeda-gradient transition-all duration-300 md:hover:scale-105 hover:shadow-glow">
              <AnimatedIcon icon={Zap} className="w-4 sm:w-5 h-4 sm:h-5 text-andeda-blue" animation="pulse-scale" />
              <span className="text-xs sm:text-sm font-medium text-white">{t('analytics.capabilities.dataProtection')}</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="animate-fade-in">
            <Link to="/analytics">
              <Button 
                variant="gradient" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover:shadow-glow transform md:hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                {t('platform.previewButton')}
                <AnimatedIcon icon={ArrowRight} className="ml-2 w-4 sm:w-5 h-4 sm:h-5" animation="pulse-scale" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              {t('platform.joinPreview')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};