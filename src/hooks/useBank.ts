import { BankTypes } from "@/types/global";
import { getBank } from "@/utils/api/get-bank";
import { useEffect, useState } from "react";

export const useBank = (userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bank, setBank] = useState<BankTypes | null>(null);
  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getBank({ userId });
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        setBank(result.Item ? result.Item.bank : null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    })();
  }, []);

  return { bank, setBank, isLoading };
};
