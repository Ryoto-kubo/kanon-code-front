import { KanonCodeLogo } from "@/components/atoms/Logo";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { LoggedHeaderParts } from "@/components/organisms/LoggedHeaderParts";
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

export const TheLoggedHeader: React.FC<Props> = (props) => {
  console.log(props.authUser);
  const userInfo = props.authUser.signInUserSession.idToken.payload;
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
        <Link href="/">
          <a>
            <KanonCodeLogo />
          </a>
        </Link>
        <Box display="flex" alignItems="center">
          <LoggedHeaderParts
            picture={userInfo.picture}
            func={func}
            formFunc={formFunc}
          />
        </Box>
      </StyledBox>
    </CustomStickyAppBar>
  );
};
