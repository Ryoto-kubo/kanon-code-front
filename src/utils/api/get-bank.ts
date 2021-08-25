import { apis } from "@/consts/api/";
import { ResponseBankTypes } from "@/types/api/get-bank";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getBank = async (): Promise<AxiosResponse<ResponseBankTypes>> => {
  return await axios.get(apis.BANK);
};
