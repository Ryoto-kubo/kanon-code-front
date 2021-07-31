import { GetContentsTypes } from '@/types/global';

export type ResponseContentTypes = {
  post: GetContentsTypes;
  status: boolean;
  status_code: number;
  status_message: string;
};
