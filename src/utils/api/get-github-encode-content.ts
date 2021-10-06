import { apis } from '@/consts/api/';
import { ResponseGithubEncodeContentTypes } from '@/types/api/get-github-encode-content';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsTypes = {
  repository: string;
  sha: string;
};

export const getGithubEncodeContent = async (
  params: ParamsTypes
): Promise<AxiosResponse<ResponseGithubEncodeContentTypes>> => {
  return await axios.get(apis.GITHUB_ENCODE_CONTENT, { params });
};
