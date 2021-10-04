import { GithubBranchesTypes } from './../global/index';
export type ResponseGithubBranchesTypes = {
  branches: GithubBranchesTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
