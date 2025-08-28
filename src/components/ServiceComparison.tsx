import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, BarChart3, TrendingUp, DollarSign, Users, Clock, Target, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CurrencySelector, Currency, currencies } from '@/components/CurrencySelector';
import { Label } from '@/components/ui/label';
import { openBookingSystem } from '@/lib/booking';

interface ServiceFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface ServicePlan {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  price: string;
  timeline: string;
  complexity: string;
  teamSize: string;
  bestFor: string;
  features: ServiceFeature[];
  deliverables: string[];
}

const getServicePlans = (t: any): ServicePlan[] => [
  {
    id: 'data-analytics',
    name: t('services.dataAnalytics.title'),
    description: t('services.dataAnalytics.description'),
    icon: BarChart3,
    color: 'blue',
    price: '$5,000 - $15,000',
    timeline: '2-4 weeks',
    complexity: t('serviceComparison.plans.dataAnalytics.complexity'),
    teamSize: t('serviceComparison.plans.dataAnalytics.teamSize'),
    bestFor: t('serviceComparison.plans.dataAnalytics.bestFor'),
    features: [
      { name: t('serviceComparison.features.performanceAnalysis'), included: true, description: t('serviceComparison.features.performanceAnalysisDesc') },
      { name: t('serviceComparison.features.forecastingModels'), included: true, description: t('serviceComparison.features.forecastingModelsDesc') },
      { name: t('serviceComparison.features.customDashboards'), included: true, description: t('serviceComparison.features.customDashboardsDesc') },
      { name: t('serviceComparison.features.dataIntegration'), included: true, description: t('serviceComparison.features.dataIntegrationDesc') },
      { name: t('serviceComparison.features.strategicConsulting'), included: false },
      { name: t('serviceComparison.features.financialIntelligence'), included: false },
      { name: t('serviceComparison.features.marketResearch'), included: false },
      { name: t('serviceComparison.features.complianceReview'), included: false }
    ],
    deliverables: [
      t('serviceComparison.deliverables.dataAnalytics.dashboard'),
      t('serviceComparison.deliverables.dataAnalytics.reporting'),
      t('serviceComparison.deliverables.dataAnalytics.metrics'),
      t('serviceComparison.deliverables.dataAnalytics.integration'),
      t('serviceComparison.deliverables.dataAnalytics.training')
    ]
  },
  {
    id: 'consulting',
    name: t('services.consulting.title'),
    description: t('services.consulting.description'),
    icon: TrendingUp,
    color: 'green',
    price: '$8,000 - $25,000',
    timeline: '3-6 weeks',
    complexity: t('serviceComparison.plans.consulting.complexity'),
    teamSize: t('serviceComparison.plans.consulting.teamSize'),
    bestFor: t('serviceComparison.plans.consulting.bestFor'),
    features: [
      { name: t('serviceComparison.features.performanceAnalysis'), included: true, description: t('serviceComparison.features.performanceAnalysisDescConsulting') },
      { name: t('serviceComparison.features.forecastingModels'), included: true, description: t('serviceComparison.features.forecastingModelsDescConsulting') },
      { name: t('serviceComparison.features.customDashboards'), included: true, description: t('serviceComparison.features.customDashboardsDescConsulting') },
      { name: t('serviceComparison.features.dataIntegration'), included: true, description: t('serviceComparison.features.dataIntegrationDescConsulting') },
      { name: t('serviceComparison.features.strategicConsulting'), included: true, description: t('serviceComparison.features.strategicConsultingDesc') },
      { name: t('serviceComparison.features.financialIntelligence'), included: false },
      { name: t('serviceComparison.features.marketResearch'), included: false },
      { name: t('serviceComparison.features.complianceReview'), included: true, description: t('serviceComparison.features.complianceReviewDesc') }
    ],
    deliverables: [
      t('serviceComparison.deliverables.consulting.roadmap'),
      t('serviceComparison.deliverables.consulting.optimization'),
      t('serviceComparison.deliverables.consulting.dashboard'),
      t('serviceComparison.deliverables.consulting.monitoring'),
      t('serviceComparison.deliverables.consulting.guidelines')
    ]
  },
  {
    id: 'financial-intelligence',
    name: t('services.financialIntelligence.title'),
    description: t('services.financialIntelligence.description'),
    icon: DollarSign,
    color: 'purple',
    price: '$10,000 - $30,000',
    timeline: '4-8 weeks',
    complexity: t('serviceComparison.plans.financialIntelligence.complexity'),
    teamSize: t('serviceComparison.plans.financialIntelligence.teamSize'),
    bestFor: t('serviceComparison.plans.financialIntelligence.bestFor'),
    features: [
      { name: t('serviceComparison.features.performanceAnalysis'), included: true, description: t('serviceComparison.features.performanceAnalysisDescFinancial') },
      { name: t('serviceComparison.features.forecastingModels'), included: true, description: t('serviceComparison.features.forecastingModelsDescFinancial') },
      { name: t('serviceComparison.features.customDashboards'), included: true, description: t('serviceComparison.features.customDashboardsDescFinancial') },
      { name: t('serviceComparison.features.dataIntegration'), included: true, description: t('serviceComparison.features.dataIntegrationDescFinancial') },
      { name: t('serviceComparison.features.strategicConsulting'), included: true, description: t('serviceComparison.features.strategicConsultingDescFinancial') },
      { name: t('serviceComparison.features.financialIntelligence'), included: true, description: t('serviceComparison.features.financialIntelligenceDesc') },
      { name: t('serviceComparison.features.marketResearch'), included: false },
      { name: t('serviceComparison.features.complianceReview'), included: true, description: t('serviceComparison.features.complianceReviewDescFinancial') }
    ],
    deliverables: [
      t('serviceComparison.deliverables.financialIntelligence.assessment'),
      t('serviceComparison.deliverables.financialIntelligence.budgeting'),
      t('serviceComparison.deliverables.financialIntelligence.cashflow'),
      t('serviceComparison.deliverables.financialIntelligence.risk'),
      t('serviceComparison.deliverables.financialIntelligence.compliance')
    ]
  },
  {
    id: 'market-research',
    name: t('services.marketResearch.title'),
    description: t('services.marketResearch.description'),
    icon: Users,
    color: 'orange',
    price: '$7,000 - $20,000',
    timeline: '3-5 weeks',
    complexity: t('serviceComparison.plans.marketResearch.complexity'),
    teamSize: t('serviceComparison.plans.marketResearch.teamSize'),
    bestFor: t('serviceComparison.plans.marketResearch.bestFor'),
    features: [
      { name: t('serviceComparison.features.performanceAnalysis'), included: true, description: t('serviceComparison.features.performanceAnalysisDescMarket') },
      { name: t('serviceComparison.features.forecastingModels'), included: true, description: t('serviceComparison.features.forecastingModelsDescMarket') },
      { name: t('serviceComparison.features.customDashboards'), included: true, description: t('serviceComparison.features.customDashboardsDescMarket') },
      { name: t('serviceComparison.features.dataIntegration'), included: false },
      { name: t('serviceComparison.features.strategicConsulting'), included: true, description: t('serviceComparison.features.strategicConsultingDescMarket') },
      { name: t('serviceComparison.features.financialIntelligence'), included: false },
      { name: t('serviceComparison.features.marketResearch'), included: true, description: t('serviceComparison.features.marketResearchDesc') },
      { name: t('serviceComparison.features.complianceReview'), included: false }
    ],
    deliverables: [
      t('serviceComparison.deliverables.marketResearch.analysis'),
      t('serviceComparison.deliverables.marketResearch.insights'),
      t('serviceComparison.deliverables.marketResearch.competitive'),
      t('serviceComparison.deliverables.marketResearch.entry'),
      t('serviceComparison.deliverables.marketResearch.recommendations')
    ]
  }
];

export const ServiceComparison = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<string>('data-analytics');
  const [currency, setCurrency] = useState<Currency>(currencies[0]); // Default to USD

  const servicePlans = useMemo(() => getServicePlans(t), [t]);

  const getColorClasses = useMemo(() => (color: string, variant: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' }
    };
    return colorMap[color as keyof typeof colorMap]?.[variant] || '';
  }, []);

  const selectedPlan = servicePlans.find(plan => plan.id === selectedService);

  // Smooth scroll helper that accounts for fixed header height
  const scrollToWithHeader = (targetSelector: string, extraOffset = 16) => {
    const el = document.querySelector(targetSelector) as HTMLElement | null;
    if (!el) return;
    const header = document.querySelector('header.fixed') as HTMLElement | null;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - (headerHeight + extraOffset);
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {t('serviceComparison.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('serviceComparison.subtitle')}
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('serviceComparison.chooseService')}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
                <span>Click any service to compare details</span>
              </div>
            </div>
            <div className="space-y-3">
              {servicePlans.map((plan) => {
                const IconComponent = plan.icon;
                const isSelected = selectedService === plan.id;
                
                return (
                    <Card 
                    key={plan.id}
                    className={`cursor-pointer transition-all duration-300 hover-scale group ${
                      isSelected 
                        ? `${getColorClasses(plan.color, 'border')} ${getColorClasses(plan.color, 'bg')} shadow-lg` 
                        : 'border-border/50 hover:border-primary/40 hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedService(plan.id);
                      // Scroll to the detailed comparison section
                      setTimeout(() => {
                        scrollToWithHeader('.lg\\:col-span-2 .text-2xl', 24);
                      }, 120);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                        <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-300 ${isSelected ? 'bg-background/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                          <IconComponent className={`h-5 w-5 transition-all duration-300 ${isSelected ? getColorClasses(plan.color, 'text') : 'text-primary group-hover:scale-110'}`} />
                        </div>
                        <div className="flex-1 min-w-0 text-center md:text-left">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`font-semibold transition-colors duration-300 ${isSelected ? getColorClasses(plan.color, 'text') : 'text-foreground group-hover:text-primary'}`}>
                              {plan.name}
                            </h4>
                            {!isSelected && (
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                            )}
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {plan.description}
                          </p>
                          <div className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md inline-block">
                            Click here
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Detailed Comparison */}
          <div className="lg:col-span-2">
            {selectedPlan && (
              <Card className={`${getColorClasses(selectedPlan.color, 'border')} border-2`}>
                <CardHeader className={`${getColorClasses(selectedPlan.color, 'bg')} border-b border-border`}>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-background/20 flex-shrink-0">
                      <selectedPlan.icon className={`h-6 w-6 ${getColorClasses(selectedPlan.color, 'text')}`} />
                    </div>
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <CardTitle className="text-2xl font-bold text-foreground mb-2">
                        {selectedPlan.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base font-medium leading-relaxed">
                        {selectedPlan.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center p-3 bg-primary/5 border border-primary/20 rounded-lg flex flex-col justify-center min-h-[120px]">
                      <div className="text-sm font-semibold text-primary mb-1">{t('serviceComparison.complexity')}</div>
                      <div className="font-bold text-lg text-primary">
                        {selectedPlan.complexity}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 border border-primary/20 rounded-lg flex flex-col justify-center min-h-[120px]">
                      <div className="text-sm font-semibold text-primary mb-1">{t('serviceComparison.teamSize')}</div>
                      <div className="font-bold text-lg text-primary">
                        {selectedPlan.teamSize}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 border border-primary/20 rounded-lg flex flex-col justify-center min-h-[120px]">
                      <div className="text-sm font-semibold text-primary mb-2">{t('serviceComparison.bestFor')}</div>
                      <div className="font-semibold text-base text-primary leading-relaxed">
                        {selectedPlan.bestFor}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('serviceComparison.whatsIncluded')}
                      </h4>
                      <div className="space-y-3">
                        {selectedPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`mt-1 ${feature.included ? 'text-green-500' : 'text-muted-foreground'}`}>
                              {feature.included ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted-foreground opacity-30" />
                              )}
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {feature.name}
                              </div>
                              {feature.description && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {feature.description}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        {t('serviceComparison.keyDeliverables')}
                      </h4>
                      <div className="space-y-2">
                        {selectedPlan.deliverables.map((deliverable, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm text-foreground">{deliverable}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <Badge className={`${getColorClasses(selectedPlan.color, 'bg')} ${getColorClasses(selectedPlan.color, 'text')} mb-3`}>
                          <Clock className="h-3 w-3 mr-1" />
                          {t('serviceComparison.readyIn')} {selectedPlan.timeline}
                        </Badge>
                        <Button 
                          className="w-full mb-3 min-h-[48px] h-auto py-3 px-4 text-wrap" 
                          size="lg"
                          onClick={() => {
                            const message = t('common.whatsappMessage.serviceSpecific')
                              .replace('{service}', selectedPlan.name)
                              .replace('{details}', selectedPlan.description);
                            const whatsappUrl = `https://wa.me/240222108272?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                        >
                          <span className="text-center leading-tight">
                            {t('serviceComparison.getStarted')} {selectedPlan.name}
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          size="lg"
                          onClick={() => {
                            // Scroll back to service selection heading
                            scrollToWithHeader('.lg\\:col-span-1 h3', 24);
                          }}
                        >
                          {t('serviceComparison.chooseAnother')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('serviceComparison.customSolution')}
          </p>
          <Button variant="outline" size="lg" onClick={openBookingSystem}>
            {t('serviceComparison.scheduleCustom')}
          </Button>
        </div>
      </div>
    </section>
  );
};