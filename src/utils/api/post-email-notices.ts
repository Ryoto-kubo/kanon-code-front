import { apis } from "@/consts/api/";
import { EmailNoticesProps } from "@/types/global";
import { axios } from "@/utils/axios";

type PramsProps = {
  userId: string;
  emailNotices: EmailNoticesProps;
};

export const postEmailNotices = async (params: PramsProps) => {
  return await axios.post(apis.EMAIL_NOTICES, params);
};
