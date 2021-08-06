import { apis } from '@/consts/api/';
import { axios } from '@/utils/axios';

type Props = {
  value: number;
};

export const postDeposit = async (params: Props) => {
  return await axios.post(apis.DEPOSIT, params);
};
