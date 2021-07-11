import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

export const getPreSignedUrl = async (newFileName: string) => {
  const params = {
    newFileName: newFileName,
  };
  return await axios.get(apis.PRESIGNED_URL, { params });
};
