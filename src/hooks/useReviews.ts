import { errorMessages } from '@/consts/error-messages';
import { ResponseCreditType } from '@/types/api/get-credit';
import { ResponseReviewsTypes } from '@/types/api/get-reviews';
import {
  CommentListTypes,
  CustomReviewTypes,
  ErrorTypes,
} from '@/types/global';
import { CreditTypes } from '@/types/global/';
import { createErrorObject } from '@/utils/api/error';
import { getCredit } from '@/utils/api/get-credit';
import { getReviews } from '@/utils/api/get-reviews';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

// HACK: とりあえずの実装。もっと綺麗な実装はあるはず。。。
export const useReviews = (postId: string, isMe: boolean, userId: string) => {
  const err = new Error();
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [credit, setCredit] = useState<CreditTypes | null>(null);
  const [reviews, setReviews] = useState<CustomReviewTypes[] | null>(null);
  const [creditResponse, setCreditResponse] = useState<
    AxiosResponse<ResponseCreditType> | ErrorTypes
  >(errorObject);
  const [reviewsResponse, setReviewsResponse] = useState<
    AxiosResponse<ResponseReviewsTypes> | ErrorTypes
  >(errorObject);
  const [paymentedList, setPaymentedList] = useState<{
    [key: string]: boolean;
  } | null>(null);
  const [commentList, setCommentList] = useState<CommentListTypes | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all([
          await getCredit(),
          await getReviews({ postId }),
        ]);

        const responseCredit = results[0];
        const responseReviews = results[1];
        const creditStatus = responseCredit.data.status;
        const reviewsStatus = responseReviews.data.status;
        if (!creditStatus || !reviewsStatus) throw err;
        const reviewedUserIds = responseReviews.data.Items.reviews.map(
          (el: CustomReviewTypes) => el.partition_key
        );
        const isReviewed = reviewedUserIds.includes(userId);
        // 自分の投稿ではない、ログインしている、まだレビューをしていなければレビューをできる
        setCanReview(!isMe && userId !== '' && !isReviewed);
        setCreditResponse(responseCredit);
        setReviewsResponse(responseReviews);
        setCredit(responseCredit.data.Item);
        setReviews(responseReviews.data.Items.reviews);
        setPaymentedList(responseReviews.data.Items.paymentedList);
        setCommentList(responseReviews.data.Items.commentList);
      } catch {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return {
    creditResponse,
    reviewsResponse,
    credit,
    reviews,
    setReviews,
    canReview,
    setCanReview,
    paymentedList,
    setPaymentedList,
    commentList,
    setCommentList,
    isLoading,
  };
};
