import { ReviewTypes } from '@/types/global'
export type ResponseReviewTypes = {
  Item: ReviewTypes
  status: boolean
  status_code: number
  status_message: string
}
