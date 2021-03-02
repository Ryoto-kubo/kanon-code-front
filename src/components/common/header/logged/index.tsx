import { KanonCodeLogo } from "@/components/atoms/Logo";
import { SolidLink } from "@/components/atoms/SolidLink";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
// import { ICognitoUserData } from "@aws-amplify/auth";
// import {CognitoUserSession} from 'amazon-cognito-identity-js'
import { Box } from "@material-ui/core/";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  authUser: any;
}

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
`;
const StyledUseMr = styled.span`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;
const StyledImg = styled.img`
  border-radius: 50px;
  width: 40px;
  width: 40px;
`;

export const TheLoggedHeader: React.FC<Props> = (props) => {
  console.log(props.authUser);
  const userInfo = props.authUser.signInUserSession.idToken.payload;

  return (
    <CustomStickyAppBar>
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <a>
            <KanonCodeLogo />
          </a>
        </Link>
        <Box display="flex" alignItems="center">
          <StyledUseMr>
            <SolidLink href="/posts/new">レビューを依頼する</SolidLink>
          </StyledUseMr>
          <StyledUseMr>
            <StyledImg src={userInfo.picture} alt="ユーザーアイコン" />
          </StyledUseMr>
        </Box>
      </StyledBox>
    </CustomStickyAppBar>
  );
};
