import { Price } from '@/components/atoms/Price'
import { CustomLoader } from '@/components/common/loader'
import { AnnounceOpenReview } from '@/components/molecules/AnnounceOpenReview'
import { RequestItemUser } from '@/components/molecules/RequestItemUser'
import { RightBorderTitle } from '@/components/molecules/RightBorderTitle'
import { PaymentDialog } from '@/components/parts/paymentDialog'
import { RegistCreditAnnounceDialog } from '@/components/parts/registCreditAnnounceDialog'
import {
  PAYMENT_FEE,
  PAYMENT_FREE,
  REVIEW_PREFIX,
  USER_PREFIX,
} from '@/consts/const'
import { useCredit } from '@/hooks/useCredit'
import theme from '@/styles/theme'
import { ReviewTypes } from '@/types/global/'
import Box from '@material-ui/core/Box'
import marked from 'marked'
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  authUserId: string
  reviews: ReviewTypes[]
}

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 8px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`
const StyledBoxBorder = styled(Box)`
  border: 1px dashed #dddddd;
  // border: 1px solid ${theme.palette.primary.main};
  width: 100%;
  margin: 8px 0;
`
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ReviewList: React.FC<Props> = ({ authUserId, reviews }) => {
  const [isOpenPayment, setIsOpenPayment] = useState(false)
  const [isOpenCreditAnnounce, setIsOpenCreditAnnounce] = useState(false)
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [iconSrc, setIconSrc] = useState('')
  const [price, setPrice] = useState(0)
  const { credit, isLoading } = useCredit(authUserId)
  const partitionKey = `${USER_PREFIX}${authUserId}`
  const myReviewId = `${REVIEW_PREFIX}${USER_PREFIX}${authUserId}`
  console.log(reviews)

  const showToggleDialog = (
    argTitle: string,
    argName: string,
    argIconSrc: string,
    argPrice: number,
  ) => {
    if (credit === null) {
      setIsOpenCreditAnnounce(true)
      return
    }
    if (partitionKey !== credit.partition_key) return
    setTitle(argTitle)
    setName(argName)
    setIconSrc(argIconSrc)
    setPrice(argPrice)
    setIsOpenPayment(true)
  }
  const payment = () => {
    console.log('pay')
  }
  const closePaymentDialog = () => {
    setIsOpenPayment(false)
  }
  const closeCreditDialog = () => {
    setIsOpenCreditAnnounce(false)
  }
  const renderReviewedItem = (el: ReviewTypes, index: number) => {
    const name = el.user_profile.display_name
    const iconSrc = el.user_profile.icon_src
    const price = el.price
    const title = el.contents.review.title
    const date = `${el.create_year}/${el.create_month}/${el.create_day}`
    const pyamentType = el.payment_type
    const bodyHtml = el.contents.review.body_html
    const displayBodyHtml = el.contents.review.display_body_html
    const isSelfReviewItem = el.sort_key === myReviewId
    const isPaymentFree = el.payment_type === PAYMENT_FREE
    return (
      <Box key={index} component="section" mb={7}>
        <StyledBoxFlex mb={2}>
          <RequestItemUser
            name={name}
            date={date}
            userIcon={iconSrc}
            width={'32px'}
            height={'32px'}
          />
          {pyamentType === PAYMENT_FEE && <Price price={price} />}
        </StyledBoxFlex>
        <StyledBoxTitleWrapper>
          <h1>{title}</h1>
        </StyledBoxTitleWrapper>
        <div className="review-item-wrapper">
          <span
            dangerouslySetInnerHTML={{
              __html: marked(
                isSelfReviewItem || isPaymentFree ? bodyHtml : displayBodyHtml,
              ),
            }}
          />
        </div>
        {!isSelfReviewItem && (
          <AnnounceOpenReview
            title={title}
            profile={el.user_profile}
            width={'40px'}
            height={'40px'}
            price={price}
            showToggleDialog={() =>
              showToggleDialog(title, name, iconSrc, price)
            }
          />
        )}
        <StyledBoxBorder />
      </Box>
    )
  }

  return (
    <>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      {isLoading ? (
        <Box position="relative" padding={1}>
          <CustomLoader width={40} height={40} />
        </Box>
      ) : (
        reviews.map((el, index) => renderReviewedItem(el, index))
      )}
      <PaymentDialog
        title={title}
        name={name}
        iconSrc={iconSrc}
        price={price}
        width={'40px'}
        height={'40px'}
        isOpenDialog={isOpenPayment}
        closeDialog={closePaymentDialog}
        payment={() => payment}
      />
      <RegistCreditAnnounceDialog
        isOpenDialog={isOpenCreditAnnounce}
        showToggleDialog={closeCreditDialog}
      />
    </>
  )
}
