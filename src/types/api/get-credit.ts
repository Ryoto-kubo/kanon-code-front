export type ResponseCreditType = {
  Item: {
    partition_key: string;
    sort_key: string;
    customer_id: string;
    setup_id: string;
    setup_method: string;
    last4_chara: string;
    customChara: string;
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
