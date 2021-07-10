import baseAxios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const cookie = parseCookies();
  const idToken = cookie.idToken ? cookie.idToken : "";
  config.headers = { Authorization: idToken };
  return config;
});
