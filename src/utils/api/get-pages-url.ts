import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

export const getPagesUrl = async () => {
  return await axios.get(apis.PAGES_URL);
};
