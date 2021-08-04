import { apis } from '@/consts/api/';
import { ResponseDepositType } from '@/types/api/get-deposit';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

export const getDeposit = async (): Promise<
  AxiosResponse<ResponseDepositType>
> => {
  return await axios.get(apis.DEPOSIT);
};
