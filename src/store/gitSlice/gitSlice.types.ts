import type { DirectedGraph } from "~/types/graph";

export type GitStoreState = {
  lesson: number;
  activeGraph: DirectedGraph | undefined;
  // questions: Record<string, QuestionCardInfo>;
};

export type GitSlice = GitStoreState & {
  setActiveGraph: (newActiveGraph: DirectedGraph) => void;
  // getPendingCount: (allQuestions: string[]) => number;
  // getPendingQuestions: (allQuestions: Question[]) => DatedQuestionCard[];
  // updateQuestion: (questionId: string, diff: number) => void;
};
