import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'
import { SetupIntent } from '@stripe/stripe-js'
import { AxiosResponse } from 'axios'

// type ParamsType = {
//   userId: string
// }

type CustomSetupIntent = SetupIntent & {
  customer: string
  payment_method_types: string[]
}

export const postRegisterCustomer = async (
  // params: ParamsType,
): Promise<AxiosResponse<CustomSetupIntent>> => {
  return await axios.post(apis.REGISTER_CUSTOMER)
}
