import { 
  TrendingUp, DollarSign, Users, BarChart3, Activity, PieChart, 
  FileText, Target, Settings, Shield, CheckCircle, Search, 
  UserCheck, Lightbulb, HandHeart, Calculator, Calendar, 
  Wallet, AlertTriangle, Globe, Eye, Rocket, UserPlus, 
  Clock, Zap, Brain, Award, LineChart, Database, Filter, 
  Briefcase, ArrowUp, Star, ChartBar, Gauge, Building, 
  Users2, Banknote, ShieldCheck, AlertCircle, BookOpen, 
  MapPin, Compass, Heart, Handshake, TrendingDown 
} from 'lucide-react';

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  painPoints: string[];
  costOfInaction: string;
  targetAudience: string[];
  industry: string[];
  urgencyLevel: 'high' | 'medium' | 'low';
  icon: any;
}

export interface SolutionMapping {
  problemId: string;
  categoryId: string;
  subServiceId: string;
  specificSolution: string;
  deliverables: string[];
  timeline: string;
  investmentRange: string;
  roi: string;
  caseStudyExample?: string;
}

export interface MarketSegment {
  id: string;
  name: string;
  description: string;
  size: string;
  growthRate: string;
  paymentCapacity: 'high' | 'medium' | 'low';
  urgency: 'high' | 'medium' | 'low';
  competition: 'low' | 'medium' | 'high';
  entryStrategy: string;
  leadMagnet: string;
  pricing: {
    starter: string;
    growth: string;
    enterprise: string;
  };
}

// CORE PROBLEMS WE SOLVE (Mapped to Service Categories)
export const problemStatements: ProblemStatement[] = [
  // DATA ANALYTICS CATEGORY PROBLEMS
  {
    id: 'data-fragmentation',
    title: 'Data Scattered Across Multiple Systems',
    description: 'Organizations struggle with data spread across Excel files, different software systems, and manual processes, making it impossible to get a complete business picture.',
    painPoints: [
      'Teams waste 40+ hours monthly creating reports manually',
      'Inconsistent data leads to wrong business decisions',
      'Cannot track performance across departments',
      'Leadership lacks real-time visibility into operations'
    ],
    costOfInaction: 'Lost revenue opportunities worth 15-30% of potential growth, delayed decision-making costing $50K+ annually in small businesses',
    targetAudience: ['SMEs', 'Startups', 'Financial Institutions'],
    industry: ['Finance', 'Retail', 'Manufacturing', 'Healthcare'],
    urgencyLevel: 'high',
    icon: Database
  },
  {
    id: 'manual-reporting-chaos',
    title: 'Manual Reporting Taking Too Much Time',
    description: 'Finance and operations teams spend days each month manually building reports that are outdated by the time they\'re presented.',
    painPoints: [
      'Monthly reports take 3-5 days to compile',
      'Data accuracy errors in 30%+ of manual reports',
      'Cannot make quick decisions due to delayed insights',
      'Team burnout from repetitive reporting tasks'
    ],
    costOfInaction: 'Missed market opportunities, delayed responses to problems, team productivity loss of 25-40%',
    targetAudience: ['SMEs', 'Financial Institutions', 'Government'],
    industry: ['All Industries'],
    urgencyLevel: 'high',
    icon: Clock
  },
  {
    id: 'no-forecasting-capability',
    title: 'Flying Blind Without Future Visibility',
    description: 'Organizations make critical decisions based on gut feeling rather than data-driven forecasts about market trends, cash flow, and business performance.',
    painPoints: [
      'Cannot predict cash flow problems before they happen',
      'No early warning system for business challenges',
      'Budget planning based on guesswork',
      'Seasonal patterns not understood or leveraged'
    ],
    costOfInaction: 'Cash flow crises, missed investment opportunities, poor resource allocation costing 20-50% profit margins',
    targetAudience: ['Startups', 'SMEs', 'Financial Institutions'],
    industry: ['Finance', 'Retail', 'Manufacturing'],
    urgencyLevel: 'high',
    icon: TrendingDown
  },

  // CONSULTING CATEGORY PROBLEMS
  {
    id: 'strategic-decision-paralysis',
    title: 'Leadership Struggles with Strategic Decisions',
    description: 'Business leaders lack frameworks and data-driven insights to make confident strategic decisions about growth, operations, and market positioning.',
    painPoints: [
      'Delayed decisions due to analysis paralysis',
      'Strategic initiatives fail due to poor planning',
      'No clear measurement of strategic success',
      'Leadership team not aligned on priorities'
    ],
    costOfInaction: 'Competitive disadvantage, missed market opportunities, internal conflicts, stagnant growth',
    targetAudience: ['SMEs', 'Startups', 'Government', 'NGOs'],
    industry: ['All Industries'],
    urgencyLevel: 'medium',
    icon: Target
  },
  {
    id: 'operational-inefficiencies',
    title: 'Operational Waste and Inefficiencies',
    description: 'Organizations lose money through inefficient processes, poor resource allocation, and lack of operational visibility.',
    painPoints: [
      'Processes take longer than necessary',
      'Resources allocated to wrong priorities',
      'No visibility into operational bottlenecks',
      'Teams working in silos without coordination'
    ],
    costOfInaction: 'Operating costs 30-50% higher than optimized operations, reduced profitability, team frustration',
    targetAudience: ['SMEs', 'Manufacturing', 'Financial Institutions'],
    industry: ['Manufacturing', 'Healthcare', 'Finance'],
    urgencyLevel: 'medium',
    icon: Settings
  },
  {
    id: 'compliance-risks',
    title: 'Regulatory Compliance Gaps and Risks',
    description: 'Organizations struggle to stay compliant with evolving regulations, risking penalties, reputation damage, and operational disruptions.',
    painPoints: [
      'Unclear about current compliance requirements',
      'No systematic compliance monitoring',
      'Risk of regulatory penalties and fines',
      'Audit readiness takes weeks to prepare'
    ],
    costOfInaction: 'Regulatory fines, business license revocation, reputation damage, legal costs of $10K-500K+',
    targetAudience: ['Financial Institutions', 'Healthcare', 'Government'],
    industry: ['Finance', 'Healthcare', 'Government'],
    urgencyLevel: 'high',
    icon: Shield
  },

  // FINANCIAL INTELLIGENCE CATEGORY PROBLEMS
  {
    id: 'cash-flow-uncertainty',
    title: 'Unpredictable Cash Flow Management',
    description: 'Businesses struggle with cash flow planning, leading to funding shortages, missed opportunities, and financial stress.',
    painPoints: [
      'Cannot predict cash shortages in advance',
      'Difficulty managing seasonal cash flow patterns',
      'Late payments from customers disrupting operations',
      'No clear visibility into cash flow timing'
    ],
    costOfInaction: 'Business closure risk, missed growth opportunities, high-interest emergency funding, supplier relationship damage',
    targetAudience: ['SMEs', 'Startups', 'Retail'],
    industry: ['Retail', 'Manufacturing', 'Services'],
    urgencyLevel: 'high',
    icon: Wallet
  },
  {
    id: 'financial-blind-spots',
    title: 'Hidden Financial Weaknesses and Blind Spots',
    description: 'Organizations lack comprehensive financial health assessment, missing early warning signs of financial problems.',
    painPoints: [
      'Cannot identify financial weaknesses early',
      'No benchmark comparison with industry standards',
      'Hidden costs eating into profit margins',
      'Investment decisions made without proper financial analysis'
    ],
    costOfInaction: 'Financial crisis, bankruptcy risk, poor investment decisions, inability to access funding',
    targetAudience: ['SMEs', 'Startups', 'Financial Institutions'],
    industry: ['All Industries'],
    urgencyLevel: 'high',
    icon: AlertTriangle
  },
  {
    id: 'budget-planning-chaos',
    title: 'Ineffective Budget Planning and Control',
    description: 'Organizations struggle with realistic budget creation, monitoring, and adjustment, leading to financial mismanagement.',
    painPoints: [
      'Budgets consistently over or under actual results',
      'No real-time budget monitoring capabilities',
      'Cannot adjust budgets based on changing conditions',
      'Budget planning takes months with poor accuracy'
    ],
    costOfInaction: 'Resource misallocation, missed profit targets, inability to scale operations, investor confidence loss',
    targetAudience: ['SMEs', 'Startups', 'Government', 'NGOs'],
    industry: ['All Industries'],
    urgencyLevel: 'medium',
    icon: Calculator
  },

  // MARKET RESEARCH CATEGORY PROBLEMS
  {
    id: 'market-opportunity-blindness',
    title: 'Missing Market Opportunities and Trends',
    description: 'Organizations lack market intelligence to identify growth opportunities, understand customer needs, and position competitively.',
    painPoints: [
      'Cannot identify emerging market opportunities',
      'No understanding of customer needs and preferences',
      'Competitive positioning based on assumptions',
      'Product/service development without market validation'
    ],
    costOfInaction: 'Missed revenue opportunities, failed product launches, competitive disadvantage, market share loss',
    targetAudience: ['Startups', 'SMEs', 'Product Companies'],
    industry: ['Technology', 'Retail', 'Manufacturing'],
    urgencyLevel: 'medium',
    icon: Eye
  },
  {
    id: 'startup-validation-risk',
    title: 'Startup Ideas Without Market Validation',
    description: 'Entrepreneurs invest time and money in business ideas without proper market research and feasibility analysis.',
    painPoints: [
      'No validation of market demand for the idea',
      'Unclear target customer identification',
      'No competitive analysis or differentiation strategy',
      'Financial projections based on optimism rather than data'
    ],
    costOfInaction: 'Startup failure (90% fail due to lack of market validation), wasted investment, missed opportunities',
    targetAudience: ['Startups', 'Entrepreneurs', 'Investors'],
    industry: ['Technology', 'All Industries'],
    urgencyLevel: 'high',
    icon: Rocket
  },
  {
    id: 'investor-readiness-gap',
    title: 'Not Ready for Investment or Partnership',
    description: 'Growing businesses lack professional materials and market analysis needed to attract investors or strategic partners.',
    painPoints: [
      'No professional investment pitch materials',
      'Cannot quantify market opportunity size',
      'Lack of competitive analysis and positioning',
      'No clear growth strategy with financial projections'
    ],
    costOfInaction: 'Failed fundraising attempts, missed partnership opportunities, slower growth, competitive disadvantage',
    targetAudience: ['Startups', 'SMEs', 'Growth Companies'],
    industry: ['Technology', 'Finance', 'Manufacturing'],
    urgencyLevel: 'medium',
    icon: UserPlus
  }
];

// SOLUTION MAPPINGS (Problem → Category → Specific Solution)
export const solutionMappings: SolutionMapping[] = [
  // DATA ANALYTICS SOLUTIONS
  {
    problemId: 'data-fragmentation',
    categoryId: 'data-analytics',
    subServiceId: 'visualReporting',
    specificSolution: 'Integrated Dashboard System',
    deliverables: [
      'Automated data integration from all systems',
      'Real-time business dashboard',
      'Mobile-friendly reporting interface',
      'Training for your team'
    ],
    timeline: '2-4 weeks',
    investmentRange: '$3,500 - $8,000',
    roi: '300-500% ROI through time savings and better decisions',
    caseStudyExample: 'Kenyan SME reduced reporting time from 40 hours to 2 hours monthly, increased revenue by 25% through better visibility'
  },
  {
    problemId: 'data-fragmentation',
    categoryId: 'data-analytics',
    subServiceId: 'dataIntegration',
    specificSolution: 'Enterprise Data Warehouse Solution',
    deliverables: [
      'Centralized data warehouse setup',
      'ETL processes for all data sources',
      'Data quality and validation framework',
      'Historical data migration and cleanup',
      'Data governance and security protocols'
    ],
    timeline: '6-8 weeks',
    investmentRange: '$8,000 - $15,000',
    roi: '400-700% ROI through comprehensive data unification',
    caseStudyExample: 'Nigerian manufacturing company unified 12 data sources, reduced reporting errors by 90%, improved decision speed by 60%'
  },
  {
    problemId: 'data-fragmentation',
    categoryId: 'data-analytics',
    subServiceId: 'apiIntegration',
    specificSolution: 'Smart Data Connector Platform',
    deliverables: [
      'API-based data connectors for all systems',
      'Real-time data synchronization',
      'Automated conflict resolution',
      'Data monitoring and alerting system',
      'Custom integration for legacy systems'
    ],
    timeline: '3-5 weeks',
    investmentRange: '$4,500 - $9,000',
    roi: '350-600% ROI through seamless data flow automation',
    caseStudyExample: 'Tanzanian fintech connected 8 different systems, eliminated 95% of manual data entry, saved 35 hours weekly'
  },
  {
    problemId: 'manual-reporting-chaos',
    categoryId: 'data-analytics',
    subServiceId: 'customReporting',
    specificSolution: 'Automated Reporting System',
    deliverables: [
      'Automated monthly/weekly reports',
      'Data validation and accuracy checks',
      'Report templates for different stakeholders',
      'Email distribution automation'
    ],
    timeline: '2-3 weeks',
    investmentRange: '$2,500 - $6,000',
    roi: '400-600% ROI through productivity gains',
    caseStudyExample: 'Nigerian fintech saved 120 hours monthly, reduced errors by 95%, freed team for strategic work'
  },
  {
    problemId: 'no-forecasting-capability',
    categoryId: 'data-analytics',
    subServiceId: 'forecasting',
    specificSolution: 'Predictive Analytics System',
    deliverables: [
      'Cash flow forecasting models',
      'Sales prediction algorithms',
      'Seasonal trend analysis',
      'Early warning alert system'
    ],
    timeline: '3-5 weeks',
    investmentRange: '$4,000 - $10,000',
    roi: '200-400% ROI through risk prevention and opportunity capture',
    caseStudyExample: 'Ghana retailer avoided $50K cash crisis, increased profits 30% through seasonal optimization'
  },

  // CONSULTING SOLUTIONS
  {
    problemId: 'strategic-decision-paralysis',
    categoryId: 'consulting',
    subServiceId: 'dataBasedConsulting',
    specificSolution: 'Strategic Decision Framework',
    deliverables: [
      'Data-driven strategic assessment',
      'Decision-making framework and processes',
      'KPI tracking system for strategy execution',
      'Quarterly strategic review process'
    ],
    timeline: '4-6 weeks',
    investmentRange: '$5,000 - $15,000',
    roi: '150-300% ROI through improved strategic outcomes',
    caseStudyExample: 'Tanzanian SME achieved 40% revenue growth after implementing strategic framework'
  },
  {
    problemId: 'operational-inefficiencies',
    categoryId: 'consulting',
    subServiceId: 'operationalConsulting',
    specificSolution: 'Operational Excellence Program',
    deliverables: [
      'Process mapping and optimization',
      'Resource allocation optimization',
      'Performance measurement system',
      'Team productivity improvement plan'
    ],
    timeline: '6-8 weeks',
    investmentRange: '$6,000 - $18,000',
    roi: '200-400% ROI through cost reduction and efficiency gains',
    caseStudyExample: 'Kenyan manufacturer reduced costs by 35%, improved delivery time by 50%'
  },
  {
    problemId: 'compliance-risks',
    categoryId: 'consulting',
    subServiceId: 'complianceStatusReview',
    specificSolution: 'Compliance Management System',
    deliverables: [
      'Comprehensive compliance audit',
      'Gap analysis and remediation plan',
      'Ongoing compliance monitoring system',
      'Audit readiness preparation'
    ],
    timeline: '4-8 weeks',
    investmentRange: '$4,000 - $12,000',
    roi: '500-1000% ROI through risk avoidance',
    caseStudyExample: 'Nigerian bank avoided $200K in regulatory fines, improved audit rating'
  },

  // FINANCIAL INTELLIGENCE SOLUTIONS
  {
    problemId: 'cash-flow-uncertainty',
    categoryId: 'financial-intelligence',
    subServiceId: 'cashFlowManagement',
    specificSolution: 'Cash Flow Command Center',
    deliverables: [
      '13-week rolling cash flow forecast',
      'Payment scheduling optimization',
      'Customer collection improvement plan',
      'Cash flow crisis prevention system'
    ],
    timeline: '3-4 weeks',
    investmentRange: '$3,000 - $8,000',
    roi: '300-500% ROI through cash crisis prevention',
    caseStudyExample: 'Ghana trading company avoided bankruptcy, improved cash position by $100K'
  },
  {
    problemId: 'financial-blind-spots',
    categoryId: 'financial-intelligence',
    subServiceId: 'financialHealthReview',
    specificSolution: 'Financial Health Assessment',
    deliverables: [
      'Comprehensive financial health scorecard',
      'Industry benchmark comparison',
      'Financial improvement roadmap',
      'Monthly financial monitoring system'
    ],
    timeline: '2-3 weeks',
    investmentRange: '$2,500 - $6,000',
    roi: '200-400% ROI through financial optimization',
    caseStudyExample: 'Tanzanian SME identified hidden costs worth $30K annually, improved profit margins by 20%'
  },
  {
    problemId: 'budget-planning-chaos',
    categoryId: 'financial-intelligence',
    subServiceId: 'budgetPlanningForecasting',
    specificSolution: 'Smart Budget Management System',
    deliverables: [
      'Annual budget framework with scenarios',
      'Monthly budget monitoring dashboard',
      'Variance analysis and adjustment protocols',
      'Department-level budget accountability'
    ],
    timeline: '4-5 weeks',
    investmentRange: '$3,500 - $9,000',
    roi: '250-450% ROI through better resource allocation',
    caseStudyExample: 'Kenyan NGO improved budget accuracy by 85%, reduced waste by $40K annually'
  },

  // MARKET RESEARCH SOLUTIONS
  {
    problemId: 'market-opportunity-blindness',
    categoryId: 'market-research',
    subServiceId: 'industryMarketReviews',
    specificSolution: 'Market Intelligence System',
    deliverables: [
      'Comprehensive market opportunity analysis',
      'Competitive landscape mapping',
      'Customer segmentation and targeting',
      'Growth strategy recommendations'
    ],
    timeline: '3-5 weeks',
    investmentRange: '$4,000 - $10,000',
    roi: '200-500% ROI through new opportunities',
    caseStudyExample: 'Nigerian tech company identified $2M market opportunity, launched successful new product line'
  },
  {
    problemId: 'startup-validation-risk',
    categoryId: 'market-research',
    subServiceId: 'startupFeasibilitySupport',
    specificSolution: 'Startup Validation Package',
    deliverables: [
      'Market demand validation study',
      'Target customer analysis',
      'Competitive positioning strategy',
      'Financial feasibility assessment'
    ],
    timeline: '3-4 weeks',
    investmentRange: '$2,500 - $7,000',
    roi: '1000%+ ROI through failure prevention',
    caseStudyExample: 'Ghanaian startup validated market, attracted $500K investment, avoided common pitfalls'
  },
  {
    problemId: 'investor-readiness-gap',
    categoryId: 'market-research',
    subServiceId: 'investorPartnerSupport',
    specificSolution: 'Investment Readiness Package',
    deliverables: [
      'Professional pitch deck development',
      'Market size quantification analysis',
      'Financial projections with scenarios',
      'Due diligence preparation materials'
    ],
    timeline: '4-6 weeks',
    investmentRange: '$5,000 - $15,000',
    roi: '500-2000% ROI through successful fundraising',
    caseStudyExample: 'Tanzanian fintech raised $1.2M after professional pitch development, 3x higher valuation'
  }
];

// FOCUSED MARKET SEGMENTS (Addressing "Too Broad Scope" Issue)
export const marketSegments: MarketSegment[] = [
  {
    id: 'african-growth-smes',
    name: 'African Growth SMEs',
    description: 'Small to medium enterprises in Africa with 10-200 employees, annual revenue $100K-$5M, looking to scale operations and improve efficiency',
    size: '$2.3B market, 45M SMEs across Africa',
    growthRate: '15-25% annual growth',
    paymentCapacity: 'medium',
    urgency: 'high',
    competition: 'low',
    entryStrategy: 'Data Health Check lead magnet, LinkedIn outreach to founders/finance leaders',
    leadMagnet: 'Free "SME Data Readiness Assessment" - 2-hour consultation identifying top 3 data opportunities',
    pricing: {
      starter: '$2,500 - $7,500',
      growth: '$7,500 - $25,000',
      enterprise: '$25,000 - $75,000'
    }
  },
  {
    id: 'african-fintech-startups',
    name: 'African Fintech & Tech Startups',
    description: 'Technology companies aged 6 months-3 years, seeking investment readiness and market validation',
    size: '$500M market, 2,000+ active startups',
    growthRate: '40-60% annual growth',
    paymentCapacity: 'medium',
    urgency: 'high',
    competition: 'medium',
    entryStrategy: 'Partnership with accelerators, webinar series on "Data-Driven Growth for African Startups"',
    leadMagnet: 'Free "Startup Validation Toolkit" - Templates and frameworks for market validation',
    pricing: {
      starter: '$1,500 - $5,000',
      growth: '$5,000 - $15,000',
      enterprise: '$15,000 - $50,000'
    }
  },
  {
    id: 'african-financial-institutions',
    name: 'African Financial Institutions',
    description: 'Banks, microfinance, SACCOs, and credit unions needing compliance support and risk analytics',
    size: '$1.2B market, 2,500+ institutions',
    growthRate: '10-20% annual growth',
    paymentCapacity: 'high',
    urgency: 'high',
    competition: 'medium',
    entryStrategy: 'Regulatory compliance workshops, partnership with financial sector associations',
    leadMagnet: 'Free "Financial Institution Compliance Checklist" - Comprehensive audit tool',
    pricing: {
      starter: '$5,000 - $15,000',
      growth: '$15,000 - $50,000',
      enterprise: '$50,000 - $200,000'
    }
  }
];

// SPECIFIC DIFFERENTIATION STRATEGIES (Addressing "Unclear Differentiation" Issue)
export const differentiationStrategies = {
  primaryDifferentiators: [
    {
      title: 'African Market Specialization',
      description: 'Deep understanding of African business challenges, regulatory environments, and cultural contexts that global firms miss',
      proof: 'Portfolio of 50+ African organizations across 12 countries'
    },
    {
      title: 'Affordable Excellence Model',
      description: 'Premium analytics quality at 40-60% lower cost than international consultants, with payment plans for growing businesses',
      proof: 'Average project cost 50% below international competitors with same quality outcomes'
    },
    {
      title: 'Implementation-Focused Approach',
      description: 'Not just analysis and recommendations - we build systems, train teams, and ensure sustainable adoption',
      proof: '95% of clients still using our systems 12 months after implementation'
    },
    {
      title: 'Growth-Stage Business Focus',
      description: 'Specialized in businesses at the growth inflection point - moving from founder-driven to data-driven operations',
      proof: 'Portfolio companies achieved average 35% revenue growth in 18 months post-engagement'
    }
  ],
  competitivePositioning: {
    vsInternationalConsultants: {
      opposition: {
        title: 'International Consultants',
        features: ['Slow delivery', 'Foreign approach', 'Premium pricing']
      },
      andeda: {
        title: 'Andeda',
        features: ['Fast delivery', 'African context', 'Affordable solutions']
      }
    },
    vsLocalConsultants: {
      opposition: {
        title: 'Local Consultants', 
        features: ['Basic tools', 'Limited frameworks', 'Inconsistent outcomes']
      },
      andeda: {
        title: 'Andeda',
        features: ['Advanced analytics', 'Proven systems', 'Quality delivery']
      }
    }
  }
};

export const getProblemsForCategory = (categoryId: string) => {
  // Collect unique problemIds that belong to the category
  const uniqueProblemIds = new Set(
    solutionMappings
      .filter((mapping) => mapping.categoryId === categoryId)
      .map((mapping) => mapping.problemId)
  );

  // Map to unique ProblemStatement objects, filtering out any undefined
  const uniqueProblems = Array.from(uniqueProblemIds)
    .map((id) => problemStatements.find((problem) => problem.id === id))
    .filter((p): p is ProblemStatement => Boolean(p));

  return uniqueProblems;
};

export const getSolutionsForProblem = (problemId: string) => {
  return solutionMappings.filter(mapping => mapping.problemId === problemId);
};

export const getMarketSegmentForAudience = (audienceType: string) => {
  const segmentMap: Record<string, string> = {
    'SMEs': 'african-growth-smes',
    'Startups': 'african-fintech-startups',
    'Financial Institutions': 'african-financial-institutions'
  };
  
  const segmentId = segmentMap[audienceType];
  return marketSegments.find(segment => segment.id === segmentId);
};
