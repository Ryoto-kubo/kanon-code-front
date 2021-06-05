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
  user_profile: UserProfileProps;
  email_notices: EmailNoticesProps;
  is_github_connect: boolean;
};

export type PostContentsProps = {
  update_day: number;
  update_month: number;
  partition_key: string;
  is_delete: boolean;
  contents: {
    tag_list: string[];
    target_icon: {
      icon_path: string;
      id: number;
      value: string;
    };
    description: {
      body_html: string;
      value: string;
    };
    input_file_name_lists: {
      body_html: string;
      file_name: string;
      is_valid: boolean;
      key: string;
      source_code: string;
    };
    target_language: number;
    title: string;
  };
  sort_key: string;
  user_id: string;
  post_type: string;
  post_status: number;
  update_year: number;
  user_profile: UserProfileProps;
  create_year: number;
  create_day: number;
  create_month: number;
  type: string;
  [key: string]: any;
};

export type UserProfileProps = {
  display_name: string;
  github_name: string;
  icon_src: string;
  introduction: string;
  position_type: number;
  price: number;
  skils: {
    language: string;
    years_experiences: number;
  }[];
  twitter_name: string;
  web_site: string;
};

export type EmailNoticesProps = {
  is_opened_review: boolean;
  is_requested_review: boolean;
};
