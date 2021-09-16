import { errorMessages } from '@/consts/error-messages';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

export class PrepareImageBeforePost {
  constructor(private fileObject: File) {}

  private getFileSize(): number {
    return this.fileObject.size;
  }

  private getFileExtention(): string {
    return this.fileObject.name.split('.').pop()!;
  }

  public async compressionImage(): Promise<File | null> {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      return await imageCompression(this.fileObject, options);
    } catch {
      console.error(errorMessages.IMAGE_COMPRESSION_ERROR);
      return null;
    }
  }

  public validImageSize(): boolean {
    const MAX_FILE_SIZE = 10000000; // 10MB
    const fileSize = this.getFileSize();
    return fileSize <= MAX_FILE_SIZE;
  }

  public validImageExtention(): boolean {
    const ALLOW_FILE_EXTENTION_LIST = [
      'jpeg',
      'JPEG',
      'jpg',
      'JPG',
      'png',
      'PNG',
      'gif',
      'GIF',
    ];
    const fileExtention = this.getFileExtention();
    return ALLOW_FILE_EXTENTION_LIST.includes(fileExtention);
  }

  public createNewFileName(): string {
    const uuid = uuidv4();
    const fileExtention = this.getFileExtention();
    return `${uuid}.${fileExtention}`;
  }
}
