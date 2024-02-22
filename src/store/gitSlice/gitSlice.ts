import type { StateCreator } from "zustand";
import type { gitStoreMiddlewares, StoreState } from "~/store";
import type { GitSlice } from "./gitSlice.types";

export const createGitSlice: StateCreator<
  StoreState,
  [...gitStoreMiddlewares],
  [],
  GitSlice
> = (set, get) => ({
  lesson: 1,
});
