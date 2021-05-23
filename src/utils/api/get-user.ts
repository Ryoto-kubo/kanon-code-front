import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'

type ParamsType = {
  userId: string
}

export const getUser = async (params: ParamsType) => {
  return await axios.get(apis.USER, { params })
}
