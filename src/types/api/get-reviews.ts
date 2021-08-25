import { CustomReviewTypes } from "@/types/global";
export type ResponseReviewsTypes = {
  Items: {
    reviews: CustomReviewTypes[];
    paymentedList: { [key: string]: boolean };
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
