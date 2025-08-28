import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import dashboard1 from '@/assets/dashboard-1.jpg';
import dashboard2 from '@/assets/dashboard-2.jpg';
import dashboard3 from '@/assets/dashboard-3.jpg';
import dashboard4 from '@/assets/dashboard-4.jpg';

// Dashboard data will be generated from translation keys
const getDashboardData = (t: any) => [
  {
    id: 1,
    image: dashboard1,
    title: t('gallery.dashboard1.title'),
    summary: t('gallery.dashboard1.summary'),
    outcome: t('gallery.dashboard1.outcome'),
    benefits: t('gallery.dashboard1.benefits')
  },
  {
    id: 2,
    image: dashboard2,
    title: t('gallery.dashboard2.title'),
    summary: t('gallery.dashboard2.summary'),
    outcome: t('gallery.dashboard2.outcome'),
    benefits: t('gallery.dashboard2.benefits')
  },
  {
    id: 3,
    image: dashboard3,
    title: t('gallery.dashboard3.title'),
    summary: t('gallery.dashboard3.summary'),
    outcome: t('gallery.dashboard3.outcome'),
    benefits: t('gallery.dashboard3.benefits')
  },
  {
    id: 4,
    image: dashboard4,
    title: t('gallery.dashboard4.title'),
    summary: t('gallery.dashboard4.summary'),
    outcome: t('gallery.dashboard4.outcome'),
    benefits: t('gallery.dashboard4.benefits')
  }
];

export const DashboardGallery = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dashboards = getDashboardData(t);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dashboards.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === dashboards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentDashboard = dashboards[currentIndex];

  return (
    <section className="py-20 bg-andeda-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl gradient-heading mb-6">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-lg overflow-hidden shadow-elegant">
            {/* Main Image */}
            <div className="relative aspect-video">
              <img
                src={currentDashboard.image}
                alt={`${currentDashboard.title} - Interactive business analytics dashboard`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background border-border/50 hover:border-border"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background border-border/50 hover:border-border"
                onClick={goToNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dashboard Info */}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl gradient-heading">
                {currentDashboard.title}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('gallery.projectSummary')}</h4>
                  <p className="text-muted-foreground">
                    {currentDashboard.summary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('gallery.outcomeAchieved')}</h4>
                  <p className="text-muted-foreground">
                    {currentDashboard.outcome}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('gallery.keyBenefits')}</h4>
                  <p className="text-muted-foreground">
                    {currentDashboard.benefits}
                  </p>
                </div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2">
                {dashboards.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-andeda-blue'
                        : 'bg-muted hover:bg-muted-foreground'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Project Counter */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              {t('gallery.projectCounter', { current: currentIndex + 1, total: dashboards.length })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};