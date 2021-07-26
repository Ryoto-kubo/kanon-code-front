import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type Props = {
  postId: string;
};

export const postReaction = async (params: Props) => {
  return await axios.post(apis.REACTION, params);
};
