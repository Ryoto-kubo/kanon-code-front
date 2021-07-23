// import React, { useEffect, useState } from "react";
import { ReviewEditor } from '@/components/organisms/ReviewEditor'
import { ReviewList } from '@/components/organisms/ReviewList'
import { ReviewRequestContents } from '@/components/organisms/ReviewRequestContents'
import { ReviewRequestItemHeader } from '@/components/organisms/ReviewRequestItemHeader'
import { useReviews } from '@/hooks/useReviews'
import Layout from '@/layouts/standard'
import { UserTypes } from '@/types/global'
import { PostContentsTypes, ReviewTypes } from '@/types/global/'
import { getContent } from '@/utils/api/get-content'
import Box from '@material-ui/core/Box'
// import { getPagesUrl } from "@/utils/api/get-pages-url";
import Container from '@material-ui/core/Container'
import React from 'react'
import styled from 'styled-components'

type Props = {
  authUser: any
  currentUser: UserTypes | null
  post: PostContentsTypes
}

const StyledBoxBgGray = styled(Box)`
  padding: 40px 0px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    background: #fafafa;
    padding: 40px 16px;
  }
`
const StyledBoxBgWhite = styled(Box)`
  padding: 0px;
  border-radius: 4px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    background: #ffffff;
    padding: 24px;
  }
`
const StyledContainer = styled(Container)`
  padding-top: 24px;
`

const IndexPage: React.FC<Props> = (props) => {
  const post = props.post
  const contents = props.post.contents
  const title = contents.title
  const postId = post.sort_key
  const userProfile = props.currentUser ? props.currentUser.user_profile : null
  const myUserId = props.currentUser ? props.currentUser.partition_key : ''
  const contributorId = post.partition_key
  const isMe = myUserId === contributorId
  const authUserName = props.authUser ? props.authUser['cognito:username'] : ''
  const {
    creditResponse,
    reviewsResponse,
    credit,
    reviews,
    setReviews,
    canReview,
    setCanReview,
    paymentedList,
    setPaymentedList,
    isLoading,
  } = useReviews(postId, isMe, myUserId)
  const status = reviewsResponse.data.status && creditResponse.data.status
  const updateDisplay = (responseReview: ReviewTypes) => {
    // 投稿した直後は自身のものなので全文表示させる
    responseReview.contents.review.display_body_html =
      responseReview.contents.review.body_html
    const newReviews = reviews!.slice()
    newReviews.unshift(responseReview)
    setCanReview(false)
    setReviews(newReviews)
  }

  return (
    <Layout title={`Kanon Code | ${title}`} currentUser={props.currentUser}>
      <StyledBoxBgGray>
        <StyledContainer maxWidth="md">
          <Box mb={5}>
            <StyledBoxBgWhite>
              <Box mb={5}>
                <ReviewRequestItemHeader
                  contents={contents}
                  profile={post.user_profile}
                  createDate={post.date}
                  isMe={isMe}
                  myUserId={myUserId!}
                  postId={postId}
                />
              </Box>
              <Box mb={0}>
                <ReviewRequestContents contents={contents} />
              </Box>
            </StyledBoxBgWhite>
          </Box>
          <Box mb={5}>
            <StyledBoxBgWhite>
              <ReviewEditor
                myUserId={myUserId}
                postId={postId}
                isMe={isMe}
                isLoading={isLoading}
                canReview={canReview}
                updateDisplay={updateDisplay}
              />
            </StyledBoxBgWhite>
          </Box>
          <StyledBoxBgWhite>
            <ReviewList
              status={status}
              credit={credit!}
              reviews={reviews!}
              setReviews={setReviews}
              isMe={isMe}
              isLoading={isLoading}
              authUserName={authUserName}
              postId={postId}
              isReviewsLoading={isLoading}
              userProfile={userProfile}
              paymentedList={paymentedList}
              setPaymentedList={setPaymentedList}
            />
          </StyledBoxBgWhite>
        </StyledContainer>
      </StyledBoxBgGray>
    </Layout>
  )
}

// サーバーサイドで実行される
export const getStaticPaths = async () => {
  // const result = await getPagesUrl();
  // const paths = result.data.map(
  //   (el: { postId: string; displayName: string }) => ({
  //     params: {
  //       post_id: el.postId,
  //       user_name: el.displayName,
  //     },
  //   })
  // );
  return {
    paths: [],
    fallback: true,
  }
}

// export const getServeSideProps = async (props: any) => {
export const getStaticProps = async (props: any) => {
  const postId = props.params.post_id
  const result = await getContent({ postId: postId })
  return {
    props: {
      post: result.data.post,
    },
  }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
// export const getInitialProps = async (context: any) => {
//   const postId = context.params.post_id;
//   const result = await getContent({ postId: postId });
//   return {
//     props: {
//       data: result.data.Items[0],
//     },
//   };
// };
// export const getServerSideProps = async (context: any) => {
//   const postId = context.params.post_id;
//   const result = await getContent({ postId: postId });
//   return {
//     props: {
//       data: result.data.Items[0],
//     },
//   };
// };

export default IndexPage
