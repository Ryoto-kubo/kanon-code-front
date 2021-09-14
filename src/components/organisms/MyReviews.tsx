import { SolidLink } from '@/components/atoms/SolidLink';
import { Post } from '@/components/organisms/Post';
import { NonArticleIllustration } from '@/components/parts/illustrations/non-article';
import { NonWorkingIllustration } from '@/components/parts/illustrations/non-working';
import { ACCEPT_REVIEW, STOP_REVIEW } from '@/consts/const';
import { PostsTypes, ReviewsTypes } from '@/types/global';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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

const TabPanel = (props: {
  value: number;
  index: number;
  children: ReactNode;
}) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const splitPostsByPostStatus = (posts: PostsTypes[]) => {
  let acceptPosts = [];
  let stopedReviewPosts = [];
  for (const item of posts) {
    switch (item.post_status) {
      case ACCEPT_REVIEW:
        acceptPosts.push(item);
        break;
      case STOP_REVIEW:
        stopedReviewPosts.push(item);
        break;
    }
  }
  return {
    acceptPosts,
    stopedReviewPosts,
  };
};

export const MyReviews: React.FC<Props> = props => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };
  const { acceptPosts, stopedReviewPosts } = splitPostsByPostStatus(
    props.posts
  );

  return (
    <>
      <Box mb={3}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          indicatorColor='primary'
          textColor='primary'
        >
          <StyledTab label='レビュー依頼中' disableRipple={true} />
          <StyledTab label='レビューをした投稿' disableRipple={true} />
          <StyledTab label='募集を停止した依頼' disableRipple={true} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {acceptPosts.length === 0 ? (
              <NonWorkingIllustration marginBottom={2}>
                <SolidLink href='/post/new' borderRadius={4}>
                  レビューを依頼する
                </SolidLink>
              </NonWorkingIllustration>
            ) : (
              acceptPosts.map((post: PostsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={post.posted_contents.title}
                    budget={post.posted_contents.budget}
                    postUrl={post.url}
                    iconPath={post.posted_contents.target_icon.icon_path}
                    name={post.user_profile.display_name}
                    date={post.date}
                    tagArray={post.posted_contents.tag_list}
                    userIcon={post.user_profile.icon_src}
                    postStatus={post.post_status}
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
                <SolidLink href='/' borderRadius={4}>
                  投稿を探しにいく！
                </SolidLink>
              </NonArticleIllustration>
            ) : (
              props.reviews.map((review: ReviewsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    key={uuidv4()}
                    title={review.posted_contents.title}
                    budget={review.posted_contents.budget}
                    postUrl={review.url}
                    iconPath={review.posted_contents.target_icon.icon_path}
                    name={review.posted_user_profile.display_name}
                    date={review.date}
                    tagArray={review.posted_contents.tag_list}
                    userIcon={review.posted_user_profile.icon_src}
                    postStatus={review.post_status}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {stopedReviewPosts.map((post: PostsTypes) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                <Post
                  title={post.posted_contents.title}
                  budget={post.posted_contents.budget}
                  postUrl={post.url}
                  iconPath={post.posted_contents.target_icon.icon_path}
                  name={post.user_profile.display_name}
                  date={post.date}
                  tagArray={post.posted_contents.tag_list}
                  userIcon={post.user_profile.icon_src}
                  postStatus={post.post_status}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
    </>
  );
};
