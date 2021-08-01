import { SolidLink } from '@/components/atoms/SolidLink';
import { Post } from '@/components/organisms/Post';
import { NonArticleIllustration } from '@/components/parts/illustrations/non-article';
import { NonWorkingIllustration } from '@/components/parts/illustrations/non-working';
import { PostsTypes, ReviewsTypes } from '@/types/global';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  user: any;
  posts: PostsTypes[];
  reviews: ReviewsTypes[];
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

export const Reviews: React.FC<Props> = props => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

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
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box mb={4}>
          <Grid spacing={3} container>
            {props.posts.length === 0 ? (
              <NonWorkingIllustration marginBottom={2}>
                <SolidLink href='/post/new' borderRadius={4}>
                  レビューを依頼する
                </SolidLink>
              </NonWorkingIllustration>
            ) : (
              props.posts.map((el: PostsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.posted_contents.title}
                    postUrl={el.url}
                    iconPath={el.posted_contents.target_icon.icon_path}
                    name={el.user_profile.display_name}
                    date={el.date}
                    tagArray={el.posted_contents.tag_list}
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
            {props.reviews.length === 0 ? (
              <NonArticleIllustration marginBottom={2}>
                <SolidLink href='/' borderRadius={4}>
                  投稿を探しにいく！
                </SolidLink>
              </NonArticleIllustration>
            ) : (
              props.reviews.map((el: ReviewsTypes) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.posted_contents.title}
                    postUrl={el.url}
                    iconPath={el.posted_contents.target_icon.icon_path}
                    name={el.posted_user_profile.display_name}
                    date={el.date}
                    tagArray={el.posted_contents.tag_list}
                    userIcon={el.posted_user_profile.icon_src}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </TabPanel>
    </>
  );
};
