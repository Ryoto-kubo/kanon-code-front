import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

export const getContents = async () => {
  return await axios.get(apis.CONTENTS);
};
