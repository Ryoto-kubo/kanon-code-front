import baseAxios from "axios";
console.log(process.env.NEXT_PUBLIC_API_URL);

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 2000,
});
