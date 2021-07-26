import { Auth } from "aws-amplify";
import baseAxios, { AxiosRequestConfig } from "axios";
import { setCookie } from "nookies";

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return Auth.currentSession()
    .then((session) => {
      setCookie(null, "idToken", session.getIdToken().getJwtToken());
      config.headers.Authorization = session.getIdToken().getJwtToken();
      return Promise.resolve(config);
    })
    .catch(() => {
      config.headers.Authorization = "";
      return Promise.resolve(config);
    });
});
