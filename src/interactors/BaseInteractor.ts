import { ResponseContentsTypes } from '@/types/api/get-contents';
import { axios } from '@/utils/axios';
import { AxiosResponse } from 'axios';

class BaseInteractor {
  createContentsInteractor() {
    return {
      get: (
        path: string,
        payload?: any
      ): Promise<AxiosResponse<ResponseContentsTypes>> => {
        return axios.get(path, payload);
      },
    };
  }
}

export default new BaseInteractor();
