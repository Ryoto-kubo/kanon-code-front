import { apis } from "@/consts/api/";
import { SuccessTypes } from "@/types/api/success";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const postRegist = async (): Promise<AxiosResponse<SuccessTypes>> => {
  return await axios.post(apis.REGISTER);
};
