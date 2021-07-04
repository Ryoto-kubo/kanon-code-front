import baseAxios from "axios";
import { parseCookies } from "nookies";
const cookie = parseCookies();
const idToken = cookie.idToken ? cookie.idToken : "";

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: idToken,
  },
});
