import { apis } from "@/consts/api/";
import { errorMessages } from "@/consts/error-messages";
import { createErrorObject } from "@/utils/api/error";
import { getMyContents } from "@/utils/api/get-my-contents";
import useSWR from "swr";

const fetcher = async () => {
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001);
  return await getMyContents().catch(() => {
    errorObject.data.posts = null;
    errorObject.data.user = null;
    return errorObject;
  });
};

export const useMyContents = () => {
  const { data, isValidating } = useSWR(apis.MY_CONTENTS, () => fetcher(), {
    refreshInterval: 0,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    focusThrottleInterval: 5000,
  });
  return { data, isValidating };
};
