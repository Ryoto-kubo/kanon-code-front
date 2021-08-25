import { getBookmark } from '@/utils/api/get-bookmark'
import { useEffect, useState } from 'react'

export const useGetBookmark = (postId: string) => {
  const [hasBookmark, setHasBookmark] = useState(false)
  useEffect(() => {
    ;(async () => {
      const result = await getBookmark({ postId })
      setHasBookmark(result.data.Item ? true : false)
    })()
  }, [])
  return { hasBookmark, setHasBookmark }
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
