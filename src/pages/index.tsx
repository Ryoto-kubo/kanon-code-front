import { TypoHeading2 } from '@/components/atoms/TypoHeading2';
import { CommonHead } from '@/components/common/head';
// import { CustomLoader } from "@/components/common/loader";
import { FirstView } from '@/components/organisms/FirstView';
import { Post } from '@/components/organisms/Post';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { GetContentsTypes } from '@/types/global/';
import { getContents } from '@/utils/api/get-contents';
import { Box, Container, Grid } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  authUser: any;
  currentUser: UserTypes;
  isFetch: boolean;
  data: {
    Count: number;
    frontPosts: GetContentsTypes[];
    backPosts: GetContentsTypes[];
    otherPosts: GetContentsTypes[];
    ScannedCount: number;
  };
};

const StyledBoxWidthBorder = styled(Box)`
  border-left: 3px solid ${theme.palette.primary.main};
  padding-left: 8px;
`;

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return (
      <>
        <CommonHead title='Kanon Code | コードレビューを全てのエンジニアへ' />
      </>
    );
  }
  const frontPosts = props.data.frontPosts;
  const backPosts = props.data.backPosts;
  const otherPosts = props.data.otherPosts;

  return (
    <Layout
      title='Kanon Code | コードレビューを全てのエンジニアへ'
      currentUser={props.currentUser}
    >
      <Container>
        {!props.currentUser && <FirstView />}
        {frontPosts.length > 0 && (
          <Box component='section' mb={10}>
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color='initial'>Front-end</TypoHeading2>
            </StyledBoxWidthBorder>
            <Box mb={4}>
              <Grid spacing={3} container>
                {frontPosts.map(el => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                    <Post
                      title={el.contents.title}
                      postUrl={el.post_url}
                      iconPath={el.contents.target_icon.icon_path}
                      name={el.user_profile.display_name}
                      date={el.date}
                      tagArray={el.contents.tag_list}
                      userIcon={el.user_profile.icon_src}
                      postStatus={el.post_status}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {backPosts.length > 0 && (
          <Box component='section' mb={10}>
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color='initial'>Back-end</TypoHeading2>
            </StyledBoxWidthBorder>
            <Box mb={4}>
              <Grid spacing={3} container>
                {backPosts.map(el => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                    <Post
                      title={el.contents.title}
                      postUrl={el.post_url}
                      iconPath={el.contents.target_icon.icon_path}
                      name={el.user_profile.display_name}
                      date={el.date}
                      tagArray={el.contents.tag_list}
                      userIcon={el.user_profile.icon_src}
                      postStatus={el.post_status}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {otherPosts.length > 0 && (
          <Box component='section' mb={10}>
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color='initial'>Other</TypoHeading2>
            </StyledBoxWidthBorder>
            <Box mb={4}>
              <Grid spacing={3} container>
                {otherPosts.map(el => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                    <Post
                      title={el.contents.title}
                      postUrl={el.post_url}
                      iconPath={el.contents.target_icon.icon_path}
                      name={el.user_profile.display_name}
                      date={el.date}
                      tagArray={el.contents.tag_list}
                      userIcon={el.user_profile.icon_src}
                      postStatus={el.post_status}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
};
// サーバーサイドで実行される
export const getStaticProps = async () => {
  try {
    const response = await getContents();
    return {
      props: {
        data: response.data,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export default IndexPage;
