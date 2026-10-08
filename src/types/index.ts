export type ClaimVerdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';

export type SourceType = 'Government' | 'Scientific' | 'Fact Check' | 'News' | 'Unknown';

export type StanceType = 'Contradicting' | 'Supporting' | 'Context';

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  type: SourceType;
  reliability: 'High' | 'Medium' | 'Low';
  date: string;
  url: string;
  stance: StanceType;
  quote: string;
  isDemo: boolean;
}

export interface Claim {
  id: string;
  text: string;
  verdict: ClaimVerdict;
  confidence: number; // 0 - 100
  explanation: string;
  sources: EvidenceSource[];
}

export type TacticCategory =
  | 'fear'
  | 'urgency'
  | 'authority'
  | 'clickbait'
  | 'emotion'
  | 'statistics'
  | 'social'
  | 'conspiracy';

export interface ManipulationTactic {
  id: string;
  name: string;
  category: TacticCategory;
  matchedText: string;
  startIndex?: number;
  endIndex?: number;
  explanation: string;
  userTip: string;
  color: string;
}

export type OverallRisk = 'HIGH RISK' | 'MODERATE RISK' | 'LOW RISK' | 'UNVERIFIED RISK';

export interface RiskMetrics {
  truthfulness: number; // 0 - 100 (high = truthful)
  evidenceStrength: number; // 0 - 100
  manipulationRisk: number; // 0 - 100 (high = heavily manipulated)
  sourceReliability: number; // 0 - 100
}

export interface LanguageContent {
  summary: string;
  eli15: string;
  actionTip: string;
  verdictLabel: string;
}

export interface MisinformationVaccine {
  tacticEncountered: string;
  howTrickWorks: string;
  howToProtect: string;
  nextTimeExample: string;
  microQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ImageAnalysisData {
  isAiGeneratedEstimate: 'Likely AI-generated' | 'Possibly edited' | 'No obvious AI indicators' | 'Unable to determine';
  confidence: number;
  signals: string[];
  reverseSearchQuery: string;
  disclaimer: string;
}

export interface AnalysisResult {
  id: string;
  rawText: string;
  title?: string;
  sourceType: 'text' | 'screenshot' | 'url';
  overallRisk: OverallRisk;
  riskScore: number; // 0 - 100 (high = dangerous misinformation)
  confidenceScore: number; // 0 - 100 (model confidence)
  summary: string;
  metrics: RiskMetrics;
  claims: Claim[];
  tactics: ManipulationTactic[];
  eli15Explanation: string;
  translations: {
    en: LanguageContent;
    ta: LanguageContent;
    hi: LanguageContent;
    ml: LanguageContent;
  };
  vaccine: MisinformationVaccine;
  imageAnalysis?: ImageAnalysisData;
  timestamp: string;
}

export interface GameQuestion {
  id: string;
  scenario: string;
  sourceContext: string;
  targetTactic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tacticCategory: TacticCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface LearningLesson {
  id: string;
  title: string;
  tactic: string;
  category: TacticCategory;
  summary: string;
  whatIsIt: string;
  realWorldExample: string;
  redFlags: string[];
  whatShouldYouDo: string[];
  readingTime: string;
}
