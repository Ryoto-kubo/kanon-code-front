import { CommonHead } from '@/components/common/head';
import { CustomLoader } from '@/components/common/loader';
import { ProfileArea } from '@/components/organisms/ProfileArea';
import { Reviews } from '@/components/organisms/Reviews';
import { SkilsArea } from '@/components/organisms/SkilsArea';
import Layout from '@/layouts/standard';
import {
  PostsTypes,
  ReviewsTypes,
  UserProfileTypes,
  UserTypes,
} from '@/types/global';
import { getUserContents } from '@/utils/api/get-user-contents';
import { Container } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
// import { GetServerSidePropsContext } from "next";
import { GetStaticPropsContext } from 'next';
import React from 'react';

type Props = {
  authUser: any;
  currentUser: null | UserTypes;
  isFetch: boolean;
  data: {
    user: {
      profile: UserProfileTypes;
      userId: string;
    };
    profile: UserProfileTypes;
    posts: PostsTypes[];
    reviews: ReviewsTypes[];
  };
};

const IndexPage: React.FC<Props> = props => {
  const userProfile = props.data ? props.data.user.profile : undefined;
  const posts = props.data ? props.data.posts : [];
  const reviews = props.data ? props.data.reviews : [];
  const displayName = userProfile ? userProfile.display_name : '';
  const userId = props.data ? props.data.user.userId : undefined;
  const cognitoId = props.authUser
    ? props.authUser['cognito:username']
    : undefined;
  const isMe = cognitoId === userId;
  return props.isFetch ? (
    <>
      <CustomLoader />
      <CommonHead
        title={`Kanon Code | ${displayName}`}
        description={`${displayName}のマイページ`}
        image={`${userProfile?.icon_src}`}
      />
    </>
  ) : (
    <Layout
      title={`Kanon Code | ${displayName}`}
      currentUser={props.currentUser}
    >
      <CommonHead
        title={`Kanon Code | ${displayName}`}
        description={`${displayName}のマイページ`}
        image={`${userProfile?.icon_src}`}
      />
      <Container>
        <Box mt={4} pb={7}>
          <Box mb={3}>
            <ProfileArea
              introduction={userProfile ? userProfile.introduction : ''}
              picture={userProfile ? userProfile.icon_src : ''}
              position={userProfile ? userProfile.position_type : 0}
              githubName={userProfile ? userProfile.github_name : ''}
              twitterName={userProfile ? userProfile.twitter_name : ''}
              webSite={userProfile ? userProfile.web_site : ''}
              displayName={userProfile ? userProfile.display_name : ''}
              cognitoId={cognitoId}
              isMe={isMe}
            />
          </Box>
          <Box mb={3} component='section'>
            <SkilsArea
              skils={
                userProfile
                  ? userProfile.skils
                  : [
                      {
                        language: '',
                        years_experiences: 0,
                      },
                    ]
              }
            />
          </Box>
          <Box mb={3} component='section'>
            <Reviews
              user={props.authUser}
              posts={posts}
              reviews={reviews}
              isMe={isMe}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const userName = context.params?.user_name as string;
  const result = await getUserContents({ userName: userName });
  return {
    props: {
      data: result.data,
    },
    revalidate: 30,
  };
};

export default IndexPage;
