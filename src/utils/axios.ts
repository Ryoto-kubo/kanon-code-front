import { Auth } from "aws-amplify";
import baseAxios, { AxiosRequestConfig } from "axios";

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// axios.interceptors.request.use((config: AxiosRequestConfig) => {
//   const cookie = parseCookies();
//   const idToken = cookie.idToken ? cookie.idToken : "";
//   config.headers = { Authorization: idToken };
//   return config;
// });

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return Auth.currentSession()
    .then(session => {
      console.log(session,'interceptors')
    session.getIdToken().getJwtToken()
    config.headers.Authorization = session.getIdToken().getJwtToken()
    return Promise.resolve(config)
  })
    .catch((err) => {
    console.error(err);
    config.headers.Authorization = ''
    return Promise.resolve(config)
  })});