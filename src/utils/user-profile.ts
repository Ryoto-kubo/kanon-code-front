export class UserProfile {
  static validMaxLength(valueLength: number, MAX_LENGTH: number): boolean {
    return valueLength <= MAX_LENGTH;
  }

  static validOnlySingleByteAndUnderScore(value: string): boolean {
    const reg = new RegExp(/^[a-zA-Z0-9_]+$/);
    return reg.test(value);
  }

  static validSingleByte(value: string) {
    const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/);
    return reg.test(value);
  }

  static validFirstAndLastChara(value: string): boolean {
    const reg = new RegExp(/_/);
    const firstChara = value.slice(0, 1);
    const lastChara = value.slice(-1);
    // 文字列の最初と最後どちらかに(_)を含んでいたらfalseを返す
    return !reg.test(firstChara) && !reg.test(lastChara);
  }

  static validAllowNumber(value: number, ALLOW_LIST: number[]): boolean {
    return ALLOW_LIST.includes(value);
  }

  static validOnlytSingleByteNumber(value: string): boolean {
    const reg = new RegExp(/^[0-9]+$/);
    return reg.test(value);
  }
}
