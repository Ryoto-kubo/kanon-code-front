import { errorMessages } from "@/consts/error-messages";
import { ResponseReviewsTypes } from "@/types/api/get-reviews";
import { ErrorTypes } from "@/types/global";
import { ReviewTypes } from "@/types/global/";
import { createErrorObject } from "@/utils/api/error";
import { getReviews } from "@/utils/api/get-reviews";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// HACK: とりあえずの実装。もっと綺麗な実装はあるはず。。。
export const useReviews = (postId: string, isMe: boolean, myUserId: string) => {
  const err = new Error();
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [reviews, setReviews] = useState<ReviewTypes[] | null>(null);
  const [reviewsResponse, setReviewsResponse] = useState<
    AxiosResponse<ResponseReviewsTypes> | ErrorTypes
  >(errorObject);

  useEffect(() => {
    (async () => {
      try {
        const response = await getReviews({ postId });
        if (!response.data.status) throw err;
        const reviewedUserIds = response.data.Items.map(
          (el: ReviewTypes) => el.user_id
        );
        const isReviewed = reviewedUserIds.includes(myUserId);
        // 自分の投稿ではない、ログインしている、まだレビューをしていなければレビューをできる
        setCanReview(!isMe && myUserId !== "" && !isReviewed);
        setReviewsResponse(response);
        setReviews(response.data.Items);
        setIsLoading(false);
      } catch {
        console.error(err);
        setIsLoading(false);
        setReviewsResponse(errorObject);
      }
    })();
  }, []);
  return {
    reviewsResponse,
    reviews,
    setReviews,
    canReview,
    setCanReview,
    isLoading,
  };
};
