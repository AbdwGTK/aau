import { useRepoStore } from "@/store/useRepoStore";
import SearchInput from "@/components/SearchInput";
import RepoList from "@/components/Repo/RepoList";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

export default function App() {
  const { q, repos, loading, error, hasMore, setQuery, search, loadMore } =
    useRepoStore();

  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const t = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(t);
  }, [setTheme]);

  return (
    <div className="flex flex-col min-h-screen max-w-screen px-4 bg-background text-foreground transition-colors">
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

      <main className="flex-1 flex flex-col items-center ">
        <div
          className={`
            max-w-6xl px-2 sm:px-4
            flex flex-col
            transition-all
          `}
        >
          {loading && <Loader />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && repos.length === 0 && <EmptyState />}
          {!loading && !error && repos.length > 0 && <RepoList repos={repos} />}

          {!loading && !error && repos.length > 0 && hasMore && (
            <div className="flex justify-center my-8 sm:my-10">
              <Button onClick={loadMore} size="lg" className="font-medium">
                Load more
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
