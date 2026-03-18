export interface InstrumentCategory {
  name: string;
  items: string[];
}

export interface ElementBreakdown {
  element: string;
  description: string;
}

export interface GeneratedContent {
  fullPrompt: string; // Standard prompt OR Combined representation
  elementBreakdown?: ElementBreakdown[]; // Standard Mode only
  styleTags?: string; // Dirty Tricks Mode only
  lyrics?: string; // Dirty Tricks Mode only
  isDirtyTricks?: boolean;
}

export interface PromptHistoryItem {
  id: string;
  input: string;
  output: GeneratedContent;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
