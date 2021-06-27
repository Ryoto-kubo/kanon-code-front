import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";
import { PaymentIntent } from "@stripe/stripe-js";
import { AxiosResponse } from "axios";

type ParamsType = {
  postId: string;
  reviewId: string;
  userId: string;
  price: number;
  title: string;
  paymentMethod: string;
  customerId: string;
};

export const postPayment = async (
  params: ParamsType
): Promise<AxiosResponse<PaymentIntent>> => {
  return await axios.post(apis.PAYMENT, params);
};
