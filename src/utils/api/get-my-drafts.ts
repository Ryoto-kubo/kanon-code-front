import { apis } from '@/consts/api/';
import { MyDraftsTypes } from '@/types/api/get-my-drafts';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

export const getMyDrafts = async (): Promise<AxiosResponse<MyDraftsTypes>> => {
  return await axios.get(apis.MY_DTAFTS);
};
