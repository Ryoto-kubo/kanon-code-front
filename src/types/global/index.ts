export type UserTypes = {
  create_day: number
  create_month: number
  create_year: number
  display_name: string
  is_payment: boolean
  partition_key: string
  sort_key: string
  type: string
  user_id: string
  user_profile: UserProfileTypes
  email_notices: EmailNoticesTypes
  is_github_connect: boolean
  is_delete: boolean
}

export type PostContentsTypes = {
  update_day: number
  update_month: number
  partition_key: string
  is_delete: boolean
  contents: ContentTypes
  sort_key: string
  user_id: string
  post_status: number
  update_year: number
  user_profile: UserProfileTypes
  create_year: number
  create_day: number
  create_month: number
  type: string
  [key: string]: any
}

export type ReviewTypes = {
  partition_key: string
  sort_key: string
  type: string
  contents: ReviewContentTypes
  user_id: string
  user_profile: UserProfileTypes
  price: number
  payment_area: number
  payment_type: number
  create_year: number
  create_day: number
  create_month: number
  update_year: number
  update_month: number
  update_day: number
  is_delete: boolean
}

export type ContentTypes = {
  tag_list: string[]
  target_icon: {
    icon_path: string
    id: number
    value: string
  }
  description: {
    body_html: string
    value: string
  }
  input_file_name_lists: {
    body_html: string
    file_name: string
    is_valid: boolean
    key: string
    source_code: string
  }[]
  target_language: number
  source_tree: SourceTreeTypes[]
  node_ids: string[]
  title: string
}

export type UserProfileTypes = {
  display_name: string
  github_name: string
  icon_src: string
  introduction: string
  position_type: number
  price: number
  skils: {
    language: string
    years_experiences: number
  }[]
  twitter_name: string
  web_site: string
}

export type EmailNoticesTypes = {
  is_opened_review: boolean
  is_requested_review: boolean
}

export type BankTypes = {
  bank_code: string
  bank_name: string
  branch_code: string
  branch_name: string
  deposit_type: number | null
  account_number: string
  account_name: string
}

export type CreditTypes = {
  partition_key: string
  sort_key: string
  customer_id: string
  setup_client_secret: string
  setup_id: string
  setup_method: string
  last4_chara: string
  customChara: string
}

export type SourceTreeTypes = {
  id: string
  name: string
  active_step?: number
  children?: SourceTreeTypes[]
}

export type BookmarkTypes = {
  partition_key: string
  sort_key: string
}

export type ReviewContentTypes = {
  review: {
    title: string
    value: string
    body_html: string
    display_body_html: string
  }
}

export type ErrorTypes = {
  data: {
    status: boolean
    status_message: string
    status_code: number
    [key: string]: any
  }
}
