import { apis } from "@/consts/api/";
import { ResponseReviewTypes } from "@/types/api/get-review";
import { ReviewContentTypes, UserProfileTypes } from "@/types/global";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type ParamsType = {
  userId: string;
  postId: string;
  userProfile: UserProfileTypes;
  contents: ReviewContentTypes;
  paymentType: number;
  paymentArea: number | null;
  price: number;
};

export const postReview = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseReviewTypes>> => {
  return await axios.post(apis.REVIEW, params);
};
