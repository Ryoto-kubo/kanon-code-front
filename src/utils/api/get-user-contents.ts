import { apis } from '@/consts/api/'
import { UserContentsTypes } from '@/types/api/get-user-contents'
import { axios } from '@/utils/axios'
import { AxiosResponse } from 'axios'

type ParamsType = {
  userName: string
}

export const getUserContents = async (
  params: ParamsType,
): Promise<AxiosResponse<UserContentsTypes>> => {
  return await axios.get(apis.USERS_CONTENTS, { params })
}
