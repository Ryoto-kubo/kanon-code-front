import { PostsTypesInPayments } from "@/types/global";

export type MyPaymentsTypes = {
  posts: PostsTypesInPayments[];
  status: boolean;
  status_code: number;
  status_message: string;
};
