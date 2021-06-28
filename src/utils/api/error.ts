import { ErrorTypes } from "@/types/global";
export const createErrorObject = (
  message: string,
  code: number
): ErrorTypes => {
  return {
    data: {
      status: false,
      status_message: message,
      status_code: code,
    },
  };
};
