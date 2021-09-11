import { AcceptReviewIcon } from '@/components/atoms/AcceptReviewIcon';
import { StopReviewIcon } from '@/components/atoms/StopReviewIcon';
import { CustomLoader } from '@/components/common/loader';
import { ReviewEditor } from '@/components/organisms/ReviewEditor';
import { ReviewList } from '@/components/organisms/ReviewList';
import { ReviewRequestContents } from '@/components/organisms/ReviewRequestContents';
import { ReviewRequestItemHeader } from '@/components/organisms/ReviewRequestItemHeader';
import { ACCEPT_REVIEW, STOP_REVIEW } from '@/consts/const';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layouts/standard';
import { useIsReviewAccept } from '@/recoil/hooks/snackbarReviewAccept';
import { GetContentTypes, UserTypes } from '@/types/global';
import { ReviewTypes } from '@/types/global/';
import { getContent } from '@/utils/api/get-content';
import { Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
  post: GetContentTypes;
};

const StyledBoxBgGray = styled(Box)`
  padding: 40px 0px;
  ${props => props.theme.breakpoints.up('sm')} {
    background: #fafafa;
    padding: 40px 16px;
  }
`;
const StyledBoxBgWhite = styled(Box)`
  padding: 0px;
  border-radius: 4px;
  ${props => props.theme.breakpoints.up('sm')} {
    background: #ffffff;
    padding: 24px;
  }
`;
const StyledContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 48px;
`;

const IndexPage: React.FC<Props> = props => {
  const post = props.post;
  const contents = props.post.contents;
  const title = contents.title;
  const postId = post.sort_key;
  const userProfile = props.currentUser ? props.currentUser.user_profile : null;
  const myUserId = props.currentUser ? props.currentUser.partition_key : '';
  const contributorId = post.partition_key;
  const isMe = myUserId === contributorId;
  const authUserName = props.authUser ? props.authUser['cognito:username'] : '';
  const { isReviewAccept, setIsReviewAccept } = useIsReviewAccept();
  const [postStatusValue, setPostStatusValue] = useState<number>(
    post.post_status
  );
  const [isChanging, setIsChanging] = useState<boolean>(false);

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
  } = useReviews(postId, isMe, myUserId);
  const status = reviewsResponse.data.status && creditResponse.data.status;
  const updateDisplay = (responseReview: ReviewTypes) => {
    // 投稿した直後は自身のものなので全文表示させる
    responseReview.contents.review.display_body_html =
      responseReview.contents.review.body_html;
    const newReviews = reviews!.slice();
    newReviews.unshift(responseReview);
    setCanReview(false);
    setReviews(newReviews);
  };

  return (
    <Layout title={`Kanon Code | ${title}`} currentUser={props.currentUser}>
      <StyledBoxBgGray>
        <StyledContainer maxWidth='md'>
          <Box mb={5}>
            <StyledBoxBgWhite>
              <Box
                position='relative'
                component='span'
                width={110}
                display='inline-block'
              >
                {isChanging ? (
                  <CustomLoader width={20} height={20} />
                ) : postStatusValue === ACCEPT_REVIEW ? (
                  <AcceptReviewIcon />
                ) : (
                  postStatusValue === STOP_REVIEW && <StopReviewIcon />
                )}
              </Box>
              <Box mb={5}>
                <ReviewRequestItemHeader
                  contents={contents}
                  profile={post.user_profile}
                  createDate={post.date}
                  isMe={isMe}
                  myUserId={myUserId!}
                  postId={postId}
                  postStatusValue={postStatusValue}
                  setPostStatusValue={setPostStatusValue}
                  setIsChanging={setIsChanging}
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
                postStatusValue={postStatusValue}
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
              paymentedList={paymentedList!}
              setPaymentedList={setPaymentedList}
            />
          </StyledBoxBgWhite>
        </StyledContainer>
      </StyledBoxBgGray>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isReviewAccept}
        onClose={() => setIsReviewAccept(false)}
        message='募集状況を変更しました。'
      />
    </Layout>
  );
};

// サーバーサイドで実行される
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (props: any) => {
  const postId = props.params.post_id;
  const result = await getContent({ postId: postId });
  return {
    props: {
      post: result.data.post,
    },
    revalidate: 30,
  };
};

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
//   const postId = context.query.post_id;
//   const result = await getContent({ postId: postId });
//   return {
//     props: {
//       post: result.data.post,
//       // data: result.data.Items[0],
//     },
//   };
// };

export default IndexPage;
