import { Price } from '@/components/atoms/Price'
import { AnnounceOpenReview } from '@/components/molecules/AnnounceOpenReview'
import { RequestItemUser } from '@/components/molecules/RequestItemUser'
import { RightBorderTitle } from '@/components/molecules/RightBorderTitle'
import theme from '@/styles/theme'
import { PostReviewTypes } from '@/types/global/'
import Box from '@material-ui/core/Box'
import marked from 'marked'
import React from 'react'
import styled from 'styled-components'
type Props = {
  reviews: PostReviewTypes[]
}

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 8px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`
const StyledBoxBorder = styled(Box)`
  border: 3px solid ${theme.palette.primary.main};
  width: 100%;
`
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
`

export const ReviewList: React.FC<Props> = ({ reviews }) => {
  const showToggleDialog = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log('hoge')
  }
  return (
    <>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      {reviews.map((el, index) => (
        <Box key={index} component="section">
          <StyledBoxFlex mb={2}>
            <RequestItemUser
              name={el.user_profile.display_name}
              date={`${el.create_year}/${el.create_month}/${el.create_day}/`}
              userIcon={el.user_profile.icon_src}
              width={'32px'}
              height={'32px'}
            />
            <Price price={el.price} />
          </StyledBoxFlex>
          <StyledBoxTitleWrapper>
            <h1>{el.contents.review.title}</h1>
          </StyledBoxTitleWrapper>
          <div className="review-item-wrapper">
            <span
              dangerouslySetInnerHTML={{
                __html: marked(el.contents.review.display_body_html),
              }}
            />
          </div>
          <AnnounceOpenReview
            title={el.contents.review.title}
            profile={el.user_profile}
            width={'40px'}
            height={'40px'}
            price={el.price}
            showToggleDialog={showToggleDialog}
          />
          <StyledBoxBorder />
        </Box>
      ))}
    </>
  )
}
