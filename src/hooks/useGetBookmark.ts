// import { apis } from '@/consts/api/'
import { getBookmark } from '@/utils/api/get-bookmark'
// import useSWR from 'swr'
// import { ResponseBookmarkTypes } from '@/types/api/get-bookmark'
// import { ErrorTypes } from '@/types/global'
// import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
// const fetcher = async (myUserId: string, postId: string) => {
//   const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001)
//   const params = {
//     myUserId: myUserId,
//     postId: postId,
//   }
//   return await getBookmark(params).catch(() => {
//     errorObject.data.posts = null
//     errorObject.data.user = null
//     return errorObject
//   })
// }

export const useGetBookmark = (myUserId: string, postId: string) => {
  const [hasBookamark, setHasBookmark] = useState(false)
  useEffect(() => {
    ;(async () => {
      const result = await getBookmark({ myUserId, postId })
      setHasBookmark(result.data.Item ? true : false)
    })()
  })
  return { hasBookamark, setHasBookmark }
  // const { data, isValidating } = useSWR(
  //   apis.BOOKMARK,
  //   () => fetcher(myUserId, postId),
  //   {
  //     refreshInterval: 0,
  //     // initialData: {
  //     //   Item: {
  //     //     partition_key: '',
  //     //     sort_key: ''
  //     //   },
  //     //   status: true,
  //     //   status_code: 200,
  //     //   status_message: ''
  //     // },
  //     dedupingInterval: 2000,
  //     revalidateOnFocus: false,
  //     focusThrottleInterval: 5000,
  //   },
  // )
  // return { data, isValidating }
}
