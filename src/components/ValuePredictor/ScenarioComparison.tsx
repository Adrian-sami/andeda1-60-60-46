import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Clock, Users, Target } from 'lucide-react';
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

interface ScenarioComparisonProps {
  inputs: BusinessInputs;
  results: BusinessPrediction;
}

const revenueRanges = {
  'under-1m': 500000,
  '1m-5m': 2500000,
  '5m-25m': 12500000,
  '25m-100m': 50000000,
  'over-100m': 150000000
};

export const ScenarioComparison = ({ inputs, results }: ScenarioComparisonProps) => {
  const currentRev = revenueRanges[inputs.currentRevenue as keyof typeof revenueRanges];
  const potentialGain = currentRev * (results.revenueGrowth.min / 100);
  const maxGain = currentRev * (results.revenueGrowth.max / 100);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const statusQuoScenario = {
    year1Loss: results.costOfInaction.yearlyLoss,
    year2Loss: results.costOfInaction.yearlyLoss * 2.1, // Compound losses
    opportunityLoss: results.costOfInaction.opportunityCost,
    competitiveLag: "Fall further behind data-driven competitors"
  };

  const actionScenario = {
    year1Gain: potentialGain * 0.7, // Conservative first year
    year2Gain: potentialGain * 1.5, // Compound benefits
    maxGain: maxGain,
    breakeven: results.investmentBreakeven
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Your Two Paths Forward</h3>
        <p className="text-muted-foreground">See the dramatic difference between taking action now vs. waiting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Quo Path */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <TrendingDown className="w-5 h-5" />
              Status Quo: Keep Doing What You're Doing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">6 Month Loss</span>
                <span className="text-destructive font-bold">{formatCurrency(statusQuoScenario.year1Loss / 2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">1 Year Loss</span>
                <span className="text-destructive font-bold">{formatCurrency(statusQuoScenario.year1Loss)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">2 Year Compound Loss</span>
                <span className="text-destructive font-bold">{formatCurrency(statusQuoScenario.year2Loss)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="destructive" className="w-full justify-center py-1">What You'll Experience</Badge>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Continued efficiency losses and manual processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Competitors gain {results.revenueGrowth.min}-{results.revenueGrowth.max}% advantage</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Market opportunities slip away to faster competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Team frustration increases with manual work</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Path */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              Take Action: Transform Your Business
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">6 Month Gain</span>
                <span className="text-primary font-bold">{formatCurrency(actionScenario.year1Gain / 2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">1 Year Gain</span>
                <span className="text-primary font-bold">{formatCurrency(actionScenario.year1Gain)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium">2 Year Compound Gain</span>
                <span className="text-primary font-bold">{formatCurrency(actionScenario.year2Gain)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Badge className="w-full justify-center py-1 bg-primary text-primary-foreground">What You'll Achieve</Badge>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{results.efficiencyGain}% efficiency improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Competitive advantage through {results.marketAdvantage.toLowerCase()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Faster decisions and market responsiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Team empowerment with automated insights</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Comparison */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            The Bottom Line Difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg border border-destructive/20">
              <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-lg font-bold text-destructive">{formatCurrency(statusQuoScenario.year2Loss)}</p>
              <p className="text-xs text-muted-foreground">2-Year Loss (Status Quo)</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-primary">{formatCurrency(actionScenario.year2Gain)}</p>
              <p className="text-xs text-muted-foreground">2-Year Gain (Action)</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg border border-emerald-500/20">
              <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(statusQuoScenario.year2Loss + actionScenario.year2Gain)}</p>
              <p className="text-xs text-muted-foreground">Total Difference</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg border border-orange-500/20">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-600">{results.investmentBreakeven}</p>
              <p className="text-xs text-muted-foreground">Investment Payback</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};