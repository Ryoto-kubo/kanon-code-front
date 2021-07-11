import { apis } from "@/consts/api/";
import { EmailNoticesTypes } from "@/types/global";
import { axios } from "@/utils/axios";

type PramsProps = {
  emailNotices: EmailNoticesTypes;
};

export const postEmailNotices = async (params: PramsProps) => {
  return await axios.post(apis.EMAIL_NOTICES, params);
};
