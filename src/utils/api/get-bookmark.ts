import { apis } from '@/consts/api/'
import { ResponseBookmarkTypes } from '@/types/api/get-bookmark'
import { axios } from '@/utils/axios'
import { AxiosResponse } from 'axios'

type ParamsType = {
  myUserId: string
  postId: string
}

export const getBookmark = async (
  params: ParamsType,
): Promise<AxiosResponse<ResponseBookmarkTypes>> => {
  return await axios.get(apis.BOOKMARK, { params })
}
