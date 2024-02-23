import type { HierarchyGraph } from "~/types/graph";

export type GitStoreState = {
  lesson: number;
  activeGraph: HierarchyGraph | undefined;
  // questions: Record<string, QuestionCardInfo>;
};

export type GitSlice = GitStoreState & {
  setActiveGraph: (newActiveGraph: HierarchyGraph) => void;
  // getPendingCount: (allQuestions: string[]) => number;
  // getPendingQuestions: (allQuestions: Question[]) => DatedQuestionCard[];
  // updateQuestion: (questionId: string, diff: number) => void;
};
