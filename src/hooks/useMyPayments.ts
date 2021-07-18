import { apis } from "@/consts/api/";
import { errorMessages } from "@/consts/error-messages";
import { createErrorObject } from "@/utils/api/error";
import { getMyPayments } from "@/utils/api/get-my-payments";
import useSWR from "swr";

const fetcher = async () => {
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001);
  return await getMyPayments().catch(() => {
    errorObject.data.posts = null;
    errorObject.data.user = null;
    return errorObject;
  });
};

export const useMyPayments = () => {
  const { data, isValidating } = useSWR(apis.MY_PAYMENTS, () => fetcher(), {
    refreshInterval: 0,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    focusThrottleInterval: 5000,
  });
  return { data, isValidating };
};
