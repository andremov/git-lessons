import type {} from "~/types/store";

export type GitStoreState = {
  lesson: number;
  // questions: Record<string, QuestionCardInfo>;
};

export type GitSlice = GitStoreState & {
  // getPendingCount: (allQuestions: string[]) => number;
  // getPendingQuestions: (allQuestions: Question[]) => DatedQuestionCard[];
  // updateQuestion: (questionId: string, diff: number) => void;
};
