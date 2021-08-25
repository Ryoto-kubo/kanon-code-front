import { apis } from "@/consts/api/";
import { ResponseCreditType } from "@/types/api/get-credit";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getCredit = async (): Promise<
  AxiosResponse<ResponseCreditType>
> => {
  return await axios.get(apis.CREDIT);
};
