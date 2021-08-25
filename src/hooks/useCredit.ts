import { errorMessages } from "@/consts/error-messages";
import { CreditTypes } from "@/types/global";
import { getCredit } from "@/utils/api/get-credit";
import { useEffect, useState } from "react";

export const useCredit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [credit, setCredit] = useState<CreditTypes | null>(null);
  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getCredit();
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        setCredit(result.Item ? result.Item : null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  }, []);
  return { credit, isLoading };
};
