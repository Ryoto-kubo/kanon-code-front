import { LinkWrapper } from "@/components/atoms/Link";
import { KanonCodeLogo } from "@/components/atoms/Logo";
import { StandardAppBar } from "@/components/atoms/StandardAppBar";
import { LoggedHeaderParts } from "@/components/organisms/LoggedHeaderParts";
import { UserTypes } from "@/types/global";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

type Props = {
  currentUser: null | UserTypes;
};

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
  const user = props.currentUser!;
  const displayName = user.display_name;
  const iconSrc = user.user_profile.icon_src;
  const formFunc = (e: React.FormEvent) => {
    console.log("enterを押した検索");
    e.preventDefault();
  };
  const func = () => {
    console.log("iconを押した検索");
  };

  return (
    <StandardAppBar>
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
            picture={iconSrc}
            displayName={displayName}
            func={func}
            formFunc={formFunc}
          />
        </Box>
      </StyledBox>
    </StandardAppBar>
  );
};
