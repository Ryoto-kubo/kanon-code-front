import { GihubBranchesTypes } from './../global/index';
export type ResponseGithubBranchesTypes = {
  branches: GihubBranchesTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
