import { SolidLink } from "@/components/atoms/SolidLink";
import { UserImgIcon } from "@/components/atoms/UserImgIcon";
import { UserLink } from "@/components/organisms/ UserLinks";
import Layout from "@/layouts/standard";
import { mypageData } from "@/mock/mypage";
import { Box, Container } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
};

const useStyles = makeStyles(() => ({
  size: {
    width: "60px",
    height: "60px",
  },
}));

const StyledBoxProfileArea = styled(Box)`
  display: flex;
`;
const StyledBoxUserProfile = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledBoxUserName = styled(Box)`
  font-size: 18px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 20px;
  }
`;

const IndexPage: React.FC<Props> = (props) => {
  const userIcon = props.authUser.signInUserSession.idToken.payload.picture;
  const classes = useStyles();

  return (
    <Layout title="Kanon Code | マイページ" authUser={props.authUser}>
      <Container>
        <Box mt={4}>
          <StyledBoxProfileArea component="section">
            <StyledBoxUserProfile>
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <UserImgIcon picture={userIcon} className={classes.size} />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center">
                    <Box mr={1}>
                      <span>{mypageData.contents.position}</span>
                    </Box>
                    <UserLink
                      githubName={mypageData.contents.github_name}
                      twitterName={mypageData.contents.twitter_name}
                      webSite={mypageData.contents.web_site}
                    />
                  </Box>
                  <StyledBoxUserName>
                    {mypageData.contents.display_name}
                  </StyledBoxUserName>
                </Box>
              </Box>
              <SolidLink href="/settings/profile" borderRadius={50}>
                プロフィールを編集する
              </SolidLink>
            </StyledBoxUserProfile>
          </StyledBoxProfileArea>
        </Box>
      </Container>
    </Layout>
  );
};
export default IndexPage;
