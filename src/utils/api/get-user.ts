import { apis } from "@/consts/api/";
import { ErrorTypes } from "@/types/api/error";
import { ResponseUserTypes } from "@/types/api/get-user";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getUser = async (): Promise<
  AxiosResponse<ResponseUserTypes> | AxiosResponse<ErrorTypes>
> => {
  return await axios.get(apis.USER);
};
