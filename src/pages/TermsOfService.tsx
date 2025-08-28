import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, FileText, Scale, Shield, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';

// Static date for terms - update this manually when the terms are updated
const TERMS_OF_SERVICE_LAST_UPDATED = 'June 15, 2025';

const TermsOfService = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="fixed top-32 right-16 w-80 h-80 bg-andeda-green/10 rounded-full blur-3xl animate-zoom pointer-events-none" />
      <div className="fixed bottom-40 left-16 w-96 h-96 bg-andeda-blue/10 rounded-full blur-3xl animate-zoom pointer-events-none" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <Header />
        <SEO title={t('termsOfService.title')} description={t('termsOfService.subtitle')} />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-andeda-gradient-dark relative overflow-hidden">
            <div className="absolute inset-0 glass-effect" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="animate-fade-in">
                  <h1 className="mixed-heading-hero mb-6 leading-tight animate-pulse-glow">
                    <span className="gradient-text">{t('termsOfService.title')}</span>
                  </h1>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    {t('termsOfService.subtitle')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('termsOfService.lastUpdated', { date: TERMS_OF_SERVICE_LAST_UPDATED })}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms Content */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Agreement to Terms */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={FileText} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.agreementToTerms.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {t('termsOfService.sections.agreementToTerms.description')}
                    </p>
                    <p className="text-muted-foreground">
                      {t('termsOfService.sections.agreementToTerms.additionalInfo')}
                    </p>
                  </CardContent>
                </Card>

                {/* Services Description */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={CheckCircle} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.servicesDescription.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t('termsOfService.sections.servicesDescription.description')}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('termsOfService.sections.servicesDescription.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      {t('termsOfService.sections.servicesDescription.additionalInfo')}
                    </p>
                  </CardContent>
                </Card>

                {/* User Responsibilities */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Scale} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.userResponsibilities.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t('termsOfService.sections.userResponsibilities.description')}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('termsOfService.sections.userResponsibilities.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Data and Confidentiality */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Shield} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.dataConfidentiality.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.dataConfidentiality.clientDataProtection.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.dataConfidentiality.clientDataProtection.description')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.dataConfidentiality.nonDisclosure.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.dataConfidentiality.nonDisclosure.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Terms */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={DollarSign} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.paymentTerms.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('termsOfService.sections.paymentTerms.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Intellectual Property */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Scale} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.intellectualProperty.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.intellectualProperty.andedaProperty.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.intellectualProperty.andedaProperty.description')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.intellectualProperty.clientProperty.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.intellectualProperty.clientProperty.description')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.intellectualProperty.deliverables.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.intellectualProperty.deliverables.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Limitations */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Clock} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.serviceLimitations.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('termsOfService.sections.serviceLimitations.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Disclaimers */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={AlertTriangle} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.disclaimers.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.disclaimers.serviceWarranty.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.disclaimers.serviceWarranty.description')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{t('termsOfService.sections.disclaimers.limitationOfLiability.title')}</h4>
                      <p className="text-muted-foreground">
                        {t('termsOfService.sections.disclaimers.limitationOfLiability.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Termination */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={AlertTriangle} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.termination.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {t('termsOfService.sections.termination.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      {(t('termsOfService.sections.termination.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Governing Law */}
                <Card className="glass-effect gradient-border hover:shadow-neon transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-andeda-gradient rounded-xl flex items-center justify-center">
                        <AnimatedIcon icon={Scale} className="w-6 h-6 text-white" animation="zoom-blink" />
                      </div>
                      <span className="gradient-text">{t('termsOfService.sections.governingLaw.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t('termsOfService.sections.governingLaw.description')}
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
                      <span className="gradient-text">{t('termsOfService.sections.contact.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {t('termsOfService.sections.contact.description')}
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
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TermsOfService;