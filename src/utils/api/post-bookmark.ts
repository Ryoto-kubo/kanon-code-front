import { apis } from '@/consts/api/'
import { SuccessTypes } from '@/types/api/success'
import { axios } from '@/utils/axios'
import { AxiosResponse } from 'axios'

type PramsProps = {
  myUserId: string
  postId: string
}

export const postBookmark = async (
  params: PramsProps,
): Promise<AxiosResponse<SuccessTypes>> => {
  return await axios.post(apis.BOOKMARK, params)
}
