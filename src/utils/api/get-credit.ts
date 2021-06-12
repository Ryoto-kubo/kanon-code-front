import { apis } from "@/consts/api/";
import { ResponseCreditType } from "@/types/api/credit";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type ParamsType = {
  userId: string;
};

export const getCredit = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseCreditType>> => {
  return await axios.get(apis.CREDIT, { params });
};
