import { SolidLink } from '@/components/atoms/SolidLink';
import { Post } from '@/components/organisms/Post';
import { NonArticleIllustration } from '@/components/parts/illustrations/non-article';
import { NonPaymentIllustration } from '@/components/parts/illustrations/non-payment';
import { NonWorkingIllustration } from '@/components/parts/illustrations/non-working';
import { PostContentsTypes } from '@/types/global/index';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  user: any;
  posts: PostContentsTypes[];
  isMe: boolean;
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
const makePropertyForPostUrl = (posts: PostContentsTypes[]) => {
  return posts.map((el: PostContentsTypes) => {
    const postId = el.sort_key.split('_').pop();
    const displayName = el.user_profile.display_name;
    el.postUrl = `${displayName}/post/${postId}`;
    return el;
  });
};
const splitPostsByPostStatus = (posts: PostContentsTypes[]) => {
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

export const Reviews: React.FC<Props> = props => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };
  const items = makePropertyForPostUrl(props.posts);
  const { acceptPosts, reviewedPosts, paymentedPosts } = splitPostsByPostStatus(
    items
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
          {props.isMe && (
            <StyledTab label='開封したレビュー' disableRipple={true} />
          )}
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
              acceptPosts.map((el: PostContentsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.contents.title}
                    postUrl={el.postUrl}
                    iconPath={el.contents.targetIcon.iconPath}
                    name={el.user_profile.display_name}
                    date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                    tagArray={el.contents.tagList}
                    userIcon={el.user_profile.icon_src}
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
            {reviewedPosts.length === 0 ? (
              <NonArticleIllustration marginBottom={2}>
                <SolidLink href='/' borderRadius={4}>
                  投稿を探しにいく！
                </SolidLink>
              </NonArticleIllustration>
            ) : (
              reviewedPosts.map((el: PostContentsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.contents.title}
                    postUrl={el.postUrl}
                    iconPath={el.contents.targetIcon.iconPath}
                    name={el.user_profile.display_name}
                    date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                    tagArray={el.contents.tagList}
                    userIcon={el.user_profile.icon_src}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </TabPanel>
      {props.isMe && (
        <TabPanel value={value} index={2}>
          <Box mb={4}>
            <Grid spacing={3} container>
              {paymentedPosts.length === 0 ? (
                <NonPaymentIllustration marginBottom={2}>
                  {/* <SolidLink href="/" borderRadius={4}>
                    投稿を探しにいく！
                  </SolidLink> */}
                </NonPaymentIllustration>
              ) : (
                paymentedPosts.map((el: PostContentsTypes) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                    <Post
                      title={el.contents.title}
                      postUrl={el.postUrl}
                      iconPath={el.contents.targetIcon.iconPath}
                      name={el.user_profile.display_name}
                      date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                      tagArray={el.contents.tagList}
                      userIcon={el.user_profile.icon_src}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </TabPanel>
      )}
    </>
  );
};
