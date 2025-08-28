import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  PieChart,
  Gauge,
  Eye,
  Shield,
  Cpu,
  Database,
  Zap,
  Globe,
  Settings,
  Layers,
  Target,
  Clock,
  Sparkles,
  Workflow,
  Brain,
  Lock,
  RefreshCw,
  LineChart,
  Upload,
  FileSpreadsheet,
  Edit3,
  UserPlus,
  FileText
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';

const getUpcomingFeatures = (t: (key: string) => string) => [
  {
    title: t('analytics.features.realTimeDashboard.title'),
    description: t('analytics.features.realTimeDashboard.description'),
    icon: Zap,
    status: t('analytics.features.earlyDevelopment'),
    progress: 15,
    color: 'text-andeda-green',
    bgColor: 'bg-andeda-green/10'
  },
  {
    title: t('analytics.features.customerManagement.title'),
    description: t('analytics.features.customerManagement.description'),
    icon: UserPlus,
    status: t('analytics.features.planningPhase'),
    progress: 8,
    color: 'text-andeda-blue',
    bgColor: 'bg-andeda-blue/10'
  },
  {
    title: t('analytics.features.dataImport.title'),
    description: t('analytics.features.dataImport.description'),
    icon: Upload,
    status: t('analytics.features.initialDevelopment'),
    progress: 12,
    color: 'text-andeda-green',
    bgColor: 'bg-andeda-green/10'
  },
  {
    title: t('analytics.features.excelIntegration.title'),
    description: t('analytics.features.excelIntegration.description'),
    icon: FileSpreadsheet,
    status: t('analytics.features.researchPhase'),
    progress: 5,
    color: 'text-andeda-blue',
    bgColor: 'bg-andeda-blue/10'
  },
  {
    title: t('analytics.features.dataEntry.title'),
    description: t('analytics.features.dataEntry.description'),
    icon: Edit3,
    status: t('analytics.features.designPhase'),
    progress: 20,
    color: 'text-andeda-green',
    bgColor: 'bg-andeda-green/10'
  },
  {
    title: t('analytics.features.smartInsights.title'),
    description: t('analytics.features.smartInsights.description'),
    icon: Brain,
    status: t('analytics.features.researchPhase'),
    progress: 10,
    color: 'text-andeda-blue',
    bgColor: 'bg-andeda-blue/10'
  },
  {
    title: t('analytics.features.customViews.title'),
    description: t('analytics.features.customViews.description'),
    icon: Layers,
    status: t('analytics.features.planningPhase'),
    progress: 18,
    color: 'text-andeda-green',
    bgColor: 'bg-andeda-green/10'
  },
  {
    title: t('analytics.features.dataSecurity.title'),
    description: t('analytics.features.dataSecurity.description'),
    icon: Lock,
    status: t('analytics.features.planningPhase'),
    progress: 7,
    color: 'text-andeda-blue',
    bgColor: 'bg-andeda-blue/10'
  },
  {
    title: t('analytics.features.globalAccess.title'),
    description: t('analytics.features.globalAccess.description'),
    icon: Globe,
    status: t('analytics.features.researchPhase'),
    progress: 3,
    color: 'text-andeda-green',
    bgColor: 'bg-andeda-green/10'
  }
];

const potentialCapabilities = (t: (key: string) => string) => [
  { label: t('analytics.capabilities.dataProcessing'), value: 75, metric: t('analytics.capabilities.fastReliable') },
  { label: t('analytics.capabilities.dashboardSpeed'), value: 80, metric: t('analytics.capabilities.instantUpdates') },
  { label: t('analytics.capabilities.platformUptime'), value: 85, metric: t('analytics.capabilities.alwaysAvailable') },
  { label: t('analytics.capabilities.dataProtection'), value: 90, metric: t('analytics.capabilities.completelySecure') },
  { label: t('analytics.capabilities.userExperience'), value: 70, metric: t('analytics.capabilities.simpleIntuitive') },
  { label: t('analytics.capabilities.dataSources'), value: 65, metric: t('analytics.capabilities.multipleConnections') }
];

const mockAnalyticsData = [
  { name: 'Jan', value: 4000, growth: 12 },
  { name: 'Feb', value: 3000, growth: 8 },
  { name: 'Mar', value: 5000, growth: 25 },
  { name: 'Apr', value: 4500, growth: 18 },
  { name: 'May', value: 6000, growth: 33 },
  { name: 'Jun', value: 5500, growth: 22 }
];

const Analytics = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [currentDataPoint, setCurrentDataPoint] = useState(0);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  
  const features = getUpcomingFeatures(t);
  const capabilities = potentialCapabilities(t);

  // Check if modal should appear (10 minutes = 600000ms)
  useEffect(() => {
    const modalKey = 'waitlist-modal-dismissed';
    const lastDismissed = localStorage.getItem(modalKey);
    
    if (!lastDismissed) {
      // First visit - show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsWaitlistModalOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const timeSinceDismissed = Date.now() - parseInt(lastDismissed);
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
      
      if (timeSinceDismissed >= thirtyMinutes) {
        // Show modal after 30 minutes have passed
        const timer = setTimeout(() => {
          setIsWaitlistModalOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    // Animate progress bars
    const progressInterval = setInterval(() => {
      setAnimatedProgress(prev => (prev < 100 ? prev + 1 : 0));
    }, 50);

    // Animate data points
    const dataInterval = setInterval(() => {
      setCurrentDataPoint(prev => (prev + 1) % mockAnalyticsData.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const handleJoinWaitlist = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleModalClose = () => {
    setIsWaitlistModalOpen(false);
    // Save dismiss time to localStorage
    localStorage.setItem('waitlist-modal-dismissed', Date.now().toString());
  };

  const handlePreviewDashboard = () => {
    toast("🔧 Dashboard Preview Coming Soon!", {
      description: "We're working hard to build your personalized analytics dashboard. Join the waitlist to be the first to know when it's ready and get exclusive early access!",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background relative w-full overflow-x-hidden">
      <Header />
      <SEO title="Analytics Platform — ANDEDA" description={t('analytics.description')} />
      <main className="pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-20 bg-andeda-gradient-subtle relative overflow-x-hidden overflow-y-visible">
          {/* Floating Animation Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-2 sm:left-4 md:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-andeda-green/10 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-2 sm:right-4 md:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-andeda-blue/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-andeda-green/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-14 sm:w-16 h-14 sm:h-16 bg-andeda-blue/5 rounded-full animate-pulse"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 md:space-x-3 bg-yellow-500/20 border border-yellow-500/30 px-3 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base lg:text-lg font-semibold mb-6 md:mb-8 mt-8 md:mt-12 animate-pulse shadow-lg">
                <Settings className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-yellow-500" />
                <span className="text-yellow-600 font-bold">{t('analytics.underDevelopment')}</span>
              </div>
              
              <div className="animate-fade-in">
                <h1 className="mixed-heading-hero mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="black-text">{t('analytics.title')} </span><span className="gradient-text animate-tech-glow drop-shadow-lg">{t('platform.platform')}</span>
                </h1>
              </div>
              
              <div className="animate-slide-up">
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('analytics.description')}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up">
                <div className="flex items-center space-x-2 bg-andeda-gradient/10 px-4 py-2 rounded-full text-sm font-medium">
                  <RefreshCw className="w-4 h-4 text-andeda-green animate-spin" />
                  <span>{t('analytics.buildingPlatform')}</span>
                </div>
                <div className="flex items-center space-x-2 bg-andeda-gradient/10 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-andeda-blue" />
                  <span>{t('analytics.personalizedAnalytics')}</span>
                </div>
                <div className="flex items-center space-x-2 bg-andeda-gradient/10 px-4 py-2 rounded-full text-sm font-medium">
                  <Target className="w-4 h-4 text-andeda-green" />
                  <span>{t('analytics.yourDataYourInsights')}</span>
                </div>
              </div>

              <div className="animate-slide-up">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="text-lg px-8 py-4 w-full sm:w-auto"
                    onClick={handleJoinWaitlist}
                  >
                    {t('analytics.joinWaitlist')}
                    <Clock className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-4 w-full sm:w-auto"
                    onClick={handlePreviewDashboard}
                  >
                    {t('analytics.previewDashboard')}
                    <Eye className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="py-10 sm:py-12 md:py-16 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="mixed-heading-section mb-4">
                  <span className="black-text">{t('analytics.whatYouGet')} </span><span className="gradient-text">{t('analytics.whenReady')}</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('analytics.buildingDescription')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-elegant transition-all duration-500 md:hover:scale-105 border-border/50">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 animate-pulse`}>
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      
                      <h3 className="mixed-heading-subsection mb-2">
                        <span className="gradient-text">{feature.title}</span>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{t('analytics.features.status')}: {feature.status}</span>
                          <span className="text-sm font-bold text-andeda-blue">{feature.progress}%</span>
                        </div>
                        <Progress value={feature.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Platform Capabilities Preview */}
        <section className="py-12 sm:py-16 md:py-20 bg-andeda-gradient-subtle overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="mixed-heading-section mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="black-text">{t('analytics.completeAnalyticsSuite')} </span><span className="gradient-text">{t('analytics.analyticsSuite')}</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('analytics.analyticsSuiteDescription')}
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
              </div>

              <div className="relative overflow-hidden">
                {/* Mock Dashboard Preview */}
                <Card className="group bg-card/80 backdrop-blur-sm border border-border/50 mb-6 transition-all duration-500 hover:shadow-elegant hover:shadow-glow lg:hover:scale-105 lg:hover:-translate-y-2 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="mixed-heading-subsection">
                        <span className="gradient-text">{t('analytics.analyticsPreview')}</span>
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">{t('analytics.previewMode')}</span>
                      </div>
                    </div>
                    
                    {/* Mock Chart Area */}
                    <div className="h-48 bg-gradient-to-br from-andeda-green/10 to-andeda-blue/10 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-white/10 bg-grid-8"></div>
                      <div className="relative z-10 text-center">
                        <BarChart3 className="w-16 h-16 text-andeda-green/50 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{t('analytics.chartsComingSoon')}</p>
                      </div>
                      
                      {/* Animated Data Points */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        {mockAnalyticsData.map((_, index) => (
                          <div 
                            key={index}
                            className={`w-6 rounded-t transition-all duration-1000 ${
                              index === currentDataPoint ? 'bg-andeda-green' : 'bg-andeda-blue/30'
                            }`}
                            style={{ 
                              height: `${20 + (index * 8)}px`,
                              transform: index === currentDataPoint ? 'scale(1.2)' : 'scale(1)'
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
                        <p className="text-xs text-muted-foreground">{t('analytics.yourGrowth')}</p>
                      </div>
                      <div className="text-center p-3 bg-andeda-blue/10 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-andeda-blue mr-1" />
                          <span className="text-lg font-bold">1.2k</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('analytics.yourCustomers')}</p>
                      </div>
                      <div className="text-center p-3 bg-andeda-green/10 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Database className="w-4 h-4 text-andeda-green mr-1" />
                          <span className="text-lg font-bold">98%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('analytics.yourDataQuality')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Development Notice */}
                <Card className="bg-yellow-500/10 border border-yellow-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-yellow-500">{t('analytics.platformInDevelopment')}</p>
                        <p className="text-xs text-muted-foreground">{t('analytics.personalizedExperience')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What's Coming Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="mixed-heading-section mb-6">
                <span className="black-text">{t('analytics.professionalBI')} </span>
                <span className="gradient-text animate-tech-glow drop-shadow-lg">{t('analytics.businessIntelligence')}</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                {t('analytics.biDescription')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group text-center p-6 rounded-lg bg-andeda-green/5 hover:bg-andeda-green/10 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 hover:shadow-elegant cursor-pointer">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mixed-heading-subsection mb-2">
                    <span className="gradient-text">{t('analytics.liveDashboard')}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">{t('analytics.watchBusinessData')}</p>
                </div>

                <div className="group text-center p-6 rounded-lg bg-andeda-blue/5 hover:bg-andeda-blue/10 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 hover:shadow-elegant cursor-pointer">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mixed-heading-subsection mb-2">
                    <span className="gradient-text">{t('analytics.smartSuggestions')}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">{t('analytics.personalizedInsights')}</p>
                </div>

                <div className="group text-center p-6 rounded-lg bg-andeda-green/5 hover:bg-andeda-green/10 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 hover:shadow-elegant cursor-pointer">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mixed-heading-subsection mb-2 break-words">
                    <span className="gradient-text">{t('analytics.capabilities.dataProtection')}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words whitespace-normal">{t('analytics.businessDataSecure')}</p>
                </div>

                <div className="group text-center p-6 rounded-lg bg-andeda-blue/5 hover:bg-andeda-blue/10 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 hover:shadow-elegant cursor-pointer">
                  <div className="w-16 h-16 bg-andeda-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mixed-heading-subsection mb-2">
                    <span className="gradient-text">{t('analytics.globalAccess')}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">{t('analytics.accessFromAnywhere')}</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-andeda-green/10 to-andeda-blue/10 rounded-2xl border border-border/50">
                <h3 className="mixed-heading-subsection mb-4">
                  <span className="gradient-text">{t('analytics.getEarlyAccess')}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('analytics.joinWaitlistDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gradient" size="lg" onClick={handleJoinWaitlist}>
                    {t('analytics.joinWaitlist')}
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={handleModalClose} 
      />
    </div>
  );
};

export default Analytics;