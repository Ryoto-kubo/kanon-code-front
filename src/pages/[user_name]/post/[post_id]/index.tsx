// import React, { useEffect, useState } from "react";
import { ReviewEditor } from '@/components/organisms/ReviewEditor'
import { ReviewList } from '@/components/organisms/ReviewList'
import { ReviewRequestContents } from '@/components/organisms/ReviewRequestContents'
import { ReviewRequestItemHeader } from '@/components/organisms/ReviewRequestItemHeader'
import Layout from '@/layouts/standard'
import { UserTypes } from '@/types/global'
import { PostContentsTypes, PostReviewTypes } from '@/types/global/'
import { getContent } from '@/utils/api/get-content'
import Box from '@material-ui/core/Box'
// import { getPagesUrl } from "@/utils/api/get-pages-url";
import Container from '@material-ui/core/Container'
import React from 'react'
import styled from 'styled-components'

type Props = {
  authUser: any
  currentUser: null | UserTypes
  data: {
    content: PostContentsTypes
    reviews: PostReviewTypes[]
  }
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
  console.log(props)
  const content = props.data.content
  const reviews = props.data.reviews
  const reviewedUserIds = props.data.reviews.map((el) => el.user_id)
  const year = content.create_year
  const month = content.create_month
  const day = content.create_day
  const createDate = `${year}/${month}/${day}`
  const contents = content.contents
  const title = contents.title
  const myUserId = props.currentUser ? props.currentUser.partition_key : ''
  const userProfile = props.currentUser ? props.currentUser.user_profile : null
  const contributorId = content.partition_key
  const postId = content.sort_key
  const isMe = myUserId === contributorId
  const isReviewed = reviewedUserIds.includes(myUserId)
  // 自分の投稿ではない、ログインしている、まだレビューをしていなければレビューをできる
  const canReview = !isMe && myUserId !== '' && !isReviewed
  console.log(canReview)

  return (
    <Layout title={`Kanon Code | ${title}`} currentUser={props.currentUser}>
      <StyledBoxBgGray>
        <StyledContainer maxWidth="md">
          <Box mb={5}>
            <StyledBoxBgWhite>
              <Box mb={5}>
                <ReviewRequestItemHeader
                  contents={contents}
                  profile={content.user_profile}
                  createDate={createDate}
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
          {canReview && (
            <Box mb={5}>
              <StyledBoxBgWhite>
                <ReviewEditor
                  myUserId={myUserId}
                  postId={postId}
                  userProfile={userProfile}
                />
              </StyledBoxBgWhite>
            </Box>
          )}
          {reviews.length > 0 && (
            <StyledBoxBgWhite>
              <ReviewList reviews={reviews} myUserId={myUserId} />
            </StyledBoxBgWhite>
          )}
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
  console.log(result)

  return {
    props: {
      data: result.data.Items,
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
