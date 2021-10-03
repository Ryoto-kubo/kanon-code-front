import { GithubReposTypes } from '@/types/global/index';
export type ResponseGithubReposTypes = {
  repos: GithubReposTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
