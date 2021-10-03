import { apis } from '@/consts/api/';
import { ResponseGithubBranchesTypes } from '@/types/api/get-github-branches';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type PramsTypes = {
  repository: string;
};

export const getGithubBranches = async (
  params: PramsTypes
): Promise<AxiosResponse<ResponseGithubBranchesTypes>> => {
  return await axios.get(apis.GITHUB_BRANCHES, { params });
};
