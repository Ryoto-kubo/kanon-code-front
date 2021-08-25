import { GetContentTypes } from '@/types/global';

export type ResponseContentTypes = {
  post: GetContentTypes;
  status: boolean;
  status_code: number;
  status_message: string;
};
