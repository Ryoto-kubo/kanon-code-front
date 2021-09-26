export type UserTypes = {
  create_day: number;
  create_month: number;
  create_year: number;
  display_name: string;
  is_payment: boolean;
  partition_key: string;
  sort_key: string;
  type: string;
  user_id: string;
  user_profile: UserProfileTypes;
  email_notices: EmailNoticesTypes;
  is_github_connect: boolean;
  is_delete: boolean;
};

export type PostContentsTypes = {
  update_day: number;
  update_month: number;
  partition_key: string;
  is_delete: boolean;
  contents: CamelContentTypes;
  sort_key: string;
  user_id: string;
  post_status: number;
  update_year: number;
  user_profile: UserProfileTypes;
  create_year: number;
  create_day: number;
  create_month: number;
  type: string;
  [key: string]: any;
};

export type GetContentsTypes = {
  contents: ContentTypes;
  user_profile: UserProfileTypes;
  date: string;
  post_url: string;
  post_status: number;
};

export type GetContentTypes = {
  partition_key: string;
  sort_key: string;
  contents: CamelContentTypes;
  user_profile: UserProfileTypes;
  type: 'post_published' | 'post_draft';
  post_status: number;
  [key: string]: any;
};

export type ReviewTypes = {
  partition_key: string;
  sort_key: string;
  type: string;
  contents: ReviewContentsTypes;
  user_id: string;
  user_profile: UserProfileTypes;
  price: number;
  is_reaction: boolean;
  reaction_users: {
    display_name: string;
    icon_src: string;
  }[];
  remaining_length: number;
  payment_area: number;
  payment_type: number;
  create_year: number;
  create_day: number;
  create_month: number;
  update_year: number;
  update_month: number;
  update_day: number;
  is_delete: boolean;
  id: string;
  // TODO:実際にこの型ではcommentsは要らない。のけ方がわからないのでとりあえず入れておく
  comments: ResponseCommentTypes[];
};

export type ContentTypes = {
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
  }[];
  target_language: number;
  source_tree: SourceTreeTypes[];
  node_ids: string[];
  title: string;
  budget: number;
};

export type ProgrammingIcon = {
  id: number;
  value: string;
  iconPath: string;
  ogpPath: string;
};

export type CamelContentTypes = {
  tagList: string[];
  targetIcon: ProgrammingIcon;
  description: {
    bodyHtml: string;
    value: string;
  };
  inputFileNameLists: {
    bodyHtml: string;
    fileName: string;
    isValid: boolean;
    key: string;
    sourceCode: string;
  }[];
  targetLanguage: number;
  source_tree: SourceTreeTypes[];
  node_ids: string[];
  title: string;
  budget: number;
};

export type UserProfileTypes = {
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

export type EmailNoticesTypes = {
  is_opened_review: boolean;
  is_posted_review: boolean;
  is_commented_review: boolean;
};

export type BankTypes = {
  bank_code: string;
  bank_name: string;
  branch_code: string;
  branch_name: string;
  deposit_type: number | null;
  account_number: string;
  account_name: string;
};

export type CreditTypes = {
  partition_key: string;
  sort_key: string;
  customer_id: string;
  setup_id: string;
  setup_method: string;
  last4_chara: string;
  customChara: string;
};

export type SourceTreeTypes = {
  id: string;
  name: string;
  active_step?: number;
  children?: SourceTreeTypes[];
};

export type BookmarkTypes = {
  partition_key: string;
  sort_key: string;
};

export type ReviewContentsTypes = {
  review: {
    title: string;
    value: string;
    body_html: string;
    display_body_html: string;
  };
};

export type CustomReviewTypes = {
  partition_key: string;
  sort_key: string;
  type: string;
  contents: CustomReviewContentsTypes;
  user_id: string;
  user_profile: UserProfileTypes;
  price: number;
  is_reaction: boolean;
  reaction_users: {
    display_name: string;
    icon_src: string;
  }[];
  remaining_length: number;
  payment_area: number;
  payment_type: number;
  create_year: number;
  create_day: number;
  create_month: number;
  update_year: number;
  update_month: number;
  update_day: number;
  is_delete: boolean;
  id: string;
};

export type CustomReviewContentsTypes = {
  review: {
    title: string;
    display_body_html: string;
  };
};

export type PaymentsTypes = {};

export type ErrorTypes = {
  data: {
    status: boolean;
    status_message: string;
    status_code: number;
    [key: string]: any;
  };
};

export type PostsTypes = {
  partition_key: string;
  sort_key: string;
  posted_contents: ContentTypes;
  user_profile: UserProfileTypes;
  post_status: number;
  url: string;
  date: string;
};

export type DraftsTypes = {
  partition_key: string;
  sort_key: string;
  contents: ContentTypes;
  post_status: number;
  url: string;
  date: string;
};

export type PostsTypesInPayments = PostsTypes & {
  payments: PaymentedTypes[];
};

export type PaymentedTypes = {
  partition_key: string;
  sort_key: string;
  reviewed_contents: ReviewContentsTypes;
  reviewer_user_profile: UserProfileTypes;
  reviewer_user_id: string;
  price: number;
  date: string;
};

export type ReviewsTypes = {
  partition_key: string;
  sort_key: string;
  posted_user_profile: UserProfileTypes;
  posted_contents: ContentTypes;
  url: string;
  date: string;
  post_status: number;
};

export type SaleTypes = {
  partition_key: string;
  sort_key: string;
  reviewed_contents: ReviewContentsTypes;
  purchaser_profile: UserProfileTypes;
  year: number;
  month: number;
  day: number;
  date: string;
  price: number;
};

export type CommentContentsTypes = {
  comment: {
    value: string;
    body_html: string;
  };
};

export type ResponseCommentTypes = {
  user_profile: UserProfileTypes;
  contents: CommentContentsTypes;
  date: string;
};

export type CommentListTypes = {
  [key: string]: ResponseCommentTypes[];
};

// export type CustomReviewTypesInCommentsTypes = CustomReviewTypes & {
//   comments: ResponseCommentTypes[];
// };
