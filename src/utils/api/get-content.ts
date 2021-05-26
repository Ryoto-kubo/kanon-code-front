import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type ParamsType = {
  postId: string;
};

export const getContent = async (params: ParamsType) => {
  return await axios.get(apis.CONTENT, { params });
};
