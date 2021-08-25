import { apis } from '@/consts/api/'
import { SalesTypes } from '@/types/api/get-sales'
import { axios } from '@/utils/axios'
import { AxiosResponse } from 'axios'

export const getSales = async (): Promise<AxiosResponse<SalesTypes>> => {
  return await axios.get(apis.SALES)
}
