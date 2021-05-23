import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'

export const getSuggestProgrammingLanguages = async () => {
  return await axios.get(apis.SUGGEST_PROGRAMMINGL_ANGUAGES)
}
