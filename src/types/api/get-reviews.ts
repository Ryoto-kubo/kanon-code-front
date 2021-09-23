import { CustomReviewTypesInCommentsTypes } from '@/types/global';

export type ResponseReviewsTypes = {
  Items: {
    reviews: CustomReviewTypesInCommentsTypes[];
    paymentedList: { [key: string]: boolean };
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
