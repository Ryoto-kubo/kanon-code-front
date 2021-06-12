import { apis } from "@/consts/api/";
import { ResponseBankTypes } from "@/types/api/get-bank";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

type ParamsType = {
  userId: string;
};

export const getBank = async (
  params: ParamsType
): Promise<AxiosResponse<ResponseBankTypes>> => {
  return await axios.get(apis.BANK, { params });
};
