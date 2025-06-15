import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import type { RepoCardProps } from "@/Types";
import { Star, User } from "lucide-react";
import React from "react";

const formatNumber = (num: number) => Intl.NumberFormat().format(num);

const OwnerAvatar: React.FC<{ owner: RepoCardProps["owner"] }> = ({
  owner,
}) => (
  <a href={owner.html_url} target="_blank" rel="noopener noreferrer">
    <img
      src={owner.avatar_url}
      alt={owner.login}
      className="w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 shadow-sm"
    />
  </a>
);

const OwnerName: React.FC<{ owner: RepoCardProps["owner"] }> = ({ owner }) => (
  <span className="flex items-center text-sm text-zinc-800 dark:text-zinc-300 font-medium break-all">
    <User className="w-4 h-4 mr-1 opacity-70" />
    {owner.login}
  </span>
);

const Stargazers: React.FC<{ count: number }> = ({ count }) => (
  <span className="flex items-center text-sm text-yellow-600 dark:text-yellow-400 ml-0 sm:ml-3 font-medium">
    <Star className="w-4 h-4 mr-1" />
    {formatNumber(count)}
  </span>
);

const Topics: React.FC<{ topics: string[] }> = ({ topics }) => (
  <div className="flex flex-wrap w-fit gap-2 mt-2">
    {topics.map((topic) => (
      <span
        key={topic}
        className="text-xs bg-blue-100/70 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-medium shadow-sm border border-blue-200 dark:border-blue-800 transition-colors break-all"
      >
        {topic}
      </span>
    ))}
  </div>
);

export const RepoCard = React.memo(function RepoCard({
  name,
  description,
  stargazers_count,
  language,
  html_url,
  owner,
  topics = [],
}: RepoCardProps) {
  return (
    <Card
      className="mb-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800/40
      bg-white/90 dark:bg-zinc-900/60 transition-all duration-200
      hover:shadow-2xl hover:scale-[1.015] w-full"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold group flex flex-wrap items-center gap-2">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-700 dark:text-blue-400 transition-colors break-all"
          >
            {name}
          </a>
          <span className="ml-2 px-2 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 shadow-inner">
            {language ?? "—"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
          <OwnerAvatar owner={owner} />
          <OwnerName owner={owner} />
          <Stargazers count={stargazers_count} />
        </div>
        <p className="text-zinc-800 dark:text-zinc-300 text-[15px] mb-2 min-h-[32px] break-words">
          {description || (
            <i className="opacity-60">No description provided.</i>
          )}
        </p>
        {topics.length > 0 && <Topics topics={topics} />}
      </CardContent>
    </Card>
  );
});

export default RepoCard;
