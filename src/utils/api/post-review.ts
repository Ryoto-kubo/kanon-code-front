import { apis } from '@/consts/api/'
import { ReviewContentTypes, UserProfileTypes } from '@/types/global'
import { axios } from '@/utils/axios'

type ParamsType = {
  userId: string
  postId: string
  userProfile: UserProfileTypes
  contents: ReviewContentTypes
  paymentType: number
  paymentArea: number | null
  price: number
}

export const postReview = async (params: ParamsType) => {
  return await axios.post(apis.REVIRE, params)
}
