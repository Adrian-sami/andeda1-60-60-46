import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Calendar, Users, Target, Zap, Award, TrendingUp, Phone, Mail } from 'lucide-react';
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

interface ActionableResultsProps {
  inputs: BusinessInputs;
  results: BusinessPrediction;
}

export const ActionableResults = ({ inputs, results }: ActionableResultsProps) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const getRecommendedSolution = () => {
    const challengeCount = inputs.mainChallenges.length;
    const isDataBasic = inputs.dataMaturity === 'basic';
    
    if (challengeCount >= 4 || inputs.mainChallenges.includes('data-scattered')) {
      return {
        title: 'Complete Data Transformation Package',
        description: 'Comprehensive solution addressing all your data challenges',
        timeline: '6-8 weeks',
        investment: '$8,000 - $15,000',
        roi: '400-700% ROI'
      };
    } else if (inputs.mainChallenges.includes('forecasting-accuracy') || inputs.mainChallenges.includes('slow-decisions')) {
      return {
        title: 'Predictive Analytics & Decision Support',
        description: 'AI-powered forecasting and real-time decision dashboards',
        timeline: '3-5 weeks',
        investment: '$4,000 - $10,000',
        roi: '300-500% ROI'
      };
    } else {
      return {
        title: 'Smart Reporting & Analytics Starter',
        description: 'Automated reporting and visual dashboard system',
        timeline: '2-4 weeks',
        investment: '$3,500 - $8,000',
        roi: '300-500% ROI'
      };
    }
  };

  const solution = getRecommendedSolution();

  const milestones = [
    { week: '1-2', title: 'Discovery & Setup', description: 'Data audit and system analysis' },
    { week: '3-4', title: 'Implementation', description: 'Core system deployment and integration' },
    { week: '5-6', title: 'Optimization', description: 'Fine-tuning and team training' },
    { week: '7+', title: 'Results', description: 'Measurable improvements and ROI realization' }
  ];

  return (
    <div className="space-y-8">
      {/* Success Probability & Key Metrics */}
      <Card className="glass-effect border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Award className="w-5 h-5" />
            Your Transformation Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{results.successProbability}%</div>
              <div className="text-xs text-muted-foreground">Success Probability</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{results.revenueGrowth.min}-{results.revenueGrowth.max}%</div>
              <div className="text-xs text-muted-foreground">Revenue Growth</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{results.efficiencyGain}%</div>
              <div className="text-xs text-muted-foreground">Efficiency Gain</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{results.timeToValue}</div>
              <div className="text-xs text-muted-foreground">Time to Value</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Your Competitive Advantages:</h4>
              <ul className="space-y-1">
                {results.competitiveEdge.map((edge, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{edge}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{results.marketAdvantage}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Risk Mitigation:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{results.riskReduction}% reduction in business risks</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Investment payback within {results.investmentBreakeven}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Guaranteed implementation support</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Solution */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Recommended Solution for Your Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="font-semibold">{solution.timeline}</div>
                <div className="text-xs text-muted-foreground">Implementation</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Target className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="font-semibold">{solution.investment}</div>
                <div className="text-xs text-muted-foreground">Investment Range</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="font-semibold">{solution.roi}</div>
                <div className="text-xs text-muted-foreground">Expected ROI</div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div>
            <h4 className="font-semibold mb-4">Implementation Roadmap:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="bg-background/50 rounded-lg p-4 border">
                    <div className="text-sm font-semibold text-primary mb-1">Week {milestone.week}</div>
                    <div className="font-medium mb-1">{milestone.title}</div>
                    <div className="text-xs text-muted-foreground">{milestone.description}</div>
                  </div>
                  {index < milestones.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Next Steps */}
      <Card className="glass-effect bg-andeda-gradient/5 border-andeda-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Your Next Steps to Success
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Immediate Actions (This Week):</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mt-0.5">1</div>
                  <div>
                    <div className="font-medium">Schedule Your Free Assessment</div>
                    <div className="text-sm text-muted-foreground">Get personalized recommendations and validate these predictions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mt-0.5">2</div>
                  <div>
                    <div className="font-medium">Audit Your Current Data Sources</div>
                    <div className="text-sm text-muted-foreground">List all systems where your business data currently lives</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mt-0.5">3</div>
                  <div>
                    <div className="font-medium">Calculate Your Exact ROI</div>
                    <div className="text-sm text-muted-foreground">Work with our team to validate these numbers for your specific situation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Ready to Start?</h4>
              <div className="space-y-3">
                <Button className="w-full bg-andeda-gradient text-white hover:opacity-90" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Free 30-Min Assessment Call
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Get Detailed Proposal via Email
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  <div>✓ No commitment required</div>
                  <div>✓ Free detailed assessment worth $500</div>
                  <div>✓ Custom implementation roadmap</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">Limited Time Opportunity</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  We can only take on 3 new implementations this quarter. Book your assessment call this week to secure your spot 
                  and lock in current pricing before our rates increase next month.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};