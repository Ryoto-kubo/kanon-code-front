import { CommentContentsTypes, UserProfileTypes } from '@/types/global/index';
export type ResponseCommentTypes = {
  data: {
    user_profile: UserProfileTypes;
    contents: CommentContentsTypes;
    date: string;
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
