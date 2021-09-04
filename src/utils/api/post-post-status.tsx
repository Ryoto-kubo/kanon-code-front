import { apis } from '@/consts/api/';
import { ResponsePostStatusTypes } from '@/types/api/post-post-status';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type PramsProps = {
  postId: string;
  postStatus: number;
};

export const postStatus = async (
  params: PramsProps
): Promise<AxiosResponse<ResponsePostStatusTypes>> => {
  return await axios.post(apis.POST_STATUS, params);
};
