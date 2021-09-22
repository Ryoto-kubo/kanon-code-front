import { apis } from '@/consts/api/';
import { ResponseReviewTypes } from '@/types/api/get-review';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsType = {
  postId: string;
  postReviewJointId: string;
  contents: {
    comment: {
      value: string;
      body_html: string;
    };
  };
};

export const postComment = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseReviewTypes>> => {
  return await axios.post(apis.COMMENT, params);
};
