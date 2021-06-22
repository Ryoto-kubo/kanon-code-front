import { apis } from '@/consts/api/'
import { errorMessages } from '@/consts/error-messages'
import { createErrorObject } from '@/utils/api/error'
import { getBookmark } from '@/utils/api/get-bookmark'
import useSWR from 'swr'
// import { ResponseBookmarkTypes } from '@/types/api/get-bookmark'
// import { ErrorTypes } from '@/types/global'
// import { AxiosResponse } from 'axios'

const fetcher = async (myUserId: string, postId: string) => {
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001)
  const params = {
    myUserId: myUserId,
    postId: postId,
  }
  return await getBookmark(params).catch(() => {
    errorObject.data.posts = null
    errorObject.data.user = null
    return errorObject
  })
}

export const useGetBookmark = (myUserId: string, postId: string) => {
  const { data } = useSWR(apis.BOOKMARK, () => fetcher(myUserId, postId), {
    refreshInterval: 0,
    // initialData: {
    //   Item: {
    //     partition_key: '',
    //     sort_key: ''
    //   },
    //   status: true,
    //   status_code: 200,
    //   status_message: ''
    // },
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    focusThrottleInterval: 5000,
  })
  return { data }
}
