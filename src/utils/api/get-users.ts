import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";

export const getUsers = async () => {
  return await axios.get(apis.USERS);
};
