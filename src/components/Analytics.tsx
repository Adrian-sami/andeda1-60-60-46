import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Activity, Eye, ArrowRight, PieChart, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Progress } from '@/components/ui/progress';

export const Analytics = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const capabilities = [
    { label: t('analytics.capabilities.dataProcessingSpeed'), value: 85, metric: t('analytics.capabilities.ultraFastReliable') },
    { label: t('analytics.capabilities.dashboardPerformance'), value: 90, metric: t('analytics.capabilities.realTimeUpdates') },
    { label: t('analytics.capabilities.platformUptime'), value: 99, metric: t('analytics.capabilities.alwaysAvailable') },
    { label: t('analytics.capabilities.dataSecurity'), value: 95, metric: t('analytics.capabilities.enterpriseGrade') },
    { label: t('analytics.capabilities.userExperience'), value: 88, metric: t('analytics.capabilities.intuitiveDesign') },
    { label: t('analytics.capabilities.integrationCapability'), value: 80, metric: t('analytics.capabilities.multipleSources') }
  ];
  
  return (
    <section className="py-20 bg-andeda-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h3 className="mixed-heading-section mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="black-text">{t('analytics.completeAnalyticsSuite')} </span><span className="gradient-text">Suite</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              {t('analytics.transformBusinessIntelligence')}
            </p>
            
            <div className="space-y-6">
              {capabilities.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-lg font-bold text-andeda-blue">{item.metric}</span>
                  </div>
                  <Progress value={item.value} className="h-3" />
                </div>
              ))}
            </div>

            {/* Service Descriptions */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-card border border-border shadow-sm">
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="w-5 h-5 text-andeda-blue mt-1 flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">{t('services.dataAnalytics.subServices.performanceAnalysis.title')}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('services.dataAnalytics.subServices.performanceAnalysis.description')}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border border-border shadow-sm">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-andeda-green mt-1 flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">{t('services.dataAnalytics.subServices.forecasting.title')}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('services.dataAnalytics.subServices.forecasting.description')}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border border-border shadow-sm">
                  <div className="flex items-start space-x-3">
                    <PieChart className="w-5 h-5 text-andeda-blue mt-1 flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">{t('services.dataAnalytics.subServices.visualReporting.title')}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('services.dataAnalytics.subServices.visualReporting.description')}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border border-border shadow-sm">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-andeda-green mt-1 flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">{t('services.dataAnalytics.subServices.customReporting.title')}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('services.dataAnalytics.subServices.customReporting.description')}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Mock Dashboard Preview */}
            <Card className="group bg-card/80 backdrop-blur-sm border border-border/50 mb-6 transition-all duration-500 hover:shadow-elegant hover:shadow-glow hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="mixed-heading-subsection">
                    <span className="gradient-text">{t('analytics.analyticsPreview')}</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">{t('analytics.liveDemo')}</span>
                  </div>
                </div>
                
                {/* Mock Chart Area */}
                <div className="h-48 bg-gradient-to-br from-andeda-green/10 to-andeda-blue/10 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/10 bg-grid-8"></div>
                  <div className="relative z-10 text-center">
                    <BarChart3 className="w-16 h-16 text-andeda-green/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t('analytics.interactiveChartsComingSoon')}</p>
                  </div>
                  
                  {/* Animated Data Points */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    {[...Array(6)].map((_, index) => (
                      <div 
                        key={index}
                        className="w-4 bg-andeda-green/60 rounded-t transition-all duration-1000"
                         style={{ 
                          height: `${20 + (index * 8)}px`
                         }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-andeda-green/10 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-andeda-green mr-1" />
                      <span className="text-lg font-bold">42%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('analytics.growth')}</p>
                  </div>
                  <div className="text-center p-3 bg-andeda-blue/10 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Activity className="w-4 h-4 text-andeda-blue mr-1" />
                      <span className="text-lg font-bold">1.2k</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('analytics.users')}</p>
                  </div>
                  <div className="text-center p-3 bg-andeda-green/10 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <BarChart3 className="w-4 h-4 text-andeda-green mr-1" />
                      <span className="text-lg font-bold">98%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('analytics.accuracy')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="text-center space-y-4">
              <Button 
                onClick={() => navigate('/analytics')} 
                variant="gradient" 
                size="lg"
                className="w-full group"
              >
                <Eye className="mr-2 w-5 h-5" />
                {t('analytics.viewFullPlatform')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline" 
                size="lg"
                className="w-full"
              >
                {t('analytics.requestDemo')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};