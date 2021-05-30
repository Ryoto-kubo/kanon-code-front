import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'

type ParamsType = {
  uuid: string
  userId: string
  userProfile: {
    display_name: string
    github_name: string
    icon_src: string
    introduction: string
    position_type: number
    price: number
    twitter_name: string
    web_site: string
  }
  postType: string
  contents: {
    title: string
    tagList: string[]
    description: {
      value: string
      bodyHtml: string
    }
    inputFileNameLists: {
      key: string
      fileName: string
      sourceCode: string
      bodyHtml: string
      isValid: boolean
    }[]
  }
}

export const postContent = async (params: ParamsType) => {
  return await axios.post(apis.REGISTER_CONTENT, params)
}
