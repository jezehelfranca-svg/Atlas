export interface AlchemicalParameters {
  grit: number;
  air: number;
  velocity: number;
}

export interface InstrumentDetails {
  name: string;
  category: string;
  heritage: string;
  character: string;
  pioneeredBy?: string;
  masteredBy?: string;
  signatureSound?: string;
  imageUrl?: string;
  est?: string;
  synthesisType?: string;
}

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
  imagePrompt?: string; // Album cover prompt
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
