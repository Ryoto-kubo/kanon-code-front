import { PostContentsTypes, UserTypes } from '@/types/global'

export type UserContentsTypes = {
  posts: PostContentsTypes[]
  user: UserTypes
  status: boolean
  status_code: number
  status_message: string
}
