import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

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
  };
};

export const postContent = async (params: ParamsType) => {
  return await axios.post(apis.REGISTER_CONTENT, params);
};
