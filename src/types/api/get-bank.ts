import { BankTypes } from "@/types/global";

export type ResponseBankTypes = {
  Item: {
    partition_key: string;
    sort_key: string;
    bank: BankTypes;
    is_delete: boolean;
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
