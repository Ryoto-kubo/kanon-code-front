import { apis } from '@/consts/api/';
import { ResponseWithdrawalType } from '@/types/api/get-withdrawal';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

export const getWithdrawal = async (): Promise<
  AxiosResponse<ResponseWithdrawalType>
> => {
  return await axios.get(apis.WITHDRAWAL);
};
