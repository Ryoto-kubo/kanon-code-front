import * as CONSTS from '@/consts/const';

export const validLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validImageSize = (fileSize: number) => {
  return fileSize <= CONSTS.MAX_FILE_SIZE;
};

export const validImageExtention = (fileExtention: string) => {
  return CONSTS.ALLOW_FILE_EXTENTION_LIST.includes(fileExtention);
};

export const validEmpty = (value: string) => {
  return value !== '';
};

export const validZeroLength = (list: any[]) => {
  return list.length === 0;
};
