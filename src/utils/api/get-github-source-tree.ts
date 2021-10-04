import { apis } from '@/consts/api/';
import { ResponseGithubSourceTreeTypes } from '@/types/api/get-github-source-tree';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsTypes = {
  repository: string;
  branch: string;
};

export const getGithubSourceTree = async (
  params: ParamsTypes
): Promise<AxiosResponse<ResponseGithubSourceTreeTypes>> => {
  return await axios.get(apis.GITHUB_SOURCE_TREE, { params });
};
