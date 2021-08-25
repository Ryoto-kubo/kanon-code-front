import { apis } from "@/consts/api/";
import { MyContentsTypes } from "@/types/api/get-my-contents";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getMyContents = async (): Promise<
  AxiosResponse<MyContentsTypes>
> => {
  return await axios.get(apis.MY_CONTENTS);
};
