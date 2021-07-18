import { SolidLink } from "@/components/atoms/SolidLink";
// import { PaymentedReview } from '@/components/molecules/PaymentedReview';
// import { PostedTitle } from '@/components/molecules/PostedTitle';
import { Post } from "@/components/organisms/Post";
import { NonArticleIllustration } from "@/components/parts/illustrations/non-article";
// import { NonPaymentIllustration } from "@/components/parts/illustrations/non-payment";
import { NonWorkingIllustration } from "@/components/parts/illustrations/non-working";
import { PostsTypes, ReviewsTypes } from "@/types/global";
import Box from "@material-ui/core/Box";
// import { PaymentedTypes, PostsTypes } from "@/types/global";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
type Props = {
  posts: PostsTypes[];
  reviews: ReviewsTypes[];
};

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #e8e8e8;
  margin-top: 16px;
`;
const StyledTab = styled(Tab)`
  min-width: 100px;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    color: #202020;
  }
`;
// const StyledBoxPaymentWrapper = styled(Box)`
//   padding: 12px;
//   width: 100%;
// `

const TabPanel = (props: {
  value: number;
  index: number;
  children: ReactNode;
}) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
const makePostUrl = (profile: any, postId: string) => {
  const displayName = profile.display_name;
  const splitedPostId = postId.split("_").pop();
  return `${displayName}/post/${splitedPostId}`;
};
const splitPostsByPostStatus = (posts: PostsTypes[]) => {
  let acceptPosts = [];
  let reviewedPosts = [];
  let paymentedPosts = [];
  const ACCEPTING = 0;
  const REVIEWED = 1;
  const PAYMENTED = 2;
  for (const item of posts) {
    switch (item.post_status) {
      case ACCEPTING:
        acceptPosts.push(item);
        break;
      case REVIEWED:
        reviewedPosts.push(item);
        break;
      case PAYMENTED:
        paymentedPosts.push(item);
        break;
    }
  }
  return {
    acceptPosts,
    reviewedPosts,
    paymentedPosts,
  };
};

export const MyReviews: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };
  const { acceptPosts } = splitPostsByPostStatus(props.posts);

  return (
    <>
      <Box mb={3}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          <StyledTab label="レビュー依頼中" disableRipple={true} />
          <StyledTab label="レビューをした投稿" disableRipple={true} />
          {/* <StyledTab label="開封したレビュー" disableRipple={true} /> */}
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {acceptPosts.length === 0 ? (
              <NonWorkingIllustration marginBottom={2}>
                <SolidLink href="/post/new" borderRadius={4}>
                  レビューを依頼する
                </SolidLink>
              </NonWorkingIllustration>
            ) : (
              acceptPosts.map((post: PostsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={post.posted_contents.title}
                    postUrl={makePostUrl(post.user_profile, post.sort_key)}
                    iconPath={post.posted_contents.target_icon.icon_path}
                    name={post.user_profile.display_name}
                    date={post.date}
                    tagArray={post.posted_contents.tag_list}
                    userIcon={post.user_profile.icon_src}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {props.reviews.length === 0 ? (
              <NonArticleIllustration marginBottom={2}>
                <SolidLink href="/" borderRadius={4}>
                  投稿を探しにいく！
                </SolidLink>
              </NonArticleIllustration>
            ) : (
              <Grid item xs={12} sm={6} md={6} lg={4} >
                {props.reviews.map((review: ReviewsTypes) => (
                  <Post
                    key={uuidv4()}
                    title={review.posted_contents.title}
                    postUrl={makePostUrl(
                      review.posted_user_profile,
                      review.partition_key
                    )}
                    iconPath={review.posted_contents.target_icon.icon_path}
                    name={review.posted_user_profile.display_name}
                    date={review.date}
                    tagArray={review.posted_contents.tag_list}
                    userIcon={review.posted_user_profile.icon_src}
                  />
                ))}
              </Grid>
            )}
          </Grid>
        </Box>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {props.posts.length === 0 ? (
              <NonPaymentIllustration marginBottom={2}>
              </NonPaymentIllustration>
            ) : (
                props.posts.map((post: PostsTypes) => (
                  <StyledBoxPaymentWrapper key={uuidv4()}>
                    {post.payments.length > 0 ? (
                      <>
                      <Box mb={1}>
                        <PostedTitle
                          imgWidth="40px"
                          imgHeight="40px"
                          iconSrc={post.posted_contents.target_icon.icon_path}
                          url={makePostUrl(post.user_profile, post.sort_key)}
                          title={post.posted_contents.title}
                          fontSize={16}
                          marginBottom={0}
                          tagList={post.posted_contents.tag_list}
                        />
                      </Box>
                      <Grid spacing={3} container>
                        {
                          post.payments.map((payment: PaymentedTypes) =>
                            <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                              <PaymentedReview
                                key={uuidv4()}
                                reviwerName={payment.reviewer_user_profile.display_name}
                                date={payment.date}
                                userIcon={payment.reviewer_user_profile.icon_src}
                                price={payment.price}
                                title={payment.reviewed_contents.review.title}
                                fontSize={16}
                                marginBottom={0}
                              />
                            </Grid>
                          )
                        }
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Box mb={1}>
                        <PostedTitle
                          imgWidth="40px"
                          imgHeight="40px"
                          iconSrc={post.posted_contents.target_icon.icon_path}
                          url={makePostUrl(post.user_profile, post.sort_key)}
                          title={post.posted_contents.title}
                          fontSize={16}
                          marginBottom={0}
                          tagList={post.posted_contents.tag_list}
                        />
                      </Box>
                      <p>
                        まだレビューを購入していません。
                      </p>
                    </>
                  )}
                </StyledBoxPaymentWrapper>
              ))
            )}
          </Grid>
        </Box>
      </TabPanel> */}
    </>
  );
};
