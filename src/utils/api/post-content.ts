import { apis } from '@/consts/api/';
import { SuccessTypes } from '@/types/api/success';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

type ParamsType = {
  uuid: string;
  postType: string;
  contents: {
    title: string;
    tagList: string[];
    description: {
      value: string;
      bodyHtml: string;
    };
    inputFileNameLists: {
      key: string;
      fileName: string;
      sourceCode: string;
      bodyHtml: string;
      isValid: boolean;
    }[];
    targetLanguage: number;
    targetIcon: {
      id: number;
      value: string;
      iconPath: string;
      ogpPath: string;
    };
    budget: number;
  };
};

type CustomResponseTypes = SuccessTypes & {
  postId: string;
};

export const postContent = async (
  params: ParamsType
): Promise<AxiosResponse<CustomResponseTypes>> => {
  return await axios.post(apis.REGISTER_CONTENT, params);
};
