export type ResponseCreditType = {
  Item: {
    sort_key: string;
    last4_chara: string;
    token: string;
    card_id: string;
    partition_key: string;
    customChara: string;
  };
  status: boolean;
  status_code: number;
  status_message: string;
};
