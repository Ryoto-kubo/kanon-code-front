import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getNotices = async (): Promise<AxiosResponse<any>> => {
  return await axios.get(apis.NOTICES);
};
