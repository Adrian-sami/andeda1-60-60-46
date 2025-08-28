export interface BusinessProfile {
  companyName: string;
  location: string;
  industry: string;
  currentRevenue: string;
  businessModel: string;
  growthStage: string;
  mainProblems: string[];
  decisionMakingSpeed: string;
  growthGoals: string;
  currentDataSituation: string;
}

export interface AIGeneratedContent {
  executiveSummary: string;
  topOpportunities: string[];
  actionPlan: string[];
  urgencyStatement: string;
  competitiveInsight: string;
}

interface IndustryContext {
  keyMetrics: string[];
  commonChallenges: string[];
  competitiveFactors: string[];
  typicalMargins: { low: number; high: number };
  seasonality: string;
}

interface LocationContext {
  marketSize: string;
  competitiveLevel: string;
  regulatoryFactors: string[];
  economicFactors: string[];
}

class DynamicContentService {
  private static instance: DynamicContentService;
  private industryData: Map<string, IndustryContext>;
  private locationData: Map<string, LocationContext>;
  private problemSolutionMap: Map<string, string[]>;

  static getInstance(): DynamicContentService {
    if (!DynamicContentService.instance) {
      DynamicContentService.instance = new DynamicContentService();
    }
    return DynamicContentService.instance;
  }

  constructor() {
    this.initializeIndustryData();
    this.initializeLocationData();
    this.initializeProblemSolutionMap();
  }

  private initializeIndustryData(): void {
    this.industryData = new Map([
      ['retail', {
        keyMetrics: ['inventory turnover', 'customer lifetime value', 'conversion rates', 'average order value'],
        commonChallenges: ['inventory management', 'customer retention', 'seasonal fluctuations', 'supply chain optimization'],
        competitiveFactors: ['price competitiveness', 'customer experience', 'product availability', 'brand loyalty'],
        typicalMargins: { low: 2, high: 8 },
        seasonality: 'high'
      }],
      ['manufacturing', {
        keyMetrics: ['production efficiency', 'defect rates', 'equipment utilization', 'supply chain costs'],
        commonChallenges: ['production optimization', 'quality control', 'equipment maintenance', 'supply chain disruptions'],
        competitiveFactors: ['production capacity', 'quality standards', 'cost efficiency', 'delivery reliability'],
        typicalMargins: { low: 8, high: 15 },
        seasonality: 'moderate'
      }],
      ['healthcare', {
        keyMetrics: ['patient satisfaction', 'operational efficiency', 'compliance rates', 'cost per patient'],
        commonChallenges: ['regulatory compliance', 'patient flow optimization', 'resource allocation', 'data security'],
        competitiveFactors: ['quality of care', 'patient experience', 'technology adoption', 'operational efficiency'],
        typicalMargins: { low: 3, high: 12 },
        seasonality: 'low'
      }],
      ['technology', {
        keyMetrics: ['user engagement', 'churn rates', 'development velocity', 'customer acquisition cost'],
        commonChallenges: ['scalability', 'user retention', 'feature prioritization', 'technical debt'],
        competitiveFactors: ['innovation speed', 'user experience', 'scalability', 'market positioning'],
        typicalMargins: { low: 15, high: 35 },
        seasonality: 'low'
      }],
      ['finance', {
        keyMetrics: ['risk assessment', 'compliance rates', 'client satisfaction', 'operational efficiency'],
        commonChallenges: ['regulatory compliance', 'risk management', 'client retention', 'market volatility'],
        competitiveFactors: ['trust and reputation', 'service quality', 'regulatory compliance', 'innovation'],
        typicalMargins: { low: 10, high: 25 },
        seasonality: 'moderate'
      }]
    ]);
  }

  private initializeLocationData(): void {
    this.locationData = new Map([
      ['united states', {
        marketSize: 'large and diverse',
        competitiveLevel: 'high',
        regulatoryFactors: ['data privacy regulations', 'industry-specific compliance'],
        economicFactors: ['mature market', 'high consumer spending', 'strong digital adoption']
      }],
      ['canada', {
        marketSize: 'moderate',
        competitiveLevel: 'moderate',
        regulatoryFactors: ['PIPEDA compliance', 'provincial regulations'],
        economicFactors: ['stable economy', 'resource-based sectors', 'growing tech sector']
      }],
      ['united kingdom', {
        marketSize: 'large',
        competitiveLevel: 'high',
        regulatoryFactors: ['GDPR compliance', 'post-Brexit regulations'],
        economicFactors: ['mature market', 'strong financial sector', 'regulatory changes']
      }]
    ]);
  }

  private initializeProblemSolutionMap(): void {
    this.problemSolutionMap = new Map([
      ['slow decision making', [
        'implement real-time dashboards for instant data access',
        'automate routine reporting to free up analysis time',
        'create mobile-friendly analytics for on-the-go decisions',
        'establish automated alert systems for critical metrics'
      ]],
      ['poor customer insights', [
        'deploy customer journey analytics to understand behavior patterns',
        'implement segmentation analysis for targeted marketing',
        'create predictive models for customer lifetime value',
        'establish feedback loop systems for continuous improvement'
      ]],
      ['inefficient operations', [
        'optimize resource allocation through data-driven insights',
        'identify bottlenecks using process analytics',
        'implement predictive maintenance for equipment',
        'automate manual processes where possible'
      ]],
      ['lack of competitive intelligence', [
        'establish market benchmarking dashboards',
        'implement competitor analysis frameworks',
        'create industry trend monitoring systems',
        'develop pricing optimization strategies'
      ]]
    ]);
  }

  async generateBusinessAnalysis(profile: BusinessProfile, financialData: {
    monthlyWaste: number;
    yearlyWaste: number;
    missedOpportunities: number;
    revenueBoost: { min: number; max: number };
  }): Promise<AIGeneratedContent> {
    
    const industryContext = this.getIndustryContext(profile.industry);
    const locationContext = this.getLocationContext(profile.location);
    const revenueContext = this.parseRevenueContext(profile.currentRevenue);
    
    return {
      executiveSummary: this.generateExecutiveSummary(profile, financialData, industryContext, revenueContext),
      topOpportunities: this.generateTopOpportunities(profile, financialData, industryContext),
      actionPlan: this.generateActionPlan(profile, industryContext, locationContext),
      urgencyStatement: this.generateUrgencyStatement(profile, financialData, industryContext),
      competitiveInsight: this.generateCompetitiveInsight(profile, industryContext, locationContext)
    };
  }

  private generateExecutiveSummary(
    profile: BusinessProfile, 
    financialData: any, 
    industryContext: IndustryContext,
    revenueContext: { range: string; scale: string }
  ): string {
    const efficiencyImprovement = this.calculateRealisticImprovement(financialData, revenueContext);
    const keyChallenge = this.getPrimaryChallenge(profile.mainProblems, industryContext);
    const competitiveAdvantage = this.getCompetitiveAdvantage(profile, industryContext);
    
    const summaries = [
      `${profile.companyName}, operating as a ${revenueContext.scale} ${profile.industry} company in ${profile.location}, is positioned to improve operational efficiency by ${efficiencyImprovement.percentage}% through strategic business intelligence implementation. By addressing ${keyChallenge} and leveraging ${competitiveAdvantage}, the company can capture additional market share while reducing current operational inefficiencies.`,
      
      `Analysis reveals that ${profile.companyName} has significant untapped potential in the ${profile.location} ${profile.industry} market, with data-driven optimizations projected to improve ${industryContext.keyMetrics[0]} by ${efficiencyImprovement.percentage}%. The company's ${profile.growthStage} stage positioning creates unique opportunities to gain competitive advantage through advanced analytics implementation.`,
      
      `${profile.companyName}'s current ${profile.industry} operations in ${profile.location} show clear optimization opportunities, particularly in addressing ${keyChallenge}. Strategic business intelligence deployment could improve overall operational efficiency by ${efficiencyImprovement.percentage}%, positioning the company to better compete in the ${industryContext.competitiveFactors[0]} landscape.`
    ];
    
    return this.selectVariation(summaries, profile);
  }

  private generateTopOpportunities(
    profile: BusinessProfile, 
    financialData: any, 
    industryContext: IndustryContext
  ): string[] {
    const opportunities = [];
    const revenueImprovement = Math.round(financialData.revenueBoost.min * 0.1); // 10% of potential
    const costSaving = Math.round(financialData.monthlyWaste * 0.3); // 30% efficiency gain
    
    // Industry-specific opportunities
    opportunities.push(
      `Optimize ${industryContext.keyMetrics[0]} to capture ${this.formatCurrency(revenueImprovement)} in additional monthly value through data-driven ${profile.industry} best practices`
    );
    
    opportunities.push(
      `Reduce operational waste by implementing automated ${industryContext.commonChallenges[0]} systems, saving approximately ${this.formatCurrency(costSaving)} monthly`
    );
    
    // Problem-specific opportunities
    profile.mainProblems.forEach(problem => {
      const solutions = this.problemSolutionMap.get(problem.toLowerCase());
      if (solutions) {
        opportunities.push(
          `Address ${problem} by ${solutions[0]}, improving ${industryContext.keyMetrics[1]} performance`
        );
      }
    });
    
    // Growth stage specific
    if (profile.growthStage.includes('startup') || profile.growthStage.includes('early')) {
      opportunities.push(
        `Establish competitive advantage in ${profile.location} by implementing ${industryContext.competitiveFactors[0]} analytics before competitors`
      );
    } else {
      opportunities.push(
        `Enhance market position by leveraging ${industryContext.competitiveFactors[1]} data to outperform established competitors in ${profile.location}`
      );
    }
    
    // Business model specific
    opportunities.push(
      `Optimize ${profile.businessModel} strategy through ${industryContext.keyMetrics[2]} analysis, targeting ${this.calculateMarketShare(financialData)}% additional market capture`
    );
    
    return opportunities.slice(0, 5);
  }

  private generateActionPlan(
    profile: BusinessProfile, 
    industryContext: IndustryContext, 
    locationContext: LocationContext
  ): string[] {
    const actions = [];
    const primaryMetric = industryContext.keyMetrics[0];
    const primaryChallenge = industryContext.commonChallenges[0];
    
    // Week 1 actions
    actions.push(
      `Days 1-3: Audit current ${primaryMetric} tracking systems and identify immediate data collection gaps in your ${profile.industry} operations`
    );
    
    actions.push(
      `Days 4-7: Implement basic ${primaryChallenge} monitoring dashboard specifically designed for ${profile.location} market conditions`
    );
    
    // Week 2 actions - problem specific
    profile.mainProblems.slice(0, 2).forEach((problem, index) => {
      const solutions = this.problemSolutionMap.get(problem.toLowerCase());
      if (solutions) {
        actions.push(
          `Days ${8 + (index * 2)}-${9 + (index * 2)}: Deploy ${solutions[0]} targeting your specific ${problem} challenges`
        );
      }
    });
    
    // Finalization actions
    actions.push(
      `Days 12-14: Establish ${industryContext.keyMetrics[1]} benchmarking against ${profile.location} ${profile.industry} competitors`
    );
    
    actions.push(
      `Day 14: Configure automated reporting system for ${profile.companyName} leadership team with ${profile.decisionMakingSpeed} decision-making cadence`
    );
    
    return actions.slice(0, 7);
  }

  private generateUrgencyStatement(
    profile: BusinessProfile, 
    financialData: any, 
    industryContext: IndustryContext
  ): string {
    const dailyLoss = Math.round(financialData.monthlyWaste / 30);
    const competitiveThreat = industryContext.competitiveFactors[0];
    const keyMetric = industryContext.keyMetrics[0];
    
    const urgencyStatements = [
      `Each day of delayed implementation costs ${profile.companyName} ${this.formatCurrency(dailyLoss)} while ${profile.location} competitors advance their ${competitiveThreat} capabilities through data-driven strategies.`,
      
      `In the rapidly evolving ${profile.industry} landscape, ${profile.companyName} loses ${this.formatCurrency(dailyLoss)} daily to inefficiencies while competitors in ${profile.location} gain irreversible advantages in ${keyMetric} optimization.`,
      
      `The ${profile.location} ${profile.industry} market is increasingly data-driven - every day without proper analytics costs ${profile.companyName} ${this.formatCurrency(dailyLoss)} and widens the competitive gap in ${competitiveThreat}.`
    ];
    
    return this.selectVariation(urgencyStatements, profile);
  }

  private generateCompetitiveInsight(
    profile: BusinessProfile, 
    industryContext: IndustryContext, 
    locationContext: LocationContext
  ): string {
    const marketAdvantage = this.calculateMarketAdvantage(industryContext);
    const regionalFactor = this.getRegionalCompetitiveFactor(locationContext);
    
    const insights = [
      `In the ${profile.location} ${profile.industry} sector, companies leveraging advanced ${industryContext.keyMetrics[0]} analytics typically outperform competitors by ${marketAdvantage}%. ${profile.companyName}'s ${profile.growthStage} positioning creates a unique opportunity to capture this advantage while ${regionalFactor}.`,
      
      `Market analysis shows that ${profile.industry} leaders in ${profile.location} gain competitive edge through superior ${industryContext.competitiveFactors[0]} - an area where ${profile.companyName} can establish dominance by implementing comprehensive business intelligence before the ${marketAdvantage}% of competitors who lack sophisticated analytics.`,
      
      `The ${profile.location} ${profile.industry} landscape increasingly favors data-driven operators, with analytics-enabled companies showing ${marketAdvantage}% better performance in ${industryContext.keyMetrics[1]}. ${profile.companyName}'s current ${profile.growthStage} stage provides optimal timing to establish this competitive moat.`
    ];
    
    return this.selectVariation(insights, profile);
  }

  // Helper methods for realistic calculations and variations
  private calculateRealisticImprovement(financialData: any, revenueContext: any): { percentage: number; value: number } {
    const baseImprovement = revenueContext.scale === 'enterprise' ? 12 : revenueContext.scale === 'medium' ? 18 : 25;
    const adjustment = Math.min(financialData.monthlyWaste / 10000, 10); // Cap at 10% additional
    return {
      percentage: Math.round(baseImprovement + adjustment),
      value: Math.round(financialData.revenueBoost.min * 0.15) // 15% of potential
    };
  }

  private getPrimaryChallenge(problems: string[], industryContext: IndustryContext): string {
    return problems[0] || industryContext.commonChallenges[0];
  }

  private getCompetitiveAdvantage(profile: BusinessProfile, industryContext: IndustryContext): string {
    const advantages = ['data-driven decision making', 'operational optimization', 'customer insight analytics', 'predictive forecasting'];
    return advantages[profile.companyName.length % advantages.length];
  }

  private calculateMarketShare(financialData: any): number {
    return Math.min(Math.round(financialData.revenueBoost.min / 100000), 8); // Cap at 8%
  }

  private calculateMarketAdvantage(industryContext: IndustryContext): number {
    return Math.round(15 + (industryContext.typicalMargins.high - industryContext.typicalMargins.low));
  }

  private getRegionalCompetitiveFactor(locationContext: LocationContext): string {
    const factors = [
      'market conditions remain favorable',
      'regulatory environment supports innovation',
      'competitive landscape is still developing',
      'economic factors create opportunity windows'
    ];
    return factors[Math.floor(Math.random() * factors.length)];
  }

  private selectVariation(options: string[], profile: BusinessProfile): string {
    const index = (profile.companyName.length + profile.industry.length) % options.length;
    return options[index];
  }

  private getIndustryContext(industry: string): IndustryContext {
    const normalizedIndustry = industry.toLowerCase();
    return this.industryData.get(normalizedIndustry) || this.industryData.get('technology')!;
  }

  private getLocationContext(location: string): LocationContext {
    const normalizedLocation = location.toLowerCase();
    return this.locationData.get(normalizedLocation) || this.locationData.get('united states')!;
  }

  private parseRevenueContext(revenue: string): { range: string; scale: string } {
    const revenueNum = parseFloat(revenue.replace(/[^0-9.]/g, ''));
    if (revenueNum < 1) return { range: 'startup', scale: 'small' };
    if (revenueNum < 10) return { range: 'growing', scale: 'medium' };
    return { range: 'established', scale: 'enterprise' };
  }

  private formatCurrency(amount: number): string {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  }
}

export const dynamicContentService = DynamicContentService.getInstance();