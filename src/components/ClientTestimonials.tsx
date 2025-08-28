import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Building, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  content: string;
  rating: number;
  results: string;
  image?: string;
}

export const ClientTestimonials = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    slidesToScroll: 1
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get testimonials from translations
  const testimonials = t('testimonials.data', { returnObjects: true }) as Testimonial[];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Auto-scroll every 6 seconds
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);

    return () => {
      clearInterval(autoScroll);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-3">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <blockquote className="text-foreground mb-6 flex-grow leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Results Badge */}
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                          {testimonial.results}
                        </Badge>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-semibold text-foreground text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Building className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">
                              {testimonial.company}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {testimonial.industry}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator with Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Left Navigation Button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-200"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>

            {/* Right Navigation Button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-200"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{t('testimonials.stats.satisfaction.value')}</div>
            <div className="text-sm text-muted-foreground">{t('testimonials.stats.satisfaction.label')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{t('testimonials.stats.projects.value')}</div>
            <div className="text-sm text-muted-foreground">{t('testimonials.stats.projects.label')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{t('testimonials.stats.efficiency.value')}</div>
            <div className="text-sm text-muted-foreground">{t('testimonials.stats.efficiency.label')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{t('testimonials.stats.countries.value')}</div>
            <div className="text-sm text-muted-foreground">{t('testimonials.stats.countries.label')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};