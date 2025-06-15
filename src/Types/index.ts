export type RepoCardProps = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: Owner;
  topics?: string[];
};

type Owner = {
  login: string;
  avatar_url: string;
  html_url: string;
};
