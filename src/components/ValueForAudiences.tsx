import { useTranslation } from 'react-i18next';
import { ProblemSolutionMatrix } from '@/components/ProblemSolutionMatrix';
import { MarketFocusSection } from '@/components/MarketFocusSection';

export const ValueForAudiences = ({ showHeader = true }: { showHeader?: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {showHeader && (
        <header className="mb-8 md:mb-10 text-center">
          <h2 className="mixed-heading-section mb-2 px-2">
            <span className="gradient-text animate-tech-glow">{t('audiences.title', 'Who we serve')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            {t('audiences.subtitle', 'How our analytics turns into real, simple results')}
          </p>
          <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
            {t('audiences.description', 'Clear outcomes for financial institutions, startups, government and academic institutions, SMEs, and NGOs & Nonprofits across finance, healthcare, and retail.')}
          </p>
        </header>
      )}

      <section className="space-y-6 md:space-y-8">
        <ProblemSolutionMatrix />
      </section>

      <section className="mt-10 md:mt-12 space-y-6 md:space-y-8">
        <MarketFocusSection />
      </section>
    </div>
  );
};