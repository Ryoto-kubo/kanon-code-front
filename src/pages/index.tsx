import { TypoHeading2 } from '@/components/atoms/TypoHeading2';
// import { CustomLoader } from "@/components/common/loader";
import { FirstView } from '@/components/organisms/FirstView';
import { Post } from '@/components/organisms/Post';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { GetContentsTypes } from '@/types/global/';
import { getContents } from '@/utils/api/get-contents';
import { Box, Container, Grid } from '@material-ui/core/';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
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
  const frontPosts = props.data.frontPosts;
  const backPosts = props.data.backPosts;
  const otherPosts = props.data.otherPosts;

  return (
    <Layout
      title='Kanon Code | コードレビューを全てのエンジニアへ'
      currentUser={props.currentUser}
    >
      <Head>
        <title>Kanon Code | コードレビューを全てのエンジニアへ</title>
        <meta
          name='viewport'
          content='width=device-width,height=device-height'
          key='viewport'
        />
        <meta property='og:title' content='Kanon Code | テスト' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Kanon テスト' />
        <meta property='og:url' content='https://stg.kanon-code.com' />
        <meta property='og:site_name' content='Kanon Code' />
        <meta
          property='og:image'
          content='https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
        />
        <meta property='og:image:width' content={String(1280)} />
        <meta property='og:image:height' content={String(960)} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@kanon_code_com' />
        <meta name='twitter:url' content={'https://stg.kanon-code.com'} />
        <meta name='twitter:title' content={'Kanon Code'} />
        <meta name='twitter:description' content={'Kanon テスト'} />
        <meta
          name='twitter:image'
          content={
            'https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
          }
        />
      </Head>
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
