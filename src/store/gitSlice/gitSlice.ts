import type { StateCreator } from "zustand";
import type { gitStoreMiddlewares, StoreState } from "~/store";
import type { GitSlice } from "./gitSlice.types";
import type { DirectedGraph } from "~/types/graph";

export const createGitSlice: StateCreator<
  StoreState,
  [...gitStoreMiddlewares],
  [],
  GitSlice
> = (set, get) => ({
  lesson: 1,
  activeGraph: undefined,

  setActiveGraph: (newActiveGraph: DirectedGraph) => {
    set({
      activeGraph: newActiveGraph,
    });
  },
});
