import { apis } from '@/consts/api/';
import { ResponseCommentTypes } from '@/types/api/post-comment';
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
): Promise<AxiosResponse<ResponseCommentTypes>> => {
  return await axios.post(apis.COMMENT, params);
};
