import { KanonCodeLogo } from "@/components/atoms/Logo";
import { SolidLink } from "@/components/atoms/SolidLink";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { Box, Input } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import { Notifications, Search } from "@material-ui/icons";
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
    margin-right: 24px;
  }
`;
const StyledImg = styled.img`
  border-radius: 50px;
  width: 40px;
  width: 40px;
`;
const StyledIconButton = styled(IconButton)`
  padding: 0;
  &:hover {
    background: none;
  }
`;
const StyledInput = styled(Input)`
  font-size: 14px;
`;

export const TheLoggedHeader: React.FC<Props> = (props) => {
  console.log(props.authUser);
  const userInfo = props.authUser.signInUserSession.idToken.payload;
  const func = (e: React.FormEvent) => {
    console.log("search");
    e.preventDefault();
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
          <StyledUseMr>
            <form onSubmit={func}>
              <StyledInput
                placeholder="キーワード検索"
                inputProps={{ "aria-label": "description" }}
                endAdornment={
                  <StyledIconButton disableRipple={true} onClick={func}>
                    <Search />
                  </StyledIconButton>
                }
              />
            </form>
          </StyledUseMr>
          <StyledUseMr>
            <StyledIconButton disableRipple={true}>
              <Notifications />
            </StyledIconButton>
          </StyledUseMr>
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
