import * as CONSTS from '@/consts/const';
export type ErrorMessages =
  | '  SYSTEM_ERROR'
  | '  EXISTED_NAME'
  | '  IMAGE_COMPRESSION_ERROR';
export type ValidMessages =
  | 'REQUIRED_TITLE'
  | 'REQUIRED_TAGS'
  | 'REQUIRED_DESCRIPTION'
  | 'REQUIRED_FILE_NAME'
  | 'REQUIRED_SOURCE_CODE'
  | 'ONLY_SINGLEBYTE_AND_UNDERSCORE'
  | 'NOT_UNDERSCORE_FOR_FIRST_LAST_CHARA'
  | 'OVER_LENGTH_TITLE'
  | 'OVER_LENGTH_DESCRIPION'
  | 'OVER_LENGTH_FILE_NAME'
  | 'OVER_LENGTH_SOURCE_CODE';
export const errorMessages = {
  SYSTEM_ERROR:
    'システムエラーが発生しました。しばらく時間をおいてやり直してください。',
  PAYMENT_ERROR:
    '購入処理に失敗しました。しばらく時間をおいてやり直してください。',
  BOOKMARK_ERROR:
    'ブックマークの登録又は解除に失敗しました。しばらく時間をおいてやり直してください。',
  REVIEW_ERROR:
    'レビューの投稿に失敗しました。しばらく時間をおいてやり直してください。',
  COMMENT_ERROR:
    'コメントの投稿に失敗しました。しばらく時間をおいてやり直してください。',
  EXISTED_NAME: '既に使用されている名前です。',
  IMAGE_COMPRESSION_ERROR: '画像の圧縮に失敗しました',
  INVAILD_VALUE: '不正な値です',
  INVAILD_ACTION: '不正な操作です',
};
export const validMessages = {
  REQUIRED_TITLE: 'タイトルを入力してください',
  REQUIRED_TAGS: 'タグを一つ以上入力してください',
  REQUIRED_DESCRIPTION: 'デスクリプションを入力してください',
  REQUIRED_COMMENT: 'コメントを入力してください',
  REQUIRED_FILE_NAME: 'ファイル名を入力してください',
  REQUIRED_SOURCE_CODE: 'ソースコードを入力してください',
  ONLY_SINGLEBYTE_AND_UNDERSCORE:
    '半角英数字とアンダースコア（_）のみ使用できます',
  ONLY_SINGLEBYTE: '半角英数字のみ使用できます',
  ONLY_SINGLEBYTE_NUMBER: '半角数字で入力してください',
  NOT_UNDERSCORE_FOR_FIRST_LAST_CHARA:
    '最初と最後にアンダースコア（_）を使うことはできません',
  NOT_ACCEPT_FILE_EXTENTION: 'JPEG、PNG、GIF画像のみをアップロードできます',
  NOT_SELECTED_PAYMENTAREA: '有料範囲を選択してください',
  OVER_FILE_SIZE: '10MB以下の画像を選択してください',
  OVER_LENGTH_TITLE: `タイトルは${CONSTS.MAX_TITLE_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_DESCRIPION: `デスクリプションは${CONSTS.MAX_DESCRIPTION_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_COMMENT: `コメントは${CONSTS.MAX_COMMENT_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_FILE_NAME: `ファイル名は${CONSTS.MAX_FILE_NAME_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_SOURCE_CODE: `ソースコードは${CONSTS.MAX_SOURCE_CODE_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_PRICE: `${CONSTS.MAX_PRICE_LENGTH}桁以下の数値を入力してください`,
  ZERO_UNDER_OVER_MAX_PRICE: '¥0~¥100,000以内の金額を入力してください',
};
