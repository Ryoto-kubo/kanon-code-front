import { apis } from '@/consts/api/';
import { axios } from '@/utils/axios';

type PramsProps = {
  code: string;
};

export const postGithubOAuth = async (params: PramsProps) => {
  return await axios.post(apis.GITHUB_OAUTH, params);
};
