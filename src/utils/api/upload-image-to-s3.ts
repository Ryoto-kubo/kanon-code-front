import { axios } from '@/utils/axios'

export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  await axios.put(presignedUrl, file)
}
