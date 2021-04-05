import { LinkWrapper } from "@/components/atoms/Link";
import { KanonCodeLogo } from "@/components/atoms/Logo";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { LoggedHeaderParts } from "@/components/organisms/LoggedHeaderParts";
import { mypageData } from "@/mock/mypage";
import { Box } from "@material-ui/core/";
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
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0 24px;
  }
`;

export const TheLoggedHeader: React.FC<Props> = (props) => {
  const userInfo = props.authUser.signInUserSession.idToken.payload;
  const displayName = mypageData.contents.display_name;
  const formFunc = (e: React.FormEvent) => {
    console.log("enterを押した検索");
    e.preventDefault();
  };
  const func = () => {
    console.log("iconを押した検索");
  };

  return (
    <CustomStickyAppBar>
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <LinkWrapper href="/">
          <KanonCodeLogo />
        </LinkWrapper>
        <Box display="flex" alignItems="center">
          <LoggedHeaderParts
            picture={userInfo.picture}
            displayName={displayName}
            func={func}
            formFunc={formFunc}
          />
        </Box>
      </StyledBox>
    </CustomStickyAppBar>
  );
};
