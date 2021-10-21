import { apis } from '@/consts/api/';
import { errorMessages } from '@/consts/error-messages';
import BaseInteractor from '@/interactors/BaseInteractor';
import { ResponseContentsTypes } from '@/types/api/get-contents';
import { AxiosResponse } from 'axios';

interface ClientInterface {
  get: (
    path: string,
    payload?: any
  ) => Promise<AxiosResponse<ResponseContentsTypes>>;
}

export default class ContentsInteractor {
  private readonly interactor: ClientInterface;

  constructor() {
    this.interactor = BaseInteractor.createContentsInteractor();
  }

  async findAll() {
    let result: ResponseContentsTypes = {
      frontPosts: [],
      backPosts: [],
      otherPosts: [],
      status: false,
      status_code: 500,
      status_message: errorMessages.SYSTEM_ERROR,
    };

    try {
      const response = await this.interactor.get(apis.CONTENTS);
      result = response.data;
    } catch (error) {
      console.log(error, 'error');
    }
    return result;
  }
}
