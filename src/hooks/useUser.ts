import { UserTypes } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { useEffect, useState } from "react";

export const useUser = (currentUser: UserTypes | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserTypes | null>(currentUser!);
  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getUser();
        const result = response.data;
        if (!result.status) {
          err.message = result.status_message;
          throw err;
        }
        setUser(result.Item);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    })();
  }, []);
  return { user, setUser, isLoading };
};
