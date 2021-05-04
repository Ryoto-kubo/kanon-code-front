import baseAxios from "axios";
console.log(process.env.NEXT_PUBLIC_API_URL);

export const axios = baseAxios.create({
  // baseURL: "https://gdpqjnnbv3.execute-api.ap-northeast-1.amazonaws.com/Prod/",
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Headers": "Origin, Authorization, Accept, X-Requested-With, Content-Type, x-amz-date, X-Amz-Security-Token",
    "Access-Control-Allow-Origin": "*",
  },
  // timeout: 2000,
});
