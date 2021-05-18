export const validLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validImageSize = (fileSize: number) => {
  const MAX_FILE_SIZE = 10000000; // 10MB
  return fileSize <= MAX_FILE_SIZE;
};

export const validImageExtention = (fileExtention: string) => {
  const ALLOW_FILE_EXTENTION_LIST = [
    "jpeg",
    "JPEG",
    "jpg",
    "JPG",
    "png",
    "PNG",
    "gif",
    "GIF",
  ];
  return ALLOW_FILE_EXTENTION_LIST.includes(fileExtention);
};
