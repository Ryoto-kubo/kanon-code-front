import { getBookmark } from '@/utils/api/get-bookmark'
import { useEffect, useState } from 'react'

export const useGetBookmark = (myUserId: string, postId: string) => {
  const [hasBookamark, setHasBookmark] = useState(false)
  useEffect(() => {
    ;(async () => {
      const result = await getBookmark({ myUserId, postId })
      setHasBookmark(result.data.Item ? true : false)
    })()
  }, [])
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
