import { apis } from '@/consts/api/';
import { ResponseGithubReposTypes } from '@/types/api/get-github-repos';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

export const getGithubRepos = async (): Promise<
  AxiosResponse<ResponseGithubReposTypes>
> => {
  return await axios.get(apis.GITHUB_REPOS);
};
