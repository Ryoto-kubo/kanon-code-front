import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { ErrorView } from '@/components/common/error';
import { CustomLoader } from '@/components/common/loader';
import { Post } from '@/components/organisms/Post';
import { useMyBookmarks } from '@/hooks/useMyBookmarks';
import { LayoutDashboard } from '@/layouts/dashboard';
import { PostsTypes, UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
  isFetch: boolean;
};

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return <></>;
  }
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const { data, isValidating } = useMyBookmarks();
  const status = data?.data.status;
  if (status === false) {
    return (
      <LayoutDashboard
        title='Kanon Code | ダッシュボード:ブックマーク'
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    );
  }
  const posts = data?.data.posts;
  return (
    <LayoutDashboard
      title='Kanon Code | ダッシュボード:ブックマーク'
      currentUser={props.currentUser}
    >
      <Box width={'100%'} position='relative' minHeight='300px' pb={10}>
        <CustomHeading2 fontSize={24} marginBottom={1}>
          Bookmarks
        </CustomHeading2>
        {isValidating ? (
          <CustomLoader width={30} height={30} />
        ) : posts.length <= 0 ? (
          <p>まだブックマークをしていません。</p>
        ) : (
          <Grid spacing={3} container>
            {posts.map((item: PostsTypes) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                <Post
                  title={item.posted_contents.title}
                  budget={item.posted_contents.budget}
                  postUrl={item.url}
                  iconPath={item.posted_contents.target_icon.icon_path}
                  name={item.user_profile.display_name}
                  date={item.date}
                  tagArray={item.posted_contents.tag_list}
                  userIcon={item.user_profile.icon_src}
                  postStatus={item.post_status}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </LayoutDashboard>
  );
};

export default IndexPage;
