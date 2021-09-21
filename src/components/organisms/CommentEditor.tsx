import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { SigninDialog } from '@/components/parts/signinDialog';
import * as CONSTS from '@/consts/const';
import { errorMessages, validMessages } from '@/consts/error-messages';
import { postComment } from '@/utils/api/post-comment';
import * as S3 from '@/utils/api/s3';
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post';
import { validLength } from '@/utils/valid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import marked from 'marked';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then(r => r.Editor);
    return promise;
  },
  { ssr: false }
);

type Props = {
  reviewId: string;
  // updateDisplay: (responseReview: ReviewTypes) => void;
  postStatusValue: number;
};
type ValidObject = {
  isValid: boolean;
  message: string;
};

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  };
};

export const CommentEditor: React.FC<Props> = React.memo(props => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState('コメント登録中...');
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [comment, setComment] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, '')
  );
  const [isValidReviewObject, setIsValidReviewObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_COMMENT)
  );

  const changeReview = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidReviewObject,
        isValidReviewObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_COMMENT
      );
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_COMMENT
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setComment(value);
    },
    [comment]
  );

  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value);
    },
    [activeStep]
  );

  const updateCanPublish = useCallback((isValid: boolean, message = '') => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  const createParams = (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
    displayBodyHtml: string,
    remainingLength: number
  ) => {
    return {
      postId: props.reviewId,
      contents: {
        review: {
          value: comment,
          body_html: marked(comment),
          display_body_html: displayBodyHtml,
        },
      },
      remainingLength,
      paymentType,
      paymentArea: beginPaymentArea,
      price,
    };
  };

  const post = () => {
    console.log('post');
  };

  const registerContent = async (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
    displayBodyHtml: string,
    remainingLength: number
  ) => {
    const err = new Error();
    const params = createParams(
      paymentType,
      beginPaymentArea,
      price,
      displayBodyHtml,
      remainingLength
    );
    setIsOpen(true);
    setIsOpenDialog(!isOpenDialog);
    try {
      const response = await postComment(params);
      if (!response.data.status) throw err;
      setUpdatingMessage('コメントを投稿しました');
      // props.updateDisplay(response.data.Item);
    } catch (error) {
      console.error(error);
      alert(errorMessages.REVIEW_ERROR);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Box mb={2}>
        <Editor
          id='editor'
          isFullDisplayButton={true}
          headerText='Comment'
          onChange={changeReview}
          changeActiveStep={changeActiveStep}
          value={comment}
          activeStep={activeStep}
          isValid={validLength(comment, CONSTS.MAX_COMMENT_LENGTH)}
          updateCanPublish={updateCanPublish}
          uploadImageToS3={S3.uploadImageToS3}
          MAX_LENGTH={CONSTS.MAX_COMMENT_LENGTH}
        />
      </Box>
      <Box textAlign='right'>
        <CustomSolidButton sizing='small' onClick={post} color='primary'>
          コメントする
        </CustomSolidButton>
      </Box>
      <SigninDialog
        isOpenDialog={isOpenSignin}
        closeDialog={() => setIsOpenSignin(false)}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isOpen}
        message={updatingMessage}
      />
    </>
  );
});
