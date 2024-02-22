"use client";

import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createGitSlice } from "./gitSlice/gitSlice";
import type { GitSlice } from "./gitSlice/gitSlice.types";
import { create } from "zustand";

export type StoreState = GitSlice;

export type gitStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
];

export const useGitStore = create<StoreState>()(
  devtools(
    persist(
      (...methods) => ({
        ...createGitSlice(...methods),
      }),
      {
        name: "gitStore",
        partialize: () => ({}),
        version: 1.3,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
