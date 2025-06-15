import { useEffect } from "react";
import { useRepoStore } from "@/store/useRepoStore";
import SearchInput from "@/components/SearchInput";
import RepoList from "@/components/Repo/RepoList";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const { q, repos, loading, error, hasMore, setQuery, search, loadMore } =
    useRepoStore();

  useEffect(() => {
    if (!q) search("react");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <SearchInput
        value={q}
        onChange={(val) => {
          setQuery(val);
          search(val, 1);
        }}
        placeholder="Search GitHub repositories..."
        debounceMs={500}
      />

      {loading && <Loader />}

      {error && <ErrorState message={error} />}

      {!loading && !error && repos.length === 0 && <EmptyState />}

      {!loading && !error && repos.length > 0 && <RepoList repos={repos} />}

      {!loading && hasMore && (
        <div className="flex justify-center my-6">
          <Button onClick={loadMore}>Load more</Button>
        </div>
      )}
    </div>
  );
}

export default App;
