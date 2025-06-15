import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";

type Owner = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type RepoCardProps = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: Owner;
  topics?: string[];
};

export function RepoCard({
  name,
  description,
  stargazers_count,
  language,
  html_url,
  owner,
  topics = [],
}: RepoCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            {name}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-2">
          <a href={owner.html_url} target="_blank" rel="noopener noreferrer">
            <img
              src={owner.avatar_url}
              alt={owner.login}
              className="w-10 h-10 rounded-full border"
            />
          </a>
          <span className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1" />
            {owner.login}
          </span>
          <span className="flex items-center text-sm text-yellow-600 ml-3">
            <Star className="w-4 h-4 mr-1" />
            {stargazers_count}
          </span>
          {language && (
            <span className="ml-3 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {language}
            </span>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
          {description || <i>No description provided.</i>}
        </p>
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RepoCard;
