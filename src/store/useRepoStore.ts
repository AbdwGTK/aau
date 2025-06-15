/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { RepoCardProps } from "@/components/Repo/RepoCard";
import { searchRepositories } from "@/Actions/GetGithubSearch";

export interface RepoApiState {
  q: string;
  repos: RepoCardProps[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

interface RepoApiActions {
  setQuery: (q: string) => void;
  search: (q?: string, page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
}

type RepoStore = RepoApiState & RepoApiActions;

export const useRepoStore = create<RepoStore>()(
  devtools(
    persist(
      (set, get) => ({
        q: "",
        repos: [],
        loading: false,
        error: null,
        totalCount: 0,
        page: 1,
        perPage: 10,
        hasMore: false,

        setQuery: (q: string) => set({ q }),

        search: async (q, page = 1) => {
          const query = (q ?? get().q).trim();

          if (!query) {
            set({
              q: "",
              repos: [],
              totalCount: 0,
              page: 1,
              hasMore: false,
              loading: false,
              error: null,
            });
            return;
          }

          set({ loading: true, error: null });

          try {
            const perPage = get().perPage;
            const {
              repos: newRepos,
              totalCount,
              hasMore,
            } = await searchRepositories({
              q: query,
              page,
              perPage,
            });

            set((state) => ({
              q: query,
              repos: page === 1 ? newRepos : [...state.repos, ...newRepos],
              totalCount,
              page,
              hasMore,
              loading: false,
              error: null,
            }));
          } catch (e: any) {
            set({
              error: e.message || "Failed to fetch repositories",
              loading: false,
              hasMore: false,
            });
          }
        },

        loadMore: async () => {
          const { q, page, perPage, repos, hasMore, loading } = get();
          if (!hasMore || loading) return;

          if (!q.trim()) {
            set({ loading: false });
            return;
          }

          set({ loading: true, error: null });
          try {
            const nextPage = page + 1;
            const { repos: moreRepos, hasMore: nextHasMore } =
              await searchRepositories({
                q,
                page: nextPage,
                perPage,
              });

            set({
              repos: [...repos, ...moreRepos],
              page: nextPage,
              hasMore: nextHasMore,
              loading: false,
              error: null,
            });
          } catch (e: any) {
            set({
              error: e.message || "Failed to fetch more repositories",
              loading: false,
              hasMore: false,
            });
          }
        },

        reset: () =>
          set({
            q: "",
            repos: [],
            loading: false,
            error: null,
            totalCount: 0,
            page: 1,
            hasMore: false,
          }),
      }),
      { name: "repo-store" }
    )
  )
);
