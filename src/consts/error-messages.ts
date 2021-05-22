import * as CONSTS from '@/consts/const'
export type ErrorMessages =
  | '  SYSTEM_ERROR'
  | '  EXISTED_NAME'
  | '  IMAGE_COMPRESSION_ERROR'

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
  | 'OVER_LENGTH_SOURCE_CODE'
export const errorMessages = {
  SYSTEM_ERROR:
    'システムエラーが発生しました。しばらく時間をおいてやり直してください。',
  EXISTED_NAME: '既に使用されている名前です。',
  IMAGE_COMPRESSION_ERROR: '画像の圧縮に失敗しました',
}
export const validMessages = {
  REQUIRED_TITLE: 'タイトルを入力してください',
  REQUIRED_TAGS: 'タグを一つ以上入力してください',
  REQUIRED_DESCRIPTION: 'デスクリプションを入力してください',
  REQUIRED_FILE_NAME: 'ファイル名を入力してください',
  REQUIRED_SOURCE_CODE: 'ソースコードを入力してください',
  ONLY_SINGLEBYTE_AND_UNDERSCORE:
    '半角英数字とアンダースコア（_）のみ使用できます',
  NOT_UNDERSCORE_FOR_FIRST_LAST_CHARA:
    '最初と最後にアンダースコア（_）を使うことはできません',
  OVER_LENGTH_TITLE: `タイトルは${CONSTS.TITLE_MAX_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_DESCRIPION: `デスクリプションは${CONSTS.DESCRIPTION_MAX_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_FILE_NAME: `ファイル名は${CONSTS.FILE_NAME_MAX_LENGTH}文字以下で入力してください`,
  OVER_LENGTH_SOURCE_CODE: `ソースコードは${CONSTS.SOURCE_CODE_MAX_LENGTH}文字以下で入力してください`,
}
