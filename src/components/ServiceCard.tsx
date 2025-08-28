import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MessageCircle, CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';

interface SubService {
  title: string;
  description: string;
  benefits: Array<{
    text: string;
    icon: LucideIcon;
  }>;
  icon: LucideIcon;
}

interface ServiceCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  subServices: SubService[];
  isExpanded?: boolean;
  onToggle?: (serviceId: string, currentState: boolean) => void;
}

export const ServiceCard = ({ id, icon: IconComponent, title, description, subServices, isExpanded: controlledExpanded, onToggle }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [internalExpanded, setInternalExpanded] = useState(true);

  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  useEffect(() => {
    // Check if this card should be expanded based on URL hash (only for internal state)
    if (controlledExpanded === undefined) {
      const hash = window.location.hash.replace('#', '');
      if (hash === id) {
        setInternalExpanded(true);
      }
    }
  }, [id, controlledExpanded]);

  return (
    <Card className="group h-full flex flex-col transition-colors duration-300 border-border/50 cursor-pointer overflow-hidden">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-3">
          <AnimatedIcon icon={IconComponent} className="w-8 h-8 text-white" animation="zoom-blink" />
        </div>
        <CardTitle className="text-xl lg:text-2xl gradient-heading mb-3">{title}</CardTitle>
        <p className="text-muted-foreground text-sm lg:text-base mb-4 leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col">
        <Button 
          variant="gradient-minimal"
          className="w-full mb-3 hover:scale-100 focus:scale-100 active:scale-100 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2"
          onClick={() => {
            if (onToggle) {
              // Controlled mode (mobile/tablet)
              onToggle(id, isExpanded);
              // Scroll to card title after expansion
              if (!isExpanded) {
                setTimeout(() => {
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }
            } else {
              // Uncontrolled mode (desktop)
              setInternalExpanded(!isExpanded);
            }
          }}
        >
          {isExpanded ? (
            <AnimatedIcon icon={ChevronUp} className="w-4 h-4 md:ml-2 md:order-2" animation="pulse-scale" />
          ) : (
            <AnimatedIcon icon={ChevronDown} className="w-4 h-4 md:ml-2 md:order-2" animation="pulse-scale" />
          )}
          <span className="md:order-1">
            {isExpanded ? t('common.showLess') : t('common.learnMore')}
          </span>
        </Button>

        {isExpanded && (
          <div className="space-y-6 animate-fade-in flex-1 flex flex-col">
            <div className="flex-1 space-y-6">
              {subServices.map((service, index) => (
                <div key={index} className="border-l-2 border-andeda-green/30 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon icon={service.icon} className="w-4 h-4 text-andeda-green" animation="pulse-scale" />
                    <h4 className="gradient-heading text-sm lg:text-base">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-foreground">{t('services.walkAwayWith')}:</p>
                    <ul className="space-y-1">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <AnimatedIcon icon={benefit.icon} className="w-3 h-3 text-andeda-green mr-2 mt-0.5 flex-shrink-0" animation="zoom-blink" />
                          <span className="text-xs text-muted-foreground leading-relaxed">{benefit.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Book Now Button at the bottom */}
            <div className="pt-4 border-t border-border/30 mt-auto">
              <Button 
                variant="gradient"
                className="w-full text-base font-semibold py-3 transition-colors duration-300"
                onClick={() => {
                  const details = subServices.map(service => `• ${service.title}: ${service.description}`).join('\n');
                  const message = t('common.whatsappMessage.serviceSpecific')
                    .replace('{service}', title)
                    .replace('{details}', details);
                  const whatsappUrl = `https://wa.me/240222108272?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <MessageCircle className="w-5 h-5 animate-pulse text-white" />
                <span className="ml-2 tracking-wide">{t('common.bookNow')}</span>
                <span className="ml-2 animate-bounce">✨</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};