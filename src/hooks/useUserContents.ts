import { apis } from '@/consts/api/'
import { errorMessages } from '@/consts/error-messages'
import { createErrorObject } from '@/utils/api/error'
import { getUserContents } from '@/utils/api/get-user-contents'
import useSWR from 'swr'

const fetcher = async (userName: string) => {
  // return await getUserContents({ userName: userName })
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001)
  return await getUserContents({ userName: userName }).catch(() => {
    errorObject.data.posts = null
    errorObject.data.user = null
    return errorObject
  })
}

export const useUserContents = (userName: string) => {
  const { data, isValidating } = useSWR(
    apis.USERS_CONTENTS,
    () => fetcher(userName),
    {
      refreshInterval: 0,
      dedupingInterval: 2000,
      revalidateOnFocus: false,
      focusThrottleInterval: 5000,
    },
  )
  return { data, isValidating }
}
