import { apis } from "@/consts/api/";
import { MyPaymentsTypes } from "@/types/api/get-my-payments";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getMyPayments = async (): Promise<
  AxiosResponse<MyPaymentsTypes>
> => {
  return await axios.get(apis.MY_PAYMENTS);
};
