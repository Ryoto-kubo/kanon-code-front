export type UserType = {
  create_day: number;
  create_month: number;
  create_year: number;
  display_name: string;
  is_payment: boolean;
  partition_key: string;
  sort_key: string;
  type: string;
  user_id: string;
  user_profile: {
    display_name: string;
    github_name: string;
    icon_src: string;
    introduction: string;
    position_type: number;
    price: number;
    twitter_name: string;
    web_site: string;
  };
};
