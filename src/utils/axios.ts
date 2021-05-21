import baseAxios from 'axios'

console.log(process.env.NEXT_PUBLIC_API_URL)

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
