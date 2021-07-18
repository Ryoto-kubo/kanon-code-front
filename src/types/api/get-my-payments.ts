import { PostsTypes } from "@/types/global";

export type MyPaymentsTypes = {
  posts: PostsTypes;
  status: boolean;
  status_code: number;
  status_message: string;
};
