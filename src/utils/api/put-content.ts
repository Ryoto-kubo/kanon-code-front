import { apis } from '@/consts/api/';
import { axios } from '@/utils/axios';

type ParamsType = {
  partitionKey: string;
  sortKey: string;
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
  };
};

export const putContent = async (params: ParamsType) => {
  return await axios.put(apis.REGISTER_CONTENT, params);
};
