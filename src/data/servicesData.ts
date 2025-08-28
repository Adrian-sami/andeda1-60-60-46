import { 
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Activity,
  TrendingDown,
  PieChart,
  FileText,
  Target,
  Settings,
  Shield,
  CheckCircle,
  Search,
  UserCheck,
  Lightbulb,
  HandHeart,
  Calculator,
  Calendar,
  Wallet,
  AlertTriangle,
  Globe,
  Eye,
  Rocket,
  UserPlus,
  Clock,
  Zap,
  Brain,
  Award,
  LineChart,
  Database,
  Filter,
  Briefcase,
  TrendingDown as TrendingDownIcon,
  ArrowUp,
  Star,
  ChartBar,
  Gauge,
  Building,
  Users2,
  Banknote,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  MapPin,
  Compass,
  Heart,
  Handshake
} from 'lucide-react';

export interface SubService {
  title: string;
  description: string;
  benefits: Array<{
    text: string;
    icon: any;
  }>;
  icon: any;
}

export interface ServiceCategory {
  id: string;
  icon: any;
  title: string;
  description: string;
  subServices: SubService[];
}

export const getServiceCategories = (t: (key: string) => string) => [
  {
    id: 'data-analytics',
    icon: BarChart3,
    title: t('services.dataAnalytics.title'),
    description: t('services.dataAnalytics.description'),
    subServices: [
      {
        title: t('services.dataAnalytics.subServices.performanceAnalysis.title'),
        description: t('services.dataAnalytics.subServices.performanceAnalysis.description'),
        icon: Activity,
        benefits: [
          {
            text: t('services.dataAnalytics.subServices.performanceAnalysis.benefits.0'),
            icon: Brain
          },
          {
            text: t('services.dataAnalytics.subServices.performanceAnalysis.benefits.1'),
            icon: Zap
          },
          {
            text: t('services.dataAnalytics.subServices.performanceAnalysis.benefits.2'),
            icon: Award
          },
          {
            text: t('services.dataAnalytics.subServices.performanceAnalysis.benefits.3'),
            icon: LineChart
          }
        ]
      },
      {
        title: t('services.dataAnalytics.subServices.forecasting.title'),
        description: t('services.dataAnalytics.subServices.forecasting.description'),
        icon: TrendingDown,
        benefits: [
          {
            text: t('services.dataAnalytics.subServices.forecasting.benefits.0'),
            icon: Clock
          },
          {
            text: t('services.dataAnalytics.subServices.forecasting.benefits.1'),
            icon: TrendingUp
          },
          {
            text: t('services.dataAnalytics.subServices.forecasting.benefits.2'),
            icon: Target
          },
          {
            text: t('services.dataAnalytics.subServices.forecasting.benefits.3'),
            icon: Calculator
          }
        ]
      },
      {
        title: t('services.dataAnalytics.subServices.visualReporting.title'),
        description: t('services.dataAnalytics.subServices.visualReporting.description'),
        icon: PieChart,
        benefits: [
          {
            text: t('services.dataAnalytics.subServices.visualReporting.benefits.0'),
            icon: Eye
          },
          {
            text: t('services.dataAnalytics.subServices.visualReporting.benefits.1'),
            icon: PieChart
          },
          {
            text: t('services.dataAnalytics.subServices.visualReporting.benefits.2'),
            icon: Database
          },
          {
            text: t('services.dataAnalytics.subServices.visualReporting.benefits.3'),
            icon: Filter
          }
        ]
      },
      {
        title: t('services.dataAnalytics.subServices.customReporting.title'),
        description: t('services.dataAnalytics.subServices.customReporting.description'),
        icon: FileText,
        benefits: [
          {
            text: t('services.dataAnalytics.subServices.customReporting.benefits.0'),
            icon: FileText
          },
          {
            text: t('services.dataAnalytics.subServices.customReporting.benefits.1'),
            icon: Settings
          },
          {
            text: t('services.dataAnalytics.subServices.customReporting.benefits.2'),
            icon: Briefcase
          },
          {
            text: t('services.dataAnalytics.subServices.customReporting.benefits.3'),
            icon: ArrowUp
          }
        ]
      }
    ]
  },
  {
    id: 'consulting',
    icon: TrendingUp,
    title: t('services.consulting.title'),
    description: t('services.consulting.description'),
    subServices: [
      {
        title: t('services.consulting.subServices.dataBasedConsulting.title'),
        description: t('services.consulting.subServices.dataBasedConsulting.description'),
        icon: Target,
        benefits: [
          {
            text: t('services.consulting.subServices.dataBasedConsulting.benefits.0'),
            icon: Lightbulb
          },
          {
            text: t('services.consulting.subServices.dataBasedConsulting.benefits.1'),
            icon: ChartBar
          },
          {
            text: t('services.consulting.subServices.dataBasedConsulting.benefits.2'),
            icon: Star
          },
          {
            text: t('services.consulting.subServices.dataBasedConsulting.benefits.3'),
            icon: Gauge
          }
        ]
      },
      {
        title: t('services.consulting.subServices.operationalConsulting.title'),
        description: t('services.consulting.subServices.operationalConsulting.description'),
        icon: Settings,
        benefits: [
          {
            text: t('services.consulting.subServices.operationalConsulting.benefits.0'),
            icon: Settings
          },
          {
            text: t('services.consulting.subServices.operationalConsulting.benefits.1'),
            icon: Zap
          },
          {
            text: t('services.consulting.subServices.operationalConsulting.benefits.2'),
            icon: Building
          },
          {
            text: t('services.consulting.subServices.operationalConsulting.benefits.3'),
            icon: Award
          }
        ]
      },
      {
        title: t('services.consulting.subServices.managementConsulting.title'),
        description: t('services.consulting.subServices.managementConsulting.description'),
        icon: UserCheck,
        benefits: [
          {
            text: t('services.consulting.subServices.managementConsulting.benefits.0'),
            icon: Users2
          },
          {
            text: t('services.consulting.subServices.managementConsulting.benefits.1'),
            icon: Target
          },
          {
            text: t('services.consulting.subServices.managementConsulting.benefits.2'),
            icon: TrendingUp
          },
          {
            text: t('services.consulting.subServices.managementConsulting.benefits.3'),
            icon: Briefcase
          }
        ]
      },
      {
        title: t('services.consulting.subServices.complianceStatusReview.title'),
        description: t('services.consulting.subServices.complianceStatusReview.description'),
        icon: Shield,
        benefits: [
          {
            text: t('services.consulting.subServices.complianceStatusReview.benefits.0'),
            icon: ShieldCheck
          },
          {
            text: t('services.consulting.subServices.complianceStatusReview.benefits.1'),
            icon: AlertCircle
          },
          {
            text: t('services.consulting.subServices.complianceStatusReview.benefits.2'),
            icon: BookOpen
          },
          {
            text: t('services.consulting.subServices.complianceStatusReview.benefits.3'),
            icon: CheckCircle
          }
        ]
      }
    ]
  },
  {
    id: 'financial-intelligence',
    icon: DollarSign,
    title: t('services.financialIntelligence.title'),
    description: t('services.financialIntelligence.description'),
    subServices: [
      {
        title: t('services.financialIntelligence.subServices.financialHealthReview.title'),
        description: t('services.financialIntelligence.subServices.financialHealthReview.description'),
        icon: CheckCircle,
        benefits: [
          {
            text: t('services.financialIntelligence.subServices.financialHealthReview.benefits.0'),
            icon: Gauge
          },
          {
            text: t('services.financialIntelligence.subServices.financialHealthReview.benefits.1'),
            icon: Eye
          },
          {
            text: t('services.financialIntelligence.subServices.financialHealthReview.benefits.2'),
            icon: TrendingUp
          },
          {
            text: t('services.financialIntelligence.subServices.financialHealthReview.benefits.3'),
            icon: Award
          }
        ]
      },
      {
        title: t('services.financialIntelligence.subServices.budgetPlanningForecasting.title'),
        description: t('services.financialIntelligence.subServices.budgetPlanningForecasting.description'),
        icon: Calendar,
        benefits: [
          {
            text: t('services.financialIntelligence.subServices.budgetPlanningForecasting.benefits.0'),
            icon: Calendar
          },
          {
            text: t('services.financialIntelligence.subServices.budgetPlanningForecasting.benefits.1'),
            icon: Calculator
          },
          {
            text: t('services.financialIntelligence.subServices.budgetPlanningForecasting.benefits.2'),
            icon: Target
          },
          {
            text: t('services.financialIntelligence.subServices.budgetPlanningForecasting.benefits.3'),
            icon: Banknote
          }
        ]
      },
      {
        title: t('services.financialIntelligence.subServices.cashFlowManagement.title'),
        description: t('services.financialIntelligence.subServices.cashFlowManagement.description'),
        icon: Wallet,
        benefits: [
          {
            text: t('services.financialIntelligence.subServices.cashFlowManagement.benefits.0'),
            icon: Wallet
          },
          {
            text: t('services.financialIntelligence.subServices.cashFlowManagement.benefits.1'),
            icon: LineChart
          },
          {
            text: t('services.financialIntelligence.subServices.cashFlowManagement.benefits.2'),
            icon: Clock
          },
          {
            text: t('services.financialIntelligence.subServices.cashFlowManagement.benefits.3'),
            icon: Zap
          }
        ]
      },
      {
        title: t('services.financialIntelligence.subServices.riskComplianceSupport.title'),
        description: t('services.financialIntelligence.subServices.riskComplianceSupport.description'),
        icon: AlertTriangle,
        benefits: [
          {
            text: t('services.financialIntelligence.subServices.riskComplianceSupport.benefits.0'),
            icon: Shield
          },
          {
            text: t('services.financialIntelligence.subServices.riskComplianceSupport.benefits.1'),
            icon: AlertTriangle
          },
          {
            text: t('services.financialIntelligence.subServices.riskComplianceSupport.benefits.2'),
            icon: BookOpen
          },
          {
            text: t('services.financialIntelligence.subServices.riskComplianceSupport.benefits.3'),
            icon: CheckCircle
          }
        ]
      }
    ]
  },
  {
    id: 'market-research',
    icon: Users,
    title: t('services.marketResearch.title'),
    description: t('services.marketResearch.description'),
    subServices: [
      {
        title: t('services.marketResearch.subServices.industryMarketReviews.title'),
        description: t('services.marketResearch.subServices.industryMarketReviews.description'),
        icon: Globe,
        benefits: [
          {
            text: t('services.marketResearch.subServices.industryMarketReviews.benefits.0'),
            icon: Globe
          },
          {
            text: t('services.marketResearch.subServices.industryMarketReviews.benefits.1'),
            icon: MapPin
          },
          {
            text: t('services.marketResearch.subServices.industryMarketReviews.benefits.2'),
            icon: Compass
          },
          {
            text: t('services.marketResearch.subServices.industryMarketReviews.benefits.3'),
            icon: TrendingUp
          }
        ]
      },
      {
        title: t('services.marketResearch.subServices.customerInsights.title'),
        description: t('services.marketResearch.subServices.customerInsights.description'),
        icon: Eye,
        benefits: [
          {
            text: t('services.marketResearch.subServices.customerInsights.benefits.0'),
            icon: Eye
          },
          {
            text: t('services.marketResearch.subServices.customerInsights.benefits.1'),
            icon: Users
          },
          {
            text: t('services.marketResearch.subServices.customerInsights.benefits.2'),
            icon: Target
          },
          {
            text: t('services.marketResearch.subServices.customerInsights.benefits.3'),
            icon: Heart
          }
        ]
      },
      {
        title: t('services.marketResearch.subServices.startupFeasibilitySupport.title'),
        description: t('services.marketResearch.subServices.startupFeasibilitySupport.description'),
        icon: Rocket,
        benefits: [
          {
            text: t('services.marketResearch.subServices.startupFeasibilitySupport.benefits.0'),
            icon: Rocket
          },
          {
            text: t('services.marketResearch.subServices.startupFeasibilitySupport.benefits.1'),
            icon: Lightbulb
          },
          {
            text: t('services.marketResearch.subServices.startupFeasibilitySupport.benefits.2'),
            icon: Globe
          },
          {
            text: t('services.marketResearch.subServices.startupFeasibilitySupport.benefits.3'),
            icon: Star
          }
        ]
      },
      {
        title: t('services.marketResearch.subServices.investorPartnerSupport.title'),
        description: t('services.marketResearch.subServices.investorPartnerSupport.description'),
        icon: UserPlus,
        benefits: [
          {
            text: t('services.marketResearch.subServices.investorPartnerSupport.benefits.0'),
            icon: UserPlus
          },
          {
            text: t('services.marketResearch.subServices.investorPartnerSupport.benefits.1'),
            icon: Handshake
          },
          {
            text: t('services.marketResearch.subServices.investorPartnerSupport.benefits.2'),
            icon: Users2
          },
          {
            text: t('services.marketResearch.subServices.investorPartnerSupport.benefits.3'),
            icon: TrendingUp
          }
        ]
      }
    ]
  }
];