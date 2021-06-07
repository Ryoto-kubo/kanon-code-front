import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type ParamsType = {
  userId: string;
};

export const getBank = async (params: ParamsType) => {
  return await axios.get(apis.BANK, { params });
};
