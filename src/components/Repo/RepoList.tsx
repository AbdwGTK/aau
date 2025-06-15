import RepoCard, { type RepoCardProps } from "./RepoCard";

export default function RepoList({ repos }: { repos: RepoCardProps[] }) {
  if (!repos.length)
    return (
      <div className="text-center text-muted-foreground py-12">
        No repositories to display.
      </div>
    );
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {repos.map((repo) => (
        <RepoCard key={repo.html_url} {...repo} />
      ))}
    </div>
  );
}
