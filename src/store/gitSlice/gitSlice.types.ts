import type { BiDirectedGraph } from "~/types/graph";

export type GitStoreState = {
  lesson: number;
  activeGraph: BiDirectedGraph | undefined;
  // questions: Record<string, QuestionCardInfo>;
};

export type GitSlice = GitStoreState & {
  setActiveGraph: (newActiveGraph: BiDirectedGraph) => void;
  // getPendingCount: (allQuestions: string[]) => number;
  // getPendingQuestions: (allQuestions: Question[]) => DatedQuestionCard[];
  // updateQuestion: (questionId: string, diff: number) => void;
};
