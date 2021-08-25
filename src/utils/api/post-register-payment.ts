import { apis } from '@/consts/api/';
import { SuccessTypes } from '@/types/api/success';
import { ReviewContentsTypes, UserProfileTypes } from '@/types/global/';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsType = {
  reviewId: string;
  reviewerId: string;
  postId: string;
  profile: UserProfileTypes;
  price: number;
};

type CustomResponseTypes = SuccessTypes & {
  contents: ReviewContentsTypes;
};

export const postRegisterPayment = async (
  params: ParamsType
): Promise<AxiosResponse<CustomResponseTypes>> => {
  return await axios.post(apis.REGISTER_PAYMENT, params);
};
