/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RepoCardProps } from "@/components//Repo/RepoCard";

function getGithubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

function mapGithubRepo(repo: any): RepoCardProps {
  return {
    name: repo.name,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    html_url: repo.html_url,
    owner: {
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      html_url: repo.owner.html_url,
    },
    topics: repo.topics || [],
  };
}

export interface SearchReposParams {
  q: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
}

export interface SearchReposResult {
  repos: RepoCardProps[];
  totalCount: number;
  hasMore: boolean;
}

export async function searchRepositories({
  q,
  page = 1,
  perPage = 10,
  signal,
}: SearchReposParams): Promise<SearchReposResult> {
  const resp = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      q
    )}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
    {
      headers: getGithubHeaders(),
      signal,
    }
  );
  if (!resp.ok) {
    const errorBody = await resp.json().catch(() => ({}));
    throw new Error(errorBody.message || resp.statusText);
  }
  const data = await resp.json();
  return {
    repos: (data.items || []).map(mapGithubRepo),
    totalCount: data.total_count,
    hasMore: (data.items?.length ?? 0) === perPage,
  };
}
