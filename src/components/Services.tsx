import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const Services = () => {
  const { t } = useTranslation();

  const getServiceCategories = (t: (key: string) => string) => [
    {
      id: 'data-analytics',
      icon: BarChart3,
      title: t('services.dataAnalytics.title'),
      description: t('services.dataAnalytics.description')
    },
    {
      id: 'consulting',
      icon: TrendingUp,
      title: t('services.consulting.title'),
      description: t('services.consulting.description')
    },
    {
      id: 'financial-intelligence',
      icon: DollarSign,
      title: t('services.financialIntelligence.title'),
      description: t('services.financialIntelligence.description')
    },
    {
      id: 'market-research',
      icon: Users,
      title: t('services.marketResearch.title'),
      description: t('services.marketResearch.description')
    }
  ];

  const serviceCategories = useMemo(() => getServiceCategories(t), [t]);

  return (
    <section id="services" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="mixed-heading-section mb-4 sm:mb-6 px-2">
            <span className="gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{t('services.title')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Card key={category.id} className="group transition-all duration-300 hover:shadow-elegant hover:shadow-glow border-andeda-green/20 bg-card/50 backdrop-blur-sm mx-2 sm:mx-0 cursor-pointer h-full flex flex-col hover:border-andeda-blue/30">
                <CardHeader className="text-center pb-3 px-4 sm:px-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-elegant">
                    <AnimatedIcon icon={IconComponent} className="w-7 h-7 sm:w-8 sm:h-8 text-white" animation="zoom-blink" />
                  </div>
                  <CardTitle className="gradient-heading text-lg sm:text-xl mb-3 min-h-[3.5rem] flex items-center justify-center">{category.title}</CardTitle>
                  <div className="flex-1 flex items-start justify-center">
                    <p className="text-muted-foreground text-sm leading-relaxed text-center">{category.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 px-4 sm:px-6 mt-auto pb-6">
                  <Button 
                    variant="gradient"
                    className="w-full hover:shadow-elegant hover:scale-100 transition-all duration-200"
                    asChild
                  >
                    <Link to={`/services#${category.id}`}>
                      {t('common.learnMore')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};