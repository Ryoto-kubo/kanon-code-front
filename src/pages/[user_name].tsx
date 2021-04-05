import { ProfileArea } from "@/components/organisms/ProfileArea";
import Layout from "@/layouts/standard";
import { mypageData } from "@/mock/mypage";
import { Box, Container } from "@material-ui/core/";
import React from "react";

type Props = {
  title: string;
  authUser: any;
};

const IndexPage: React.FC<Props> = (props) => {
  const userIcon = props.authUser.signInUserSession.idToken.payload.picture;
  const userName = location.pathname.substr(1);

  return (
    <Layout
      title={`Kanon Code | ${userName}のページ`}
      authUser={props.authUser}
    >
      <Container>
        <Box mt={4}>
          <ProfileArea
            picture={userIcon}
            position={mypageData.contents.position}
            githubName={mypageData.contents.github_name}
            twitterName={mypageData.contents.twitter_name}
            webSite={mypageData.contents.web_site}
            displayName={mypageData.contents.display_name}
          />
        </Box>
      </Container>
    </Layout>
  );
};
export default IndexPage;
