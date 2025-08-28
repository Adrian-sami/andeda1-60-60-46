import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Shield, Eye, Lock, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';

// Static date for policy - update this manually when the policy is updated
const PRIVACY_POLICY_LAST_UPDATED = 'June 15, 2025';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="fixed top-32 right-16 w-80 h-80 bg-andeda-green/10 rounded-full blur-3xl animate-zoom pointer-events-none" />
      <div className="fixed bottom-40 left-16 w-96 h-96 bg-andeda-blue/10 rounded-full blur-3xl animate-zoom pointer-events-none" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <Header />
        <SEO title={t('privacyPolicy.title')} description={t('privacyPolicy.subtitle')} />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-andeda-gradient-dark relative overflow-hidden">
            <div className="absolute inset-0 glass-effect" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="animate-fade-in">
                  <h1 className="mixed-heading-hero mb-6 leading-tight animate-pulse-glow">
                    <span className="gradient-text">{t('privacyPolicy.title')}</span>
                  </h1>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    {t('privacyPolicy.subtitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('privacyPolicy.lastUpdated', { date: PRIVACY_POLICY_LAST_UPDATED })}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy Content */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Information We Collect */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Eye} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.informationWeCollect.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('privacyPolicy.sections.informationWeCollect.personalInfo.title')}</h4>
                      <p className="text-muted-foreground mb-3">{t('privacyPolicy.sections.informationWeCollect.personalInfo.description')}</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        {(t('privacyPolicy.sections.informationWeCollect.personalInfo.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('privacyPolicy.sections.informationWeCollect.businessData.title')}</h4>
                      <p className="text-muted-foreground mb-3">{t('privacyPolicy.sections.informationWeCollect.businessData.description')}</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        {(t('privacyPolicy.sections.informationWeCollect.businessData.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* How We Use Information */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={FileText} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.howWeUse.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t('privacyPolicy.sections.howWeUse.description')}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('privacyPolicy.sections.howWeUse.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Protection */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Lock} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.dataProtection.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.sections.dataProtection.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('privacyPolicy.sections.dataProtection.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Sharing */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Shield} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.dataSharing.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {t('privacyPolicy.sections.dataSharing.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('privacyPolicy.sections.dataSharing.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Your Rights */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={CheckCircle} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.yourRights.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t('privacyPolicy.sections.yourRights.description')}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('privacyPolicy.sections.yourRights.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Retention */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Calendar} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.dataRetention.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {t('privacyPolicy.sections.dataRetention.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('privacyPolicy.sections.dataRetention.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* International Transfers */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={AlertCircle} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.internationalTransfers.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.sections.internationalTransfers.description')}
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500 bg-andeda-gradient/5">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Mail} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('privacyPolicy.sections.contact.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.sections.contact.description')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-andeda-blue" />
                        <div>
                          <p className="font-medium">{t('common.email')}</p>
                          <a href="mailto:andeda1@outlook.com" className="text-andeda-blue hover:underline">
                            andeda1@outlook.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-andeda-green" />
                        <div>
                          <p className="font-medium">{t('common.phone')}</p>
                          <a href="tel:+240222108272" className="text-andeda-green hover:underline">
                            +240 222 108 272
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 md:col-span-2">
                        <MapPin className="w-5 h-5 text-andeda-blue mt-1" />
                        <div>
                          <p className="font-medium">{t('common.office')}</p>
                          <p className="text-muted-foreground">
                            {t('footer.contactInfo.location.line1')}<br />
                            {t('footer.contactInfo.location.line2')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Policy Updates */}
                <Card className="glass-effect gradient-border border-andeda-blue/30">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>{t('privacyPolicy.sections.policyUpdates.title')}:</strong> {t('privacyPolicy.sections.policyUpdates.description')}
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

export default PrivacyPolicy;