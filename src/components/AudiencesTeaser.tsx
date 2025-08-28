import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building2, Rocket, Landmark } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';

export const AudiencesTeaser = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const goToAudiences = () => {
    const lng = (i18n.language || 'en').toLowerCase();
    navigate({ pathname: '/about', search: `?lng=${lng}` });
    // Add a small delay to ensure the page loads before scrolling
    setTimeout(() => {
      const element = document.getElementById('who-we-help');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <header className="mb-6 md:mb-8 text-center">
        <h2 className="mixed-heading-section mb-2 px-2">
          <span className="gradient-text animate-tech-glow">{t('audiences.shortTitle', 'Who we help')}</span>
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {t('audiences.subtitle')}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl glass-effect p-5 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover-scale">
            <AnimatedIcon icon={Building2} className="h-5 w-5" animation="zoom-blink" />
          </span>
          <div>
            <p className="font-medium text-foreground">{t('audiences.orgTypes.financial.title', 'Financial institutions')}</p>
            <p className="text-sm text-muted-foreground">{t('audiences.orgTypes.financial.subtitle', 'Banking • Fintech • Insurance')}</p>
          </div>
        </div>
        <div className="rounded-xl glass-effect p-5 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover-scale">
            <AnimatedIcon icon={Rocket} className="h-5 w-5" animation="zoom-blink" />
          </span>
          <div>
            <p className="font-medium text-foreground">{t('audiences.orgTypes.startups.title', 'Startups')}</p>
            <p className="text-sm text-muted-foreground">{t('audiences.orgTypes.startups.subtitle', 'Early to growth stage')}</p>
          </div>
        </div>
        <div className="rounded-xl glass-effect p-5 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover-scale">
            <AnimatedIcon icon={Landmark} className="h-5 w-5" animation="zoom-blink" />
          </span>
          <div>
            <p className="font-medium text-foreground">{t('audiences.orgTypes.government.title', 'Government')}</p>
            <p className="text-sm text-muted-foreground">{t('audiences.orgTypes.government.subtitle', 'Public sector & agencies')}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button variant="gradient" size="lg" onClick={goToAudiences}>
          {t('common.learnMore')}
        </Button>
      </div>
    </div>
  );
};
