import { GihubReposTypes } from '@/types/global/index';
export type ResponseGithubReposTypes = {
  repos: GihubReposTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
