import { apis } from "@/consts/api/";
import { ResponseReviewsTypes } from "@/types/api/get-reviews";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type ParamsType = {
  userId: string;
  postId: string;
};

export const getReviews = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseReviewsTypes>> => {
  return await axios.get(apis.REVIEWS, { params });
};
