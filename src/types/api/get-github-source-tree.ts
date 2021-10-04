import { GithubSourceTreeTypes } from '@/types/global';
export type ResponseGithubSourceTreeTypes = {
  tree: GithubSourceTreeTypes;
  status: boolean;
  status_code: number;
  status_message: string;
};
