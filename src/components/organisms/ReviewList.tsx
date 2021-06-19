import { RightBorderTitle } from "@/components/molecules/RightBorderTitle";
import * as CONSTS from "@/consts/const";
import { validMessages } from "@/consts/error-messages";
import * as S3 from "@/utils/api/s3";
import { PrepareContentBeforePost } from "@/utils/prepare-content-before-post";
import { validLength } from "@/utils/valid";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";

const Editor = dynamic(
  () => {
    const promise = import("@/components/parts/editor").then((r) => r.Editor);
    return promise;
  },
  { ssr: false }
);

type ValidObject = {
  isValid: boolean;
  message: string;
};

export const ReviewList: React.FC = () => {
  const createValidObject = useCallback((defaultValue, defaultMessage) => {
    return {
      isValid: defaultValue,
      message: defaultMessage,
    };
  }, []);

  const [description, setDescription] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, "")
  );

  const [isValidDescriptionObject, setIsValidDescriptionObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_DESCRIPTION));

  const changeDescritption = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidDescriptionObject,
        isValidDescriptionObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_DESCRIPION
      );
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_DESCRIPTION
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setDescription(value);
    },
    [description]
  );
  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value);
    },
    [activeStep]
  );
  const updateCanPublish = useCallback((isValid: boolean, message = "") => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  return (
    <>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      <Editor
        id="editor"
        name="Review"
        headerText="Review"
        onChange={changeDescritption}
        changeActiveStep={changeActiveStep}
        value={description}
        activeStep={activeStep}
        isValid={validLength(description, CONSTS.MAX_DESCRIPTION_LENGTH)}
        updateCanPublish={updateCanPublish}
        uploadImageToS3={S3.uploadImageToS3}
        MAX_LENGTH={CONSTS.MAX_DESCRIPTION_LENGTH}
      />
    </>
  );
};
