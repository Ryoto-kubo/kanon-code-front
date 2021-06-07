import { apis } from "@/consts/api/";
import { BankTypes } from "@/types/global";
import { axios } from "@/utils/axios";

type ParamsType = {
  userId: string;
  bank: BankTypes;
};

export const postBank = async (params: ParamsType) => {
  return await axios.post(apis.BANK, params);
};
