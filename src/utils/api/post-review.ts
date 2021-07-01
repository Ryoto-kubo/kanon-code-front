import { apis } from "@/consts/api/";
import { ResponseReviewTypes } from "@/types/api/get-review";
import { ReviewContentsTypes, UserProfileTypes } from "@/types/global";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type ParamsType = {
  userId: string;
  postId: string;
  userProfile: UserProfileTypes;
  contents: ReviewContentsTypes;
  paymentType: number;
  paymentArea: number | null;
  price: number;
};

export const postReview = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseReviewTypes>> => {
  return await axios.post(apis.REVIEW, params);
};
