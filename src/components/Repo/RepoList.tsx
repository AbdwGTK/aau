import type { RepoCardProps } from "@/Types";
import RepoCard from "@/Components/Repo/RepoCard";

type RepoListProps = {
  repos: RepoCardProps[];
};

function EmptyState() {
  return (
    <div className="text-center text-muted-foreground py-12">
      No repositories to display.
    </div>
  );
}

export default function RepoList({ repos }: RepoListProps) {
  if (!repos.length) return <EmptyState />;
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {repos.map((repo) => (
        <RepoCard key={repo.html_url} {...repo} />
      ))}
    </div>
  );
}
