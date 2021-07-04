import { apis } from "@/consts/api/";
import { ResponseUserTypes } from "@/types/api/get-user";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

// type ParamsType = {
//   userId: string;
// };

export const getUser = async (
  // params: ParamsType
): Promise<AxiosResponse<ResponseUserTypes>> => {
  return await axios.get(apis.USER)
};
