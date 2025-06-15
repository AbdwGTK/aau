/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRepoStore } from "@/Store/useRepoStore";
import SearchInput from "@/Components/SearchInput";
import RepoList from "@/Components/Repo/RepoList";
import Loader from "@/Components/Loader";
import ErrorState from "@/Components/ErrorState";
import EmptyState from "@/Components/EmptyState";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useThemeStore } from "@/Store/useThemeStore";
import Header from "@/Components/Header";

function useInfiniteScroll({
  hasMore,
  loading,
  error,
  loadMore,
}: {
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  loadMore: () => void;
}) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "100px" });

  useEffect(() => {
    if (inView && hasMore && !loading && !error) {
      loadMore();
    }
  }, [inView, hasMore, loading, error, loadMore]);

  return ref;
}

function ExplorerHeader({
  q,
  setQuery,
  search,
}: {
  q: string;
  setQuery: (query: string) => void;
  search: (query: string, page: number) => void;
}) {
  return (
    <header className="py-8 sm:py-10">
      <div className="max-w-2xl mx-auto w-full px-2 sm:px-4">
        <Header />
        <SearchInput
          value={q}
          onChange={(val) => {
            setQuery(val);
            search(val, 1);
          }}
          placeholder="Search GitHub repositories..."
          debounceMs={500}
        />
      </div>
    </header>
  );
}

function ExplorerMain({
  repos,
  loading,
  error,
  hasMore,
  loadMoreRef,
}: {
  repos: any[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMoreRef: (node?: Element | null) => void;
}) {
  if (error) return <ErrorState message={error} />;
  if (!error && repos.length === 0 && !loading) return <EmptyState />;

  return (
    <>
      <RepoList repos={repos} />
      {repos.length === 0 && loading && <Loader />}
      {repos.length > 0 && hasMore && (
        <div ref={loadMoreRef} className="flex justify-center my-8 sm:my-10">
          {loading && <Loader />}
        </div>
      )}
    </>
  );
}

function useRepositoryExplorer() {
  const { q, repos, loading, error, hasMore, setQuery, search, loadMore } =
    useRepoStore();
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const t = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(t);
  }, [setTheme]);

  return {
    q,
    repos,
    loading,
    error,
    hasMore,
    setQuery,
    search,
    loadMore,
  };
}

export default function RepositoryExplorer() {
  const { q, repos, loading, error, hasMore, setQuery, search, loadMore } =
    useRepositoryExplorer();
  const loadMoreRef = useInfiniteScroll({ hasMore, loading, error, loadMore });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <ExplorerHeader q={q} setQuery={setQuery} search={search} />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-6xl px-2 sm:px-4 flex flex-col transition-all">
          <ExplorerMain
            repos={repos}
            loading={loading}
            error={error}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
          />
        </div>
      </main>
    </div>
  );
}
