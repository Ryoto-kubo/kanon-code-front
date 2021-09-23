import { CustomSnackbar } from '@/components/atoms/CustomSnackbar';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import * as CONSTS from '@/consts/const';
import { errorMessages, validMessages } from '@/consts/error-messages';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
import { ResponseCommentTypes } from '@/types/global';
import { postComment } from '@/utils/api/post-comment';
import * as S3 from '@/utils/api/s3';
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post';
import { validLength } from '@/utils/valid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import marked from 'marked';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { SigninAnnounce } from '../molecules/SinginAnnounce';

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then(r => r.Editor);
    return promise;
  },
  { ssr: false }
);

type Props = {
  authUserName: string;
  postId: string;
  postReviewJointId: string;
  addComment: (
    postReviewJointId: string,
    comment: ResponseCommentTypes
  ) => void;
};
type ValidObject = {
  isValid: boolean;
  message: string;
};
type CommentMessage = 'コメント投稿中...' | 'コメントを投稿しました';

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  };
};

export const CommentEditor: React.FC<Props> = React.memo(props => {
  const { authUserName, postId, postReviewJointId, addComment } = props;
  const { setIsOpenSignin } = useIsOpenSignin();

  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState<CommentMessage>(
    'コメント投稿中...'
  );
  const [comment, setComment] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [canPublish, setCanPublish] = useState<ValidObject>(
    createValidObject(true, '')
  );
  const [isValidCommentObject, setIsValidCommentObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_COMMENT)
  );

  const changeComment = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidCommentObject,
        isValidCommentObject
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
    setCanPublish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  const closeSnackBar = () => {
    setCanPublish({
      ...canPublish,
      isValid: true,
    });
  };

  const createParams = () => {
    return {
      postId, // post_xxx-xxx-xxx
      postReviewJointId: postReviewJointId,
      contents: {
        comment: {
          value: comment,
          body_html: marked(comment),
        },
      },
    };
  };

  const registerComment = async () => {
    if (!isValidCommentObject.isValid) {
      updateCanPublish(false, isValidCommentObject.message);
      return;
    }
    const err = new Error();
    const params = createParams();
    setUpdatingMessage('コメント投稿中...');
    setIsOpen(true);
    try {
      const response = await postComment(params);
      const comment = response.data.data;
      console.log(comment);

      if (!response.data.status) throw err;
      setUpdatingMessage('コメントを投稿しました');
      addComment(postReviewJointId, comment);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert(errorMessages.COMMENT_ERROR);
      setIsOpen(false);
    }
  };

  return !authUserName ? (
    <SigninAnnounce
      text='サインインするとコメントできます'
      setIsOpenSignin={setIsOpenSignin}
    />
  ) : (
    <>
      <Box mb={2}>
        <Editor
          id='editor'
          isFullDisplayButton={true}
          headerText='Comment'
          onChange={changeComment}
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
        <CustomSolidButton
          sizing='small'
          onClick={registerComment}
          color='primary'
        >
          コメントする
        </CustomSolidButton>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isOpen}
        message={updatingMessage}
      />
      <CustomSnackbar
        isOpen={!canPublish.isValid}
        closeSnackBar={closeSnackBar}
      >
        <Box fontWeight='bold'>{canPublish.message}</Box>
      </CustomSnackbar>
    </>
  );
});
