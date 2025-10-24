import type { SUBJECTS } from './constants/quests';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SequenceGame {
  type: 'sequence';
  title: string;
  instructions: string;
  items: string[]; // Correct order
}

export interface MatchingGame {
  type: 'matching';
  title: string;
  instructions: string;
  prompts: string[];
  answers: string[]; // Correct answer for prompts[i] is answers[i]
}

export interface TrueFalseGame {
  type: 'true_false';
  title: string;
  instructions: string;
  statements: {
    text: string;
    isTrue: boolean;
  }[];
}

export interface QuickQuizGame {
  type: 'quick_quiz';
  title: string;
  instructions: string;
  questions: QuizQuestion[];
}


// Can be expanded with more game types in the future
export type MiniGame = SequenceGame | MatchingGame | TrueFalseGame | QuickQuizGame;

export interface Quest {
  name: string;
  description: string;
  learningObjective: string;
  rewards: string;
  miniQuiz: QuizQuestion[];
  aiPromptSuggestion: string;
  miniGame?: MiniGame;
}

export interface Subject {
  name: string;
  icon: string;
  quests: Quest[];
}

export type SubjectKey = keyof typeof SUBJECTS;

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}