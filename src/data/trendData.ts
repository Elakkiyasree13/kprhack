export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
  riskAverage: number;
  color: string;
}

export interface TacticStat {
  tactic: string;
  count: number;
  percentage: number;
  example: string;
  color: string;
}

export interface RecentDebunk {
  id: string;
  claim: string;
  verdict: 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  category: string;
  primaryTactic: string;
  date: string;
  verifiedBy: string;
}

export const COMMUNITY_TRENDS = {
  totalAnalyzed: 10482,
  falseClaims: 4312,
  misleadingClaims: 3420,
  unverifiedClaims: 2110,
  trueClaims: 640,
  languagesSupported: 4,
  manipulationTacticsDetected: 12,
  clarityScore: 92,
  categories: [
    { category: 'Health & Wellness', count: 3564, percentage: 34, riskAverage: 91, color: '#06b6d4' },
    { category: 'Governance & Politics', count: 2725, percentage: 26, riskAverage: 84, color: '#f59e0b' },
    { category: 'Jobs & Employment', count: 1886, percentage: 18, riskAverage: 95, color: '#ec4899' },
    { category: 'Financial & Schemes', count: 1257, percentage: 12, riskAverage: 93, color: '#10b981' },
    { category: 'Science & Technology', count: 1050, percentage: 10, riskAverage: 68, color: '#8b5cf6' },
  ] as CategoryStat[],
  tactics: [
    { tactic: 'False Urgency', count: 3820, percentage: 36, example: 'Share before midnight / before it gets deleted!', color: '#f43f5e' },
    { tactic: 'Fake Authority', count: 3140, percentage: 30, example: 'Top European doctors / NASA scientists confirm...', color: '#3b82f6' },
    { tactic: 'Clickbait & Greed', count: 2620, percentage: 25, example: 'Get ₹50,000 cash grant by clicking this link!', color: '#f59e0b' },
    { tactic: 'Outrage Bait', count: 2310, percentage: 22, example: 'THIS WILL MAKE YOUR BLOOD BOIL! Retweet now!', color: '#ef4444' },
    { tactic: 'Social Pressure', count: 1890, percentage: 18, example: 'Forward to 20 friends to activate benefits', color: '#a855f7' },
    { tactic: 'Misleading Statistics', count: 1540, percentage: 15, example: 'Crimes spiked 340% under the new governor', color: '#06b6d4' },
    { tactic: 'Conspiracy Framing', count: 1320, percentage: 13, example: 'Secret truth mainstream media is banning', color: '#6366f1' },
  ] as TacticStat[],
  recentDebunks: [
    {
      id: 'd1',
      claim: 'Ministry offering ₹25,000 laptop subsidy on submitting bank OTP',
      verdict: 'FALSE',
      category: 'Financial & Schemes',
      primaryTactic: 'Phishing & False Urgency',
      date: '2 hours ago',
      verifiedBy: 'PIB Fact Check',
    },
    {
      id: 'd2',
      claim: 'Boiling guava leaves with turmeric eliminates all viruses in 24 hours',
      verdict: 'FALSE',
      category: 'Health & Wellness',
      primaryTactic: 'Fake Authority & Panacea',
      date: '5 hours ago',
      verifiedBy: 'WHO / ICMR Desk',
    },
    {
      id: 'd3',
      claim: 'Unemployment rate soared to 48% across urban youth in Q3',
      verdict: 'MISLEADING',
      category: 'Governance & Politics',
      primaryTactic: 'Misleading Statistics',
      date: '1 day ago',
      verifiedBy: 'National Statistical Bureau',
    },
    {
      id: 'd4',
      claim: 'WhatsApp charging ₹50 per user unless green badge forward is shared',
      verdict: 'FALSE',
      category: 'Science & Technology',
      primaryTactic: 'Chain Forwarding & Urgency',
      date: '2 days ago',
      verifiedBy: 'Meta Trust & Safety',
    },
    {
      id: 'd5',
      claim: 'Leaked satellite images show mysterious underground river in desert',
      verdict: 'UNVERIFIED',
      category: 'Science & Technology',
      primaryTactic: 'Clickbait & Synthetic Media',
      date: '3 days ago',
      verifiedBy: 'Geological Survey Archives',
    },
  ] as RecentDebunk[],
};
