import { PostsTypes, ReviewsTypes } from "@/types/global";

export type MyContentsTypes = {
  posts: PostsTypes[];
  reviews: ReviewsTypes[];
  status: boolean;
  status_code: number;
  status_message: string;
};
