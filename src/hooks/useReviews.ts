import { errorMessages } from "@/consts/error-messages";
import { ResponseReviewsTypes } from "@/types/api/get-reviews";
import { ErrorTypes } from "@/types/global";
import { createErrorObject } from "@/utils/api/error";
import { getReviews } from "@/utils/api/get-reviews";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useReviews = (postId: string) => {
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsResponse, setReviewsResponse] = useState<
    AxiosResponse<ResponseReviewsTypes> | ErrorTypes
  >(errorObject);

  useEffect(() => {
    (async () => {
      const response = await getReviews({ postId }).catch(() => {
        errorObject.data.Items = null;
        return errorObject;
      });
      setReviewsResponse(response);
      setIsLoading(false);
    })();
  }, []);
  return { reviewsResponse, isLoading };
};
