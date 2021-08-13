import { apis } from '@/consts/api/';
import { SuccessTypes } from '@/types/api/success';
import { UserProfileTypes } from '@/types/global/';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsType = {
  reviewId: string;
  reviewerId: string;
  postId: string;
  profile: UserProfileTypes;
  price: number;
};

export const deleteRegisterPayment = async (
  params: ParamsType
): Promise<AxiosResponse<SuccessTypes>> => {
  return await axios.delete(apis.REGISTER_PAYMENT, { params });
};
