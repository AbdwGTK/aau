import RepoCard, { type RepoCardProps } from "./RepoCard";

export default function RepoList({ repos }: { repos: RepoCardProps[] }) {
  if (!repos.length)
    return (
      <div className="text-center text-gray-500 py-8">
        No repositories to display.
      </div>
    );
  return (
    <div className="mt-6">
      {repos.map((repo) => (
        <RepoCard key={repo.html_url} {...repo} />
      ))}
    </div>
  );
}
