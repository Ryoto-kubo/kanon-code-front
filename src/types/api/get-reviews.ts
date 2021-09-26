import { CommentListTypes, CustomReviewTypes } from '@/types/global';

export type ResponseReviewsTypes = {
  Items: {
    reviews: CustomReviewTypes[];
    paymentedList: { [key: string]: boolean };
    commentList: CommentListTypes;
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
