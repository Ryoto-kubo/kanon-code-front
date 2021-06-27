import { UserTypes } from "@/types/global";

export type ResponseUserTypes = {
  Item: UserTypes;
  status: boolean;
  status_code: number;
  status_message: string;
};
