// import { ProfileArea } from "@/components/organisms/ProfileArea";
// import { Reviews } from "@/components/organisms/Reviews";
// import { SkilsArea } from "@/components/organisms/SkilsArea";
import Layout from "@/layouts/standard";
import { UserType } from "@/types/global";
import { getUserContents } from "@/utils/api/get-user-contents";
import { getUsers } from "@/utils/api/get-users";
import { Container } from "@material-ui/core/";
import React from "react";

type Props = {
  title: string;
  currentUser: null | UserType;
};

const IndexPage: React.FC<Props> = (props) => {
  console.log(props);
  // const userIcon = props.authUser.signInUserSession.idToken.payload.picture;
  // const userId = props.authUser.username;
  // const cognitoId = mypageData.cognitoId;
  // const isMe = cognitoId === userId;

  return (
    <Layout
      title="Kanon Code | コードレビュを全てのエンジニアへ"
      currentUser={props.currentUser}
    >
      <Container>
        hoge
        {/* <Box mt={4}>
        <Box mb={3}>
          <ProfileArea
            picture={userIcon}
            position={mypageData.contents.position}
            githubName={mypageData.contents.github_name}
            twitterName={mypageData.contents.twitter_name}
            webSite={mypageData.contents.web_site}
            displayName={mypageData.contents.display_name}
            isMe={isMe}
          />
        </Box>
        <Box mb={3} component="section">
          <SkilsArea skils={mypageData.contents.skils} />
        </Box>
        <Box mb={3} component="section">
          <Reviews user={props.authUser} mypageData={mypageData} isMe={isMe} />
        </Box>
      </Box> */}
      </Container>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const result = await getUsers();
  const paths = result.data.map((el: { displayName: string }) => ({
    params: {
      user_name: el.displayName,
    },
  }));
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (props: any) => {
  const userName = props.params.user_name;
  const result = await getUserContents({ userName: userName });
  return {
    props: {
      data: result.data,
    },
  };
};

export default IndexPage;
