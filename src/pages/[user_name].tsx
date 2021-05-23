import { ProfileArea } from "@/components/organisms/ProfileArea";
import { Reviews } from "@/components/organisms/Reviews";
import { SkilsArea } from "@/components/organisms/SkilsArea";
import { mypageData } from "@/mock/mypage";
import { Box, Container } from "@material-ui/core/";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {
  title: string;
  authUser: any;
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    layout: "Layout",
    title: context.resolvedUrl,
  },
});

const IndexPage: React.FC<Props> = (props) => {
  const userIcon = props.authUser.signInUserSession.idToken.payload.picture;
  const userId = props.authUser.username;
  const cognitoId = mypageData.cognitoId;
  const isMe = cognitoId === userId;

  return (
    <Container>
      <Box mt={4}>
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
      </Box>
    </Container>
  );
};
export default IndexPage;
