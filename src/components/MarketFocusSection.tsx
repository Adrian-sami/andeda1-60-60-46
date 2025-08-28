import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, Users2, Banknote, TrendingUp, Target, 
  Clock, Star, ArrowRight, CheckCircle 
} from 'lucide-react';
import { marketSegments, differentiationStrategies } from '@/data/problemSolutionMapping';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const MarketFocusSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Get translation objects with proper typing
  const primaryDifferentiators = t('marketFocus.primaryDifferentiators', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    proof: string;
  }>;
  
  const vsInternationalFeatures = t('marketFocus.competitivePositioning.vsInternationalConsultants.opposition.features', { returnObjects: true }) as string[];
  const vsInternationalAndedaFeatures = t('marketFocus.competitivePositioning.vsInternationalConsultants.andeda.features', { returnObjects: true }) as string[];
  
  const vsLocalFeatures = t('marketFocus.competitivePositioning.vsLocalConsultants.opposition.features', { returnObjects: true }) as string[];
  const vsLocalAndedaFeatures = t('marketFocus.competitivePositioning.vsLocalConsultants.andeda.features', { returnObjects: true }) as string[];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background/80 to-muted/30">
      <div className="container mx-auto px-4">


        {/* Competitive Positioning */}
        <div className="mt-8 text-center">
          <h3 className="text-3xl font-bold mb-6 gradient-text">{t('marketFocus.howWeCompare')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-andeda-green/20 bg-card/50">
              <CardContent className="pt-6">
                <div className="space-y-6">
                   {/* Header row */}
                   <div className="flex">
                     <div className="flex-1 text-center">
                       <h4 className="font-semibold gradient-text">
                         {t('marketFocus.competitivePositioning.vsInternationalConsultants.opposition.title')}
                       </h4>
                     </div>
                     <div className="w-px bg-border mx-6"></div>
                     <div className="flex-1 text-center">
                       <h4 className="font-semibold gradient-text">
                         {t('marketFocus.competitivePositioning.vsInternationalConsultants.andeda.title')}
                       </h4>
                     </div>
                   </div>
                  
                  {/* Feature comparisons */}
                  {vsInternationalFeatures.map((oppositionFeature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1 text-center text-sm text-muted-foreground">
                        {oppositionFeature}
                      </div>
                      <div className="w-px h-6 bg-border mx-6"></div>
                      <div className="flex-1 text-center text-sm text-foreground font-medium">
                        {vsInternationalAndedaFeatures[index]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-andeda-blue/20 bg-card/50">
              <CardContent className="pt-6">
                 <div className="space-y-6">
                   {/* Header row */}
                   <div className="flex">
                     <div className="flex-1 text-center">
                       <h4 className="font-semibold gradient-text">
                         {t('marketFocus.competitivePositioning.vsLocalConsultants.opposition.title')}
                       </h4>
                     </div>
                     <div className="w-px bg-border mx-6"></div>
                     <div className="flex-1 text-center">
                       <h4 className="font-semibold gradient-text">
                         {t('marketFocus.competitivePositioning.vsLocalConsultants.andeda.title')}
                       </h4>
                     </div>
                   </div>
                  
                  {/* Feature comparisons */}
                  {vsLocalFeatures.map((oppositionFeature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1 text-center text-sm text-muted-foreground">
                        {oppositionFeature}
                      </div>
                      <div className="w-px h-6 bg-border mx-6"></div>
                      <div className="flex-1 text-center text-sm text-foreground font-medium">
                        {vsLocalAndedaFeatures[index]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};