import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

type ParamsType = {
  // userId: string;
  userName: string;
};

export const getUserContents = async (params: ParamsType) => {
  console.log(params, "params");

  return await axios.get(apis.USERS_CONTENTS, { params });
};
