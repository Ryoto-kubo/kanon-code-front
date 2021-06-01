import baseAxios from "axios";
// import { setupCache } from "axios-cache-adapter";

console.log(process.env.NEXT_PUBLIC_API_URL);
// const cache = setupCache({
//   maxAge: 15 * 60 * 1000
// })
// export const axios = setup({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   cache: {
//     maxAge: 15 * 60 * 1000,
//   },
// });
export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// https://ryotarch.com/javascript/react/swr-axios-typescript/
