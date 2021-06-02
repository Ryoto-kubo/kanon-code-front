import { apis } from "@/consts/api/";
import { UserProfileProps } from "@/types/global";
import { axios } from "@/utils/axios";

type PramsProps = {
  userId: string;
  userProfile: UserProfileProps;
};

export const postUserProfile = async (params: PramsProps) => {
  return await axios.post(apis.USER_PROFILE, params);
};
