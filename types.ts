export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Theme {
  id: string;
  name: string;
  emoji: string;
}

export interface ImageStyle {
  id: string;
  name: string;
  promptExtension: string;
}

export interface StoryPage {
  page_number: number;
  text: string;
  image_prompt: string;
  image_url: string; // The URL of the generated illustration for this page.
}

export interface StorybookResult {
  storybook_title: string;
  pages: StoryPage[];
  character_image_url: string; // URL to the generated cartoon character
  decorative_background_url: string; // The URL for the decorative background image for text pages
}

// FIX: Added types for the Quiz feature to resolve missing type errors in QuizModal.tsx.
export interface QuizOption {
  text: string;
  emoji: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  answer: string;
}

export interface UserQuizData {
  progress: {
    answeredIds: number[];
  };
  challenge: {
    hourStarted: number;
    quizIds: number[];
    answeredInChallenge: number[];
  };
  lastAdHour: number | null;
}

// Fix: Resolved a TypeScript declaration conflict for `window.aistudio`.
// The error message indicated that a named type `AIStudio` was expected, but an anonymous
// object type was provided, causing a conflict. This change introduces the `AIStudio`
// interface and uses it in the `Window` declaration to ensure type consistency.

// FIX: Removed 'export' to prevent global naming conflicts for the AIStudio interface.
// Since it's only used for type augmentation within this module, scoping it locally
// resolves the "subsequent property declarations must have the same type" error.

declare global {
  // FIX: Moved the AIStudio interface inside `declare global` to properly augment
  // the global scope and resolve "subsequent property declarations" errors.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // FIX: Made `aistudio` optional to resolve an error where multiple declarations had conflicting modifiers. The application code already checks for its existence, confirming it should be optional.
    aistudio?: AIStudio;
    confetti: any;
    jspdf: any;
  }
}

// FIX: Added shared types for the admin panel to ensure type consistency across components and pages.
export type User = {
    id: string;
    name: string | null;
    email: string;
    password?: string; // Hashed password
    plan: string;
    credits: number;
    joinedAt: Date;
    isBanned: boolean;
};

export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PaymentRequest = {
    id: string;
    user: { name: string | null; email: string };
    plan: string; // Changed from 'pack' for consistency
    amount: number;
    method: string;
    txId: string;
    status: PaymentStatus;
    createdAt: Date;
};