import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, Target, Clock, DollarSign, TrendingUp, 
  CheckCircle, Eye, Zap 
} from 'lucide-react';
import { 
  problemStatements, 
  solutionMappings,
  getProblemsForCategory,
  getSolutionsForProblem 
} from '@/data/problemSolutionMapping';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';

interface ProblemSolutionMatrixProps {
  selectedCategory?: string;
}

export const ProblemSolutionMatrix = ({ selectedCategory: initialCategory = 'data-analytics' }: ProblemSolutionMatrixProps) => {
  const { t, i18n } = useTranslation();
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<'problems' | 'solutions'>('problems');
  const contentRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  // Force re-render when language changes
  useEffect(() => {
    // This effect ensures component re-renders when language changes
    const handleLanguageChange = () => {
      // Force state updates to trigger re-render
      setSelectedCategory(prev => prev);
      setViewMode(prev => prev);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const categories = [
    { id: 'data-analytics', name: t('problemSolution.categories.dataAnalytics'), icon: Target },
    { id: 'consulting', name: t('problemSolution.categories.consulting'), icon: TrendingUp },
    { id: 'financial-intelligence', name: t('problemSolution.categories.financialIntelligence'), icon: DollarSign },
    { id: 'market-research', name: t('problemSolution.categories.marketResearch'), icon: Eye }
  ];

  // Localization helpers
  const trProblemTitle = (p: { id: string; title: string }) =>
    t(`problemSolutionData.problems.${p.id}.title`, { defaultValue: p.title });
  const trProblemDesc = (p: { id: string; description: string }) =>
    t(`problemSolutionData.problems.${p.id}.description`, { defaultValue: p.description });
  const trProblemPain = (p: { id: string }, idx: number, fallback: string) =>
    t(`problemSolutionData.problems.${p.id}.painPoints.${idx}`, { defaultValue: fallback });
  const trAudience = (label: string) =>
    t(`problemSolutionData.audiences.${label}`, { defaultValue: label });

  const trSolutionTitle = (s: { categoryId: string; subServiceId: string; specificSolution: string }) => {
    return t(`problemSolutionData.solutions.${s.categoryId}.${s.subServiceId}.specificSolution`, { defaultValue: s.specificSolution });
  };
  const trDeliverable = (s: { categoryId: string; subServiceId: string }, idx: number, fallback: string) => {
    return t(`problemSolutionData.solutions.${s.categoryId}.${s.subServiceId}.deliverables.${idx}`, { defaultValue: fallback });
  };
  const trCaseStudy = (s: { categoryId: string; subServiceId: string; caseStudyExample?: string }) => {
    return t(`problemSolutionData.solutions.${s.categoryId}.${s.subServiceId}.caseStudyExample`, { defaultValue: s.caseStudyExample || '' });
  };
  const trTimeline = (timeline: string) => {
    const lng = (i18n.language || 'en').toLowerCase();
    if (!timeline) return timeline;
    if (lng.startsWith('es')) return timeline.replace('weeks', 'semanas').replace('week', 'semana');
    if (lng.startsWith('fr')) return timeline.replace('weeks', 'semaines').replace('week', 'semaine');
    return timeline;
  };
  
  const trUrgencyLevel = (urgency: string) => {
    return t(`problemSolution.urgencyLevels.${urgency}`, { defaultValue: urgency });
  };
  
  const trCategoryName = (categoryId: string) => {
    // Map category IDs to proper translation keys
    const categoryMap: { [key: string]: string } = {
      'data-analytics': 'dataAnalytics',
      'consulting': 'consulting',
      'financial-intelligence': 'financialIntelligence',
      'market-research': 'marketResearch'
    };
    const translationKey = categoryMap[categoryId] || categoryId;
    return t(`problemSolution.categories.${translationKey}`, { defaultValue: categoryId.replace('-', ' ') });
  };

  const getFilteredProblems = () => {
    return getProblemsForCategory(selectedCategory);
  };

  const getAllProblems = () => {
    return problemStatements;
  };

  const getProblemSolutions = (problemId: string) => {
    return getSolutionsForProblem(problemId);
  };

  const getAllSolutions = () => {
    return solutionMappings;
  };

  // Auto-select first problem when category changes
  useEffect(() => {
    const filteredProblems = getFilteredProblems();
    if (filteredProblems.length > 0) {
      setSelectedProblem(filteredProblems[0].id);
    }
  }, [selectedCategory]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const displayedSolutions = selectedProblem 
    ? getProblemSolutions(selectedProblem)
    : getAllSolutions();

  return (
    <section key={i18n.language} className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-6 leading-tight capitalize">
            {t('problemSolution.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {t('problemSolution.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedProblem(null);
                    setViewMode('problems');
                    // Scroll to content with a small delay to ensure state updates first
                    setTimeout(() => {
                      contentRef.current?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }, 100);
                  }}
                  className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2"
                >
                  <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="truncate">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          <Button
            variant={viewMode === 'problems' ? "default" : "outline"}
            onClick={() => {
              setViewMode('problems');
              // Scroll to content with a small delay to ensure state updates first
              setTimeout(() => {
                contentRef.current?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }, 100);
            }}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-8 py-1 md:py-2 text-xs md:text-sm transition-all duration-200 hover:scale-105"
          >
            <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
            <span>{t('problemSolution.toggles.businessProblems')}</span>
          </Button>
          <Button
            variant={viewMode === 'solutions' ? "default" : "outline"}
            onClick={() => {
              setViewMode('solutions');
              // Scroll to content with a small delay to ensure state updates first
              setTimeout(() => {
                contentRef.current?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }, 100);
            }}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-8 py-1 md:py-2 text-xs md:text-sm transition-all duration-200 hover:scale-105"
          >
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span>{t('problemSolution.toggles.checkSolutions')}</span>
          </Button>
        </div>

        {/* Note Text */}
        <div className="text-center mb-8">
          <p className="text-base md:text-lg gradient-text animate-fade-in font-medium">
            {t('problemSolution.note')}
          </p>
        </div>

        {/* Content Display */}
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {viewMode === 'problems' ? (
            /* Problems View */
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 mb-8">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h3 className="text-2xl font-bold gradient-text">{t('problemSolution.sections.businessProblems')}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(selectedCategory === 'all-problems' ? getAllProblems() : getFilteredProblems().slice(0, 2)).map((problem) => (
                  <Card 
                    key={problem.id}
                    className="border-2 border-andeda-green/20 hover:border-andeda-blue/50 bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col h-full"
                  >
                    <CardHeader className="pb-3 flex-shrink-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {trCategoryName(solutionMappings.find(mapping => mapping.problemId === problem.id)?.categoryId || 'General')}
                        </Badge>
                        <Badge variant={getUrgencyColor(problem.urgencyLevel)} className="text-xs">
                          {trUrgencyLevel(problem.urgencyLevel)}
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-andeda-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <AnimatedIcon 
                          icon={problem.icon} 
                          className="w-6 h-6 text-white" 
                          animation="zoom-blink" 
                        />
                      </div>
                      <CardTitle className="gradient-heading text-lg leading-tight min-h-[3rem] flex items-center justify-center text-center">
                        {trProblemTitle(problem)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground min-h-[2.5rem] line-clamp-2">
                        {trProblemDesc(problem)}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-2 text-destructive">{t('problemSolution.cards.keyPainPoints')}</h4>
                        <ul className="text-sm text-muted-foreground space-y-2 h-[120px] overflow-hidden">
                          {problem.painPoints.slice(0, 3).map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-destructive mt-1">•</span>
                              <span className="line-clamp-2">{trProblemPain(problem, index, point)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 min-h-[2rem] items-start">
                        {problem.targetAudience.slice(0, 3).map((audience) => (
                          <Badge key={audience} variant="outline" className="text-xs">
                            {trAudience(audience)}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-center pt-2 mt-auto">
                        <div className="bg-destructive/20 text-destructive px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {t('problemSolution.cards.identifiedProblem')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            /* Solutions View */
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 mb-8">
                <CheckCircle className="w-6 h-6 text-andeda-green" />
                <h3 className="text-2xl font-bold gradient-text">{t('problemSolution.sections.availableSolutions')}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(selectedCategory === 'all-solutions' ? getAllSolutions() : getAllSolutions().filter(solution => solution.categoryId === selectedCategory).slice(0, 2)).map((solution, index) => {
                  const problem = problemStatements.find(p => p.id === solution.problemId);
                  return (
                    <Card key={index} className="border-2 border-andeda-green/30 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm hover:border-andeda-blue/50 transition-all duration-300 shadow-elegant flex flex-col h-full">
                      <CardHeader className="pb-4 flex-shrink-0">
                        <div className="flex items-center justify-between gap-4 mb-3 w-full">
                          <Badge variant="outline" className="text-xs capitalize bg-andeda-blue/10">
                            {trCategoryName(solution.categoryId)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {trTimeline(solution.timeline)}
                          </Badge>
                        </div>
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 bg-andeda-gradient rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <CardTitle className="text-lg gradient-heading text-center min-h-[4rem] flex items-center justify-center">
                          <span className="line-clamp-3">{trSolutionTitle(solution)}</span>
                        </CardTitle>
                        <p className="text-sm min-h-[3rem] line-clamp-2 text-center">
                          <span className="text-white font-bold">{t('problemSolution.cards.solves')} {problem ? trProblemTitle(problem) : ''}</span>
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4 flex flex-col flex-1 p-6">
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm mb-3 text-andeda-blue">{t('problemSolution.cards.deliverables')}</h5>
                           <ul className="text-sm text-muted-foreground space-y-2 min-h-[140px]">
                             {solution.deliverables.slice(0, 4).map((deliverable, idx) => (
                               <li key={idx} className="flex items-start gap-2">
                                 <Zap className="w-3 h-3 text-andeda-blue mt-1 flex-shrink-0" />
                                 <span className="text-xs leading-relaxed">{trDeliverable(solution, idx, deliverable)}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                        
                         {solution.caseStudyExample && (
                           <div className="bg-andeda-blue/10 p-2 rounded-lg border border-andeda-blue/20 min-h-[3rem] flex items-start">
                             <div className="w-full">
                               <div className="font-semibold text-sm text-andeda-blue mb-1">{t('problemSolution.cards.caseStudy')}</div>
                               <div className="text-xs text-muted-foreground line-clamp-3">{trCaseStudy(solution)}</div>
                             </div>
                           </div>
                         )}
                        
                        <div className="flex justify-center pt-2 mt-auto">
                          <div className="bg-andeda-green/20 text-andeda-green px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            {t('problemSolution.cards.solutionAvailable')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            )}
        </div>
      </div>
    </section>
  );
};