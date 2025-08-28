import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, TrendingUp, Users, Zap, Calendar } from 'lucide-react';
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

interface BusinessPrediction {
  revenueGrowth: { min: number; max: number };
  efficiencyGain: number;
  marketAdvantage: string;
  timeToValue: string;
  riskReduction: number;
  competitiveEdge: string[];
  costOfInaction: {
    monthlyLoss: number;
    yearlyLoss: number;
    opportunityCost: number;
    competitorAdvantage: string;
  };
  investmentBreakeven: string;
  successProbability: number;
}

interface UrgencyTriggersProps {
  inputs: BusinessInputs;
  results: BusinessPrediction;
}

const industryUrgencyFactors = {
  'technology': {
    urgency: 'high',
    message: 'Tech industry changes rapidly - early adopters capture 70% more market share',
    timing: 'Implementation now puts you ahead of 80% of competitors'
  },
  'finance': {
    urgency: 'high',
    message: 'Regulatory requirements tightening - compliance gaps cost $200K+ in fines',
    timing: 'New regulations coming Q2 2024 - implement before the rush'
  },
  'retail': {
    urgency: 'high',
    message: 'E-commerce giants using AI - traditional retailers losing 25% market share annually',
    timing: 'Holiday season prep starts now - optimize before peak period'
  },
  'healthcare': {
    urgency: 'medium',
    message: 'Patient outcomes directly tied to data usage - leaders see 30% better results',
    timing: 'Implementation during slower periods reduces disruption'
  },
  'manufacturing': {
    urgency: 'high',
    message: 'Industry 4.0 adoption accelerating - laggards face 40% cost disadvantage',
    timing: 'Supply chain optimization critical with current global uncertainties'
  }
};

export const UrgencyTriggers = ({ inputs, results }: UrgencyTriggersProps) => {
  const industryData = industryUrgencyFactors[inputs.industry as keyof typeof industryUrgencyFactors] || industryUrgencyFactors.technology;
  
  const getUrgencyLevel = () => {
    let urgencyScore = 0;
    
    // Add urgency based on challenges
    if (inputs.mainChallenges.length >= 4) urgencyScore += 3;
    else if (inputs.mainChallenges.length >= 2) urgencyScore += 2;
    else urgencyScore += 1;
    
    // Add urgency based on decision speed
    if (inputs.decisionSpeed === 'slow') urgencyScore += 3;
    else if (inputs.decisionSpeed === 'moderate') urgencyScore += 1;
    
    // Add urgency based on data maturity
    if (inputs.dataMaturity === 'basic') urgencyScore += 2;
    
    // Add urgency based on industry
    if (industryData.urgency === 'high') urgencyScore += 2;
    
    if (urgencyScore >= 6) return 'critical';
    if (urgencyScore >= 4) return 'high';
    return 'medium';
  };

  const urgencyLevel = getUrgencyLevel();
  
  const urgencyColors = {
    critical: 'destructive',
    high: 'destructive',
    medium: 'secondary'
  } as const;

  const urgencyMessages = {
    critical: {
      title: 'CRITICAL: Immediate Action Required',
      subtitle: 'Your business is at high risk of falling irreversibly behind',
      icon: AlertTriangle
    },
    high: {
      title: 'HIGH URGENCY: Act Within 30 Days',
      subtitle: 'Delays will significantly impact your competitive position',
      icon: Clock
    },
    medium: {
      title: 'Important Decision Window',
      subtitle: 'Early action provides maximum competitive advantage',
      icon: TrendingUp
    }
  };

  const urgencyData = urgencyMessages[urgencyLevel];
  const UrgencyIcon = urgencyData.icon;

  return (
    <Card className={`glass-effect border-${urgencyColors[urgencyLevel]}/30 bg-${urgencyColors[urgencyLevel]}/5`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 text-${urgencyColors[urgencyLevel]}`}>
          <UrgencyIcon className="w-6 h-6" />
          {urgencyData.title}
        </CardTitle>
        <p className="text-muted-foreground">{urgencyData.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <Clock className={`w-8 h-8 text-${urgencyColors[urgencyLevel]} mx-auto mb-2`} />
            <p className="font-semibold">Time Cost</p>
            <p className="text-sm text-muted-foreground">Each month delayed costs ${(results.costOfInaction.monthlyLoss / 1000).toFixed(0)}K</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <Users className={`w-8 h-8 text-${urgencyColors[urgencyLevel]} mx-auto mb-2`} />
            <p className="font-semibold">Competitor Gap</p>
            <p className="text-sm text-muted-foreground">Leaders already {results.revenueGrowth.min}%+ ahead</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <Zap className={`w-8 h-8 text-${urgencyColors[urgencyLevel]} mx-auto mb-2`} />
            <p className="font-semibold">Success Rate</p>
            <p className="text-sm text-muted-foreground">{results.successProbability}% with immediate action</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Industry Timing Factor
            </h4>
            <p className="text-sm text-muted-foreground mb-2">{industryData.message}</p>
            <Badge variant="outline" className="text-xs">{industryData.timing}</Badge>
          </div>

          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Why Acting Now Gives You Maximum Advantage:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full bg-${urgencyColors[urgencyLevel]} mt-1.5 flex-shrink-0`}></div>
                <span>Implementation during {inputs.companySize === 'enterprise' ? 'planning cycles' : 'growth phase'} ensures smooth adoption</span>
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full bg-${urgencyColors[urgencyLevel]} mt-1.5 flex-shrink-0`}></div>
                <span>Early results visible within {results.timeToValue} - before competitors catch up</span>
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full bg-${urgencyColors[urgencyLevel]} mt-1.5 flex-shrink-0`}></div>
                <span>Investment pays back within {results.investmentBreakeven} through immediate efficiency gains</span>
              </li>
              <li className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full bg-${urgencyColors[urgencyLevel]} mt-1.5 flex-shrink-0`}></div>
                <span>Team adoption easier when everyone sees the urgent need for change</span>
              </li>
            </ul>
          </div>
        </div>

        {urgencyLevel === 'critical' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive">Critical Action Required</h4>
                <p className="text-sm text-destructive/80 mt-1">
                  Your business faces significant risk. Multiple challenges combined with industry pressures mean 
                  that waiting could result in irreversible competitive disadvantage. We recommend immediate consultation.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};