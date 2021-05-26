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
  update_year: number;
  user_profile: {
    twitter_name: string;
    github_name: string;
    price: number;
    icon_src: string;
    display_name: string;
    position_type: number;
    introduction: string;
    web_site: string;
  };
  create_year: number;
  create_day: number;
  create_month: number;
  type: string;
  [key: string]: any;
};
