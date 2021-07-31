import { apis } from '@/consts/api/';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { ResponseContentTypes } from '@/types/api/get-content';

type ParamsType = {
  postId: string;
};

export const getContent = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseContentTypes>> => {
  return await axios.get(apis.CONTENT, { params });
};
