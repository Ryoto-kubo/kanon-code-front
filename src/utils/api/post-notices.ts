import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type Props = {
  partitionKey: string;
  sortKey: string;
};

export const postNotices = async (params: Props) => {
  return await axios.post(apis.NOTICES, params);
};
