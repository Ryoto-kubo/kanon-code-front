import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'

type PramsProps = {
  userId: string
  customerId: string
  last4Chara: string
  setUpClientSecret: string
  setUpId: string
  setUpMethod: string
}

export const postCredit = async (params: PramsProps) => {
  return await axios.post(apis.CREDIT, params)
}
