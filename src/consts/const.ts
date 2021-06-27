export const MAX_TITLE_LENGTH = 32
export const MAX_TAGS_LENGTH = 5
export const MAX_PRICE_LENGTH = 5
export const MAX_NAME_LENGTH = 15
export const MAX_LANG_LENGTH = 15
export const MAX_BANK_CODE_LENGTH = 4
export const MAX_BANK_NAME_LENGTH = 32
export const MAX_BRANCH_CODE_LENGTH = 3
export const MAX_BRANCH_NAME_LENGTH = 32
export const MAX_ACCOUNT_NUMBER_LENGTH = 8
export const MAX_ACCOUNT_NAME_LENGTH = 32
export const MAX_OTHERE_SERVICE_NAME_LENGTH = 100
export const MAX_INTRODUCTION_LENGTH = 300
export const MAX_DESCRIPTION_LENGTH = 1500
export const MAX_SOURCE_CODE_LENGTH = 10_000
export const MAX_REVIEW_LENGTH = 10_000
export const MAX_FILE_NAME_LENGTH = 32
export const MAX_FILE_SIZE = 10_000_000 // 10MB
export const MAX_PRICE = 100_000 // 10MB
export const PAYMENT_FREE = 0
export const PAYMENT_FEE = 1
export const USER_PREFIX = 'user_'
export const REVIEW_PREFIX = 'review_'
export const ALLOW_POSITION_TYPE_LIST = [0, 1, 2, 3, 4]
export const ALLOW_FILE_EXTENTION_LIST = [
  'jpeg',
  'JPEG',
  'jpg',
  'JPG',
  'png',
  'PNG',
  'gif',
  'GIF',
]
export const INITIAL_SKILS = [
  {
    language: '',
    yearsExperience: '1年~2年',
    value: 0,
  },
  {
    language: '',
    yearsExperience: '1年~2年',
    value: 0,
  },
  {
    language: '',
    yearsExperience: '1年~2年',
    value: 0,
  },
  {
    language: '',
    yearsExperience: '1年~2年',
    value: 0,
  },
  {
    language: '',
    yearsExperience: '1年~2年',
    value: 0,
  },
]
export const INITIAL_USER_PROFILE = {
  display_name: '',
  github_name: '',
  icon_src: '',
  introduction: '',
  position_type: 0,
  price: 0,
  skils: [
    {
      language: '',
      years_experiences: 0,
    },
    {
      language: '',
      years_experiences: 0,
    },
    {
      language: '',
      years_experiences: 0,
    },
    {
      language: '',
      years_experiences: 0,
    },
    {
      language: '',
      years_experiences: 0,
    },
  ],
  twitter_name: '',
  web_site: '',
}
export const INITIAL_BANK = {
  bank_code: '',
  bank_name: '',
  branch_code: '',
  branch_name: '',
  deposit_type: null,
  account_number: '',
  account_name: '',
}
