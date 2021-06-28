import { ReviewTypes } from "@/types/global";
export type ResponseReviewsTypes = {
  Items: ReviewTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
