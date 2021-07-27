import { apis } from "@/consts/api/";
import { ResponseReactionTypes } from "@/types/api/post-reaction";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type Props = {
  sortKey: string;
  postId: string;
};

export const postReaction = async (
  params: Props
): Promise<AxiosResponse<ResponseReactionTypes>> => {
  return await axios.post(apis.REACTION, params);
};
