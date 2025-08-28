import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, DollarSign, TrendingDown, Users, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BusinessInputs {
  industry: string;
  companySize: string;
  currentRevenue: string;
  growthGoals: string;
  mainChallenges: string[];
  decisionSpeed: string;
  dataMaturity: string;
}

interface CostOfInactionSectionProps {
  inputs: BusinessInputs;
  onInputChange: (field: keyof BusinessInputs, value: string | string[]) => void;
  onContinue: () => void;
}

const revenueRanges = {
  'under-1m': 500000,
  '1m-5m': 2500000,
  '5m-25m': 12500000,
  '25m-100m': 50000000,
  'over-100m': 150000000
};

const industryLossFactors = {
  'technology': { efficiency: 0.25, opportunity: 0.35, competitive: 'Tech companies without analytics lose 35% potential growth' },
  'healthcare': { efficiency: 0.20, opportunity: 0.28, competitive: 'Healthcare providers miss 28% improvement in patient outcomes' },
  'finance': { efficiency: 0.30, opportunity: 0.32, competitive: 'Financial firms face 32% higher compliance risks' },
  'retail': { efficiency: 0.28, opportunity: 0.40, competitive: 'Retailers lose 40% of personalization opportunities' },
  'manufacturing': { efficiency: 0.35, opportunity: 0.30, competitive: 'Manufacturers miss 30% efficiency optimization' },
  'education': { efficiency: 0.18, opportunity: 0.25, competitive: 'Educational institutions lag 25% in operational efficiency' },
  'construction': { efficiency: 0.32, opportunity: 0.35, competitive: 'Construction firms miss 35% project optimization' },
  'cleaning-services': { efficiency: 0.40, opportunity: 0.45, competitive: 'Service companies lose 45% route optimization benefits' },
  'agriculture': { efficiency: 0.30, opportunity: 0.38, competitive: 'Agricultural businesses miss 38% yield optimization' },
  'mining': { efficiency: 0.38, opportunity: 0.45, competitive: 'Mining operations lose 45% safety and extraction optimization' },
  'transportation': { efficiency: 0.30, opportunity: 0.35, competitive: 'Transport companies miss 35% fleet optimization' },
  'hospitality': { efficiency: 0.25, opportunity: 0.30, competitive: 'Hotels lose 30% guest experience optimization' },
  'consulting': { efficiency: 0.35, opportunity: 0.50, competitive: 'Consultants miss 50% data-driven insights opportunities' }
};

export const CostOfInactionSection = ({ inputs, onInputChange, onContinue }: CostOfInactionSectionProps) => {
  const currentRev = revenueRanges[inputs.currentRevenue as keyof typeof revenueRanges];
  const industryData = industryLossFactors[inputs.industry as keyof typeof industryLossFactors] || industryLossFactors.technology;
  
  // Calculate losses
  const baseEfficiencyLoss = 0.15 + (inputs.mainChallenges.length * 0.05);
  const monthlyLoss = (currentRev / 12) * baseEfficiencyLoss;
  const yearlyLoss = monthlyLoss * 12;
  const opportunityLoss = currentRev * industryData.opportunity;
  const totalYearlyLoss = yearlyLoss + opportunityLoss;
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <Card className="glass-effect border-destructive/30 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-6 h-6" />
          Your Current Cost of Inaction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg border border-destructive/20">
            <DollarSign className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-destructive">{formatCurrency(monthlyLoss)}</p>
            <p className="text-sm text-muted-foreground">Monthly Efficiency Loss</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg border border-destructive/20">
            <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-destructive">{formatCurrency(yearlyLoss)}</p>
            <p className="text-sm text-muted-foreground">Annual Waste</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg border border-destructive/20">
            <Users className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-destructive">{formatCurrency(opportunityLoss)}</p>
            <p className="text-sm text-muted-foreground">Missed Opportunities</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg border border-destructive/20">
            <Clock className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-destructive">{formatCurrency(totalYearlyLoss)}</p>
            <p className="text-sm text-muted-foreground">Total Annual Loss</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-destructive">What This Means for Your Business:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Badge variant="destructive" className="w-full justify-center py-2">
                Efficiency Losses
              </Badge>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Teams waste {Math.round((baseEfficiencyLoss * 40))} hours monthly on manual processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Decision delays cost {formatCurrency(monthlyLoss * 0.3)} monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Data errors leading to wrong strategic decisions</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Badge variant="destructive" className="w-full justify-center py-2">
                Competitive Disadvantage
              </Badge>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{industryData.competitive}</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Market share erosion to data-driven competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Unable to respond quickly to market changes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">Time is Running Out</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Every month you delay costs you {formatCurrency(monthlyLoss)} in losses and {formatCurrency(opportunityLoss / 12)} in missed opportunities. 
                Your competitors who implemented analytics 6 months ago already have a {Math.round(industryData.opportunity * 100)}% advantage.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-andeda-gradient text-white hover:opacity-90"
          >
            Now Show Me The Solution
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};