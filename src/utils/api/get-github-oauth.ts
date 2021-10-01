import { apis } from '@/consts/api/';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { ResponseGithubOAuthTypes } from '../../types/api/get-github-oauth';

export const getGithubAccessToken = async (): Promise<
  AxiosResponse<ResponseGithubOAuthTypes>
> => {
  return await axios.get(apis.GITHUB_OAUTH);
};
