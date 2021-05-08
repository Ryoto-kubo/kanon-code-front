import baseAxios from 'axios'
export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 2000,
  // headers: {
  //   'Access-Control-Allow-Headers':
  //     'Origin, Authorization, Accept, X-Requested-With, Content-Type, x-amz-date, X-Amz-Security-Token',
  // 'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PATCH, PUT',
  // },
})
