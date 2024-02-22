import type { StateCreator } from "zustand";
import type { gitStoreMiddlewares, StoreState } from "~/store";
import type { GitSlice } from "./gitSlice.types";
import { BiDirectedGraph } from "~/types/graph";

export const createGitSlice: StateCreator<
  StoreState,
  [...gitStoreMiddlewares],
  [],
  GitSlice
> = (set, get) => ({
  lesson: 1,
  activeGraph: undefined,

  setActiveGraph: (newActiveGraph: BiDirectedGraph) => {
    set({
      activeGraph: newActiveGraph,
    });
  },
});
