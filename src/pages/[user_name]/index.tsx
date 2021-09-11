// import { CommonHead } from '@/components/common/head';
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
  // if (props.isFetch) {
  //   console.log(props);

  //   return (
  //     <>
  //       <CommonHead
  //         title='Kanon Code | コードレビューを全てのエンジニアへ'
  //         description='Kanon Codeは全てのエンジニアにコードレビューの機会を提供します。'
  //         image={`${process.env.NEXT_PUBLIC_HOST}/logo.png`}
  //       />
  //     </>
  //   );
  // }
  const userProfile = props.data.user.profile;
  const displayName = userProfile.display_name;
  const userId = props.data.user.userId;
  const cognitoId = props.authUser ? props.authUser.username : null;
  const isMe = cognitoId === userId;

  return (
    <Layout
      title={`Kanon Code | ${displayName}`}
      currentUser={props.currentUser}
    >
      <Container>
        <Box mt={4} pb={7}>
          <Box mb={3}>
            <ProfileArea
              introduction={userProfile.introduction}
              picture={userProfile.icon_src}
              position={userProfile.position_type}
              githubName={userProfile.github_name}
              twitterName={userProfile.twitter_name}
              webSite={userProfile.web_site}
              displayName={userProfile.display_name}
              cognitoId={cognitoId}
              isMe={isMe}
            />
          </Box>
          <Box mb={3} component='section'>
            <SkilsArea skils={userProfile.skils} />
          </Box>
          <Box mb={3} component='section'>
            <Reviews
              user={props.authUser}
              posts={props.data.posts}
              reviews={props.data.reviews}
              isMe={isMe}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // const result = await getUsers();
  // const paths = result.data.map((el: { displayName: string }) => ({
  //   params: {
  //     user_name: el.displayName,
  //   },
  // }));
  return {
    paths: [],
    fallback: true,
  };
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
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
