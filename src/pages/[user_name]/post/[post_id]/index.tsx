import { CommonHead } from '@/components/common/head';
import { CustomLoader } from '@/components/common/loader';
import { ReviewEditor } from '@/components/organisms/ReviewEditor';
import { ReviewList } from '@/components/organisms/ReviewList';
import { ReviewRequestContents } from '@/components/organisms/ReviewRequestContents';
import { ReviewRequestItemHeader } from '@/components/organisms/ReviewRequestItemHeader';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layouts/standard';
import { useIsReviewAccept } from '@/recoil/hooks/snackbarReviewAccept';
import theme from '@/styles/theme';
import { GetContentTypes, UserTypes } from '@/types/global';
import { ReviewTypes } from '@/types/global/';
import { getContent } from '@/utils/api/get-content';
import { initContents, initUserProfile } from '@/utils/init-values';
import { Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { alpha } from '@material-ui/core/styles';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes;
  isFetch: boolean;
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
const StyledBoxAnnotation = styled(Box)`
  background: ${alpha(theme.palette.secondary.main, 0.1)};
  color: ${theme.palette.secondary.main};
  text-align: center;
  margin-bottom: 16px;
  font-weight: bold;
  padding: 4px 0;
  border-radius: 4px;
`;

const IndexPage: React.FC<Props> = props => {
  const title = props.post ? props.post.contents.title : '';
  const budget = props.post ? props.post.contents.budget : undefined;
  const postId = props.post ? props.post.sort_key : '';
  const ogpPath = props.post ? props.post.contents.targetIcon.ogpPath : '';
  const userProfile = props.currentUser ? props.currentUser.user_profile : null;
  const myUserId = props.currentUser ? props.currentUser.partition_key : '';
  const contributorId = props.post ? props.post.partition_key : '';
  const isMe = myUserId === contributorId;
  const isDisplayAnnouncefForBudget = isMe && budget === undefined;
  const authUserName = props.authUser ? props.authUser['cognito:username'] : '';
  const { isReviewAccept, setIsReviewAccept } = useIsReviewAccept();
  const [postStatusValue, setPostStatusValue] = useState<number>(
    props.post ? props.post.post_status : 0
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
  console.log(canReview, 'canReview');

  return props.isFetch ? (
    <>
      <CustomLoader />
      <CommonHead
        title={`Kanon Code | ${title}`}
        description={props.post ? props.post.contents.description.value : ''}
        image={`${process.env.NEXT_PUBLIC_BUCKET_URL}${ogpPath}`}
      />
    </>
  ) : (
    <Layout title={`Kanon Code | ${title}`} currentUser={props.currentUser}>
      <CommonHead
        title={`Kanon Code | ${title}`}
        description={props.post ? props.post.contents.description.value : ''}
        image={`${process.env.NEXT_PUBLIC_BUCKET_URL}${ogpPath}`}
      />
      <StyledBoxBgGray>
        <StyledContainer maxWidth='md'>
          <Box mb={5}>
            <StyledBoxBgWhite>
              {isDisplayAnnouncefForBudget && (
                <StyledBoxAnnotation>
                  <p>編集からレビュー購入時の予算を設定できます。</p>
                </StyledBoxAnnotation>
              )}
              <Box mb={5}>
                <ReviewRequestItemHeader
                  contents={props.post ? props.post.contents : initContents}
                  profile={
                    props.post ? props.post.user_profile : initUserProfile
                  }
                  createDate={props.post ? props.post.date : ''}
                  isMe={isMe}
                  isChanging={isChanging}
                  myUserId={myUserId!}
                  postId={postId}
                  budget={budget}
                  postStatusValue={postStatusValue}
                  setPostStatusValue={setPostStatusValue}
                  setIsChanging={setIsChanging}
                />
              </Box>
              <Box mb={0}>
                <ReviewRequestContents
                  contents={props.post ? props.post.contents : initContents}
                />
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
    fallback: true,
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

export default IndexPage;
