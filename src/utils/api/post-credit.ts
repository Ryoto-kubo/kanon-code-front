import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type PramsProps = {
  userId: string;
  token: string;
  cardId: string;
  last4Chara: string;
};

export const postCredit = async (params: PramsProps) => {
  return await axios.post(apis.CREDIT, params);
};
