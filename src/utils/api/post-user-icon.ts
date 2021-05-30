import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'

type PramsProps = {
  userId: string
  iconSrc: string
}

export const postUserIcon = async (params: PramsProps) => {
  return await axios.post(apis.USER_ICON, params)
}
