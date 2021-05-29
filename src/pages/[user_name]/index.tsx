import { ProfileArea } from "@/components/organisms/ProfileArea";
// import { Reviews } from "@/components/organisms/Reviews";
import { SkilsArea } from "@/components/organisms/SkilsArea";
import Layout from "@/layouts/standard";
import { UserType } from "@/types/global";
import { getUserContents } from "@/utils/api/get-user-contents";
import { Container } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import React from "react";

type Props = {
  authUser: any;
  currentUser: null | UserType;
  data: any;
};

const IndexPage: React.FC<Props> = (props) => {
  console.log(props);
  const userProfile = props.data.user.Items[0].user_profile;
  const userId = props.data.user.Items[0].user_id;
  const cognitoId = `user_${props.authUser.username}`;
  const isMe = cognitoId === userId;

  return (
    <Layout
      title="Kanon Code | コードレビュを全てのエンジニアへ"
      currentUser={props.currentUser}
    >
      <Container>
        <Box mt={4}>
          <Box mb={3}>
            <ProfileArea
              picture={userProfile.icon_src}
              position={userProfile.position_type}
              githubName={userProfile.github_name}
              twitterName={userProfile.twitter_name}
              webSite={userProfile.web_site}
              displayName={userProfile.display_name}
              isMe={isMe}
            />
          </Box>
          <Box mb={3} component="section">
            <SkilsArea skils={[]} />
          </Box>
          {/* <Box mb={3} component="section">
          <Reviews user={props.authUser} mypageData={mypageData} isMe={isMe} />
        </Box> */}
        </Box>
      </Container>
    </Layout>
  );
};

// export const getStaticPaths = async () => {
//   // const result = await getUsers();
//   // const paths = result.data.map((el: { displayName: string }) => ({
//   //   params: {
//   //     user_name: el.displayName,
//   //   },
//   // }));
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

// export const getStaticProps = async (props: any) => {
//   const userName = props.params.user_name;
//   const result = await getUserContents({ userName: userName });
//   return {
//     props: {
//       data: result.data,
//     },
//     revalidate: 60,
//   };
// };

// export const getServerSideProps = async (context: any) => {
//   const userName = context.params.user_name;
//   const result = await getUserContents({ userName: userName });
//   return {
//     props: {
//       data: result.data,
//     },
//   };
// };
export const getInitialProps = async (context: any) => {
  const userName = context.params.user_name;
  console.log(context.params);

  const result = await getUserContents({ userName: userName });
  return {
    props: {
      data: result.data,
    },
  };
};

export default IndexPage;
