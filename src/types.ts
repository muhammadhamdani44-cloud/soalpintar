export interface QuestionItem {
  number: number;
  type: string;
  material: string;
  tp: string;
  indicator: string;
  bloom: string;
  solo: string;
  barrett: string;
  difficulty: string;
  stimulus?: string;
  question: string;
  options?: string[];
  key: string;
  explanation: string;
}

export interface BlueprintItem {
  no: number;
  materi: string;
  tp: string;
  indicator: string;
  bloom: string;
  solo: string;
  barrett: string;
  type: string;
}

export interface QualityAnalysis {
  score: number;
  criteria: Array<{
    name: string;
    status: string;
    detail?: string;
  }>;
}

export interface BankSoalItem {
  id: string;
  date: string;
  title: string;
  phase: string;
  class: string;
  subject: string;
  total: number;
  questions: QuestionItem[];
  blueprint: BlueprintItem[];
}

export interface HistoryItem {
  id: string;
  date: string;
  name: string;
  subject: string;
  class: string;
  total: number;
  difficulty: string;
  questions: QuestionItem[];
  blueprint: BlueprintItem[];
}

export interface QuestionCounts {
  multipleChoice: number;
  complexMC: number;
  complexTF: number;
  matching: number;
  shortAnswer: number;
  essay: number;
  longEssay: number;
}

export interface BloomLevels {
  C1: boolean;
  C2: boolean;
  C3: boolean;
  C4: boolean;
  C5: boolean;
  C6: boolean;
}

export interface BloomPercentages {
  C1: number;
  C2: number;
  C3: number;
  C4: number;
  C5: number;
  C6: number;
}

export interface SoloLevels {
  unistructural: boolean;
  multistructural: boolean;
  relational: boolean;
  extendedAbstract: boolean;
}

export interface BarrettLevels {
  literal: boolean;
  reorganization: boolean;
  inferential: boolean;
  evaluation: boolean;
}

export interface LiteracyOptions {
  literacy: boolean;
  numeracy: boolean;
  digitalLiteracy: boolean;
  criticalThinking: boolean;
  problemSolving: boolean;
  contextual: boolean;
}
