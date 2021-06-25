import { CustomSolidButton } from '@/components/atoms/SolidButton'
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

const StyledBoxBorder = styled(Box)`
  border: 3px solid ${theme.palette.primary.main};
  width: 100%;
`
const StyledBoxShowMessage = styled(Box)`
  text-align: center;
  margin-bottom: 32px;
  &:after {
    border-top: 1px dashed #a8abb1;
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -12px;
    content: '';
  }
`
const StyledBoxBg = styled(Box)`
  background: #ffffff;
  display: inline-block;
  padding: 0 8px;
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
        <Box key={index}>
          <Box mb={1}>
            <RequestItemUser
              name={el.user_profile.display_name}
              date={`${el.create_year}/${el.create_month}/${el.create_day}/`}
              userIcon={el.user_profile.icon_src}
              width={'32px'}
              height={'32px'}
            />
          </Box>
          <div className="review-item-wrapper">
            <span
              dangerouslySetInnerHTML={{
                __html: marked(el.contents.review.display_body_html),
              }}
            />
          </div>
          <StyledBoxShowMessage>
            <StyledBoxBg>続きのレビューを見るには</StyledBoxBg>
          </StyledBoxShowMessage>
          <Box textAlign="center" mb={2}>
            <CustomSolidButton
              sizing="small"
              onClick={showToggleDialog}
              color="secondary"
            >
              レビューを開封する
            </CustomSolidButton>
          </Box>
          <StyledBoxBorder />
        </Box>
      ))}
    </>
  )
}
