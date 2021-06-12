import { UserProfileTypes, UserTypes } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { useEffect, useState } from "react";

export const useUser = (userId: string, currentUser: UserTypes | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfileTypes>(
    currentUser!.user_profile
  );
  const params = {
    userId: userId,
  };
  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getUser(params);
        const result = response.data;
        if (!result.status) {
          err.message = result.status_message;
          throw err;
        }
        setProfile(result.Item.user_profile);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    })();
  }, []);
  return { profile, setProfile, isLoading };
};
