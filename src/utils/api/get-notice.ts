import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getNotice = async (): Promise<AxiosResponse<any>> => {
  return await axios.get(apis.NOTICE);
};
