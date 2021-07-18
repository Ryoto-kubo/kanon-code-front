import { apis } from "@/consts/api/";
import { MyBookmarksTypes } from "@/types/api/get-my-bookmarks";
import { axios } from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getMyBookmarks = async (): Promise<
  AxiosResponse<MyBookmarksTypes>
> => {
  return await axios.get(apis.MY_BOOKMARKS);
};
