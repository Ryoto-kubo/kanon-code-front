import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { RightBorderTitle } from '@/components/molecules/RightBorderTitle'
import { ReviewSettingDialog } from '@/components/parts/reviewSettingDialog'
import * as CONSTS from '@/consts/const'
import { validMessages } from '@/consts/error-messages'
import * as S3 from '@/utils/api/s3'
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post'
import { validLength } from '@/utils/valid'
import Box from '@material-ui/core/Box'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'
const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then((r) => r.Editor)
    return promise
  },
  { ssr: false },
)

type ValidObject = {
  isValid: boolean
  message: string
}

const initReview = () => {
  return `# タイトル

## よかった点

## 改善点
`
}

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  }
}

export const ReviewEditor: React.FC = () => {
  const [review, setReview] = useState(initReview())
  const [activeStep, setActiveStep] = useState(0)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, ''),
  )
  const [isValidReviewObject, setIsValidReviewObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_DESCRIPTION),
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
    setIsOpenDialog(!isOpenDialog)
  }
  const registerContent = (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
  ) => {
    console.log(paymentType, 'paymentType')
    console.log(beginPaymentArea, 'beginPaymentArea')
    console.log(price, 'price')
    console.log(review, 'review')
  }

  return (
    <>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      <Box mb={2}>
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
        review={review}
        isOpenDialog={isOpenDialog}
        showToggleDialog={showToggleDialog}
        registerContent={registerContent}
      />
    </>
  )
}
