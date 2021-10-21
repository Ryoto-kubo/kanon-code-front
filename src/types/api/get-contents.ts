import { GetContentsTypes } from '@/types/global/';

export type ResponseContentsTypes = {
  frontPosts: GetContentsTypes[] | [];
  backPosts: GetContentsTypes[] | [];
  otherPosts: GetContentsTypes[] | [];
  status: boolean;
  status_code: number;
  status_message: string;
};
