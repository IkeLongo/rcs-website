export type AnimatedCircleProps = {
  value: number | null;
  progressColor: string;
  formatScore: (v: number | null) => string;
};

export type Severity = "high" | "med" | "low";

export type IssueSource = "psi" | "hygiene";

export type ScanResult = {
  url: string;
  grade: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  metrics?: {
    lcp: string | null;
    fcp: string | null;
    cls: number | null;
    tbt: string | null;
    speedIndex: string | null;
  };
  issues: Issue[];
  checks?: any;
  psiMeta?: any;
};


export type Issue = {
  key: string;                 // stable mapping key (audit id or hygiene slug)
  title: string;
  severity: Severity;
  source: IssueSource;

  why: string;                 // why it matters (your existing friendlyExplanation)
  fix: string[];               // step-by-step universal actions
  verify?: string[];           // how to confirm it’s fixed
  platformHints?: Record<string, string[]>; // optional
  data?: any;                  // optional raw details for later
};

export type FixTemplate = {
  why?: string; // optional override
  fix: string[];
  verify: string[];
  platformHints?: Record<string, string[]>;
};