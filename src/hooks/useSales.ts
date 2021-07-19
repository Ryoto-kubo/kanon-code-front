import { apis } from '@/consts/api/'
import { errorMessages } from '@/consts/error-messages'
import { createErrorObject } from '@/utils/api/error'
import { getSales } from '@/utils/api/get-sales'
import useSWR from 'swr'

const fetcher = async () => {
  const errorObject = createErrorObject(errorMessages.SYSTEM_ERROR, 1001)
  return await getSales().catch(() => {
    errorObject.data.posts = null
    errorObject.data.user = null
    return errorObject
  })
}

export const useSales = () => {
  const { data, isValidating } = useSWR(apis.SALES, () => fetcher(), {
    refreshInterval: 0,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    focusThrottleInterval: 5000,
  })
  return { data, isValidating }
}
