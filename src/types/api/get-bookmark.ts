import { BookmarkTypes } from '@/types/global'

export type ResponseBookmarkTypes = {
  Item?: BookmarkTypes
  status: boolean
  status_code: number
  status_message: string
}
