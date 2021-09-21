import { TypoHeading2 } from '@/components/atoms/TypoHeading2';
import { CommonHead } from '@/components/common/head';
import { CustomLoader } from '@/components/common/loader';
import { FirstView } from '@/components/organisms/FirstView';
import { Post } from '@/components/organisms/Post';
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { GetContentsTypes } from '@/types/global/';
import { getContents } from '@/utils/api/get-contents';
import { Box, Container, Grid } from '@material-ui/core/';
import Link from 'next/link';
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
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const description =
  'Kanon Codeは全てのエンジニアにコードレビューの機会を提供するサービスです。Python、JavaScript、Ruby、PHP、Goなど様々な言語に対応しています。「誰かにレビューしてもらいたい」そう思ったら、Kanon Codeでコードレビューを依頼してみてください。';
const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return (
      <>
        <CustomLoader />
        <CommonHead
          title='Kanon Code | コードレビューを全てのエンジニアへ'
          description={description}
          url={process.env.NEXT_PUBLIC_HOST}
          image={`${process.env.NEXT_PUBLIC_BUCKET_URL}images/logo.png`}
        />
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
      <CommonHead
        title='Kanon Code | コードレビューを全てのエンジニアへ'
        description={description}
        url={process.env.NEXT_PUBLIC_HOST}
        image={`${process.env.NEXT_PUBLIC_BUCKET_URL}images/logo.png`}
      />
      <Container>
        {!props.currentUser && <FirstView />}
        {props.currentUser && (
          <Box mb={3} display='flex' justifyContent='flex-end'>
            <Link href='/changelog'>
              <StyledAnchor>
                <Box component='p' display='flex' alignItems='center'>
                  Kanon CodeのUpdate情報 【Update情報ページ追加】 - vol-04
                  <IconArrowNext fontSize='small' color='primary' />
                </Box>
              </StyledAnchor>
            </Link>
          </Box>
        )}
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
                      budget={el.contents.budget}
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
                      budget={el.contents.budget}
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
                      budget={el.contents.budget}
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
