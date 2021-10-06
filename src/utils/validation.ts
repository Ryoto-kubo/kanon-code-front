import * as CONSTS from '@/consts/const';

export class Validation {
  constructor() {}

  static validLength = (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  };

  static validEmpty = (value: string) => {
    return value !== '';
  };

  static validNumber = (value: string) => {
    const regExp = new RegExp(/^[0-9]*$/);
    return regExp.test(value);
  };

  static validPrice = (value: number) => {
    return value > 0 && value <= CONSTS.MAX_PRICE;
  };
}
