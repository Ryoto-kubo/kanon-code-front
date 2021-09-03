import { apis } from '@/consts/api/';
import { SuccessTypes } from '@/types/api/success';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type PramsProps = {
  postId: string;
};

export const postStatus = async (
  params: PramsProps
): Promise<AxiosResponse<SuccessTypes>> => {
  return await axios.post(apis.POST_STATUS, params);
};
