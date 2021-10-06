type ValidObject = {
  isValid: boolean;
  message: string;
};

export class PrepareContentBeforePost {
  private value: any;
  private setFunction: React.Dispatch<React.SetStateAction<ValidObject>>;
  private validObject: ValidObject;

  constructor(
    value: any,
    setFunction: React.Dispatch<React.SetStateAction<ValidObject>>,
    validObject: ValidObject
  ) {
    this.value = value;
    this.setFunction = setFunction;
    this.validObject = validObject;
  }

  private updateValidObject = (
    isValid: boolean,
    setFunction: React.Dispatch<React.SetStateAction<ValidObject>>,
    validObject: ValidObject,
    message: string
  ) => {
    setFunction({
      ...[validObject],
      isValid: isValid,
      message: message,
    });
  };

  public validZeroLength(message: string) {
    const isValid = this.value.length === 0;
    if (isValid) {
      this.updateValidObject(
        false,
        this.setFunction,
        this.validObject,
        message
      );
      return false;
    }
    return true;
  }

  public validLength(MAX_LENGTH: number, message: string) {
    const isValid = this.value.length <= MAX_LENGTH;

    if (!isValid) {
      this.updateValidObject(
        false,
        this.setFunction,
        this.validObject,
        message
      );
      return false;
    }
    return true;
  }

  public validEmpty(message: string) {
    const isValid = this.value === '';
    if (isValid) {
      this.updateValidObject(
        false,
        this.setFunction,
        this.validObject,
        message
      );
      return false;
    }
    return true;
  }

  public successed() {
    this.updateValidObject(true, this.setFunction, this.validObject, '');
  }
}
