import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { RightBorderTitle } from '@/components/molecules/RightBorderTitle'
import { ValidMessage } from '@/components/molecules/ValidMessage'
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper'
import { ReviewSettingDialog } from '@/components/parts/reviewSettingDialog'
import * as CONSTS from '@/consts/const'
import { validMessages } from '@/consts/error-messages'
import { UserProfileTypes } from '@/types/global'
import { postReview } from '@/utils/api/post-review'
import * as S3 from '@/utils/api/s3'
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post'
import { validLength } from '@/utils/valid'
import Box from '@material-ui/core/Box'
import marked from 'marked'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then((r) => r.Editor)
    return promise
  },
  { ssr: false },
)

type Props = {
  myUserId: string
  postId: string
  userProfile: UserProfileTypes | null
}
type ValidObject = {
  isValid: boolean
  message: string
}

const initReview = () => {
  return `## よかった点

## 改善点
`
}

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  }
}

export const ReviewEditor: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('')
  const [review, setReview] = useState(initReview())
  const [activeStep, setActiveStep] = useState(0)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isValidTitleObject, setIsValidTitleObject] = useState<ValidObject>(
    createValidObject(true, validMessages.REQUIRED_TITLE),
  )
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, ''),
  )
  const [isValidReviewObject, setIsValidReviewObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_DESCRIPTION),
  )
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidTitleObject,
        isValidTitleObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_TITLE_LENGTH,
        validMessages.OVER_LENGTH_TITLE,
      )
      if (!isValidMaxLength) return
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_TITLE,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setTitle(value)
    },
    [title],
  )
  const changeReview = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidReviewObject,
        isValidReviewObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_DESCRIPION,
      )
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_DESCRIPTION,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setReview(value)
    },
    [review],
  )
  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value)
    },
    [activeStep],
  )
  const updateCanPublish = useCallback((isValid: boolean, message = '') => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    })
  }, [])
  const showToggleDialog = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (title === '') {
      setIsValidTitleObject({
        ...isValidTitleObject,
        isValid: false,
        message: validMessages.REQUIRED_TITLE,
      })
      return
    }
    setIsOpenDialog(!isOpenDialog)
  }
  const createParams = (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
    displayBodyHtml: string,
  ) => {
    return {
      userId: props.myUserId,
      postId: props.postId,
      userProfile: props.userProfile!,
      contents: {
        review: {
          title: title,
          value: review,
          body_html: marked(review),
          display_body_html: displayBodyHtml,
        },
      },
      paymentType: paymentType,
      paymentArea: beginPaymentArea,
      price,
    }
  }
  const registerContent = async (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
    displayBodyHtml: string,
  ) => {
    const params = createParams(
      paymentType,
      beginPaymentArea,
      price,
      displayBodyHtml,
    )
    console.log(params, 'params')
    try {
      const response = await postReview(params)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <RightBorderTitle text="Review" fontSize={20} marginBottom={0} />
      <Box mb={2}>
        <Box mb={3} className="title-wrapper">
          <InputPostTitleWrapper
            title={title}
            onChange={changeTitle}
            placeholder="Title"
          />
          {!isValidTitleObject.isValid && (
            <ValidMessage validText={isValidTitleObject.message} />
          )}
        </Box>
        <Editor
          id="editor"
          isFullDisplayButton={true}
          headerText="Review"
          onChange={changeReview}
          changeActiveStep={changeActiveStep}
          value={review}
          activeStep={activeStep}
          isValid={validLength(review, CONSTS.MAX_REVIEW_LENGTH)}
          updateCanPublish={updateCanPublish}
          uploadImageToS3={S3.uploadImageToS3}
          MAX_LENGTH={CONSTS.MAX_REVIEW_LENGTH}
        />
      </Box>
      <Box textAlign="right">
        <CustomSolidButton
          sizing="small"
          onClick={showToggleDialog}
          color="secondary"
        >
          レビュー設定
        </CustomSolidButton>
      </Box>
      <ReviewSettingDialog
        title={title}
        review={review}
        isOpenDialog={isOpenDialog}
        showToggleDialog={showToggleDialog}
        registerContent={registerContent}
      />
    </>
  )
}
