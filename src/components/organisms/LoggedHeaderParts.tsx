import { SolidLink } from "@/components/atoms/SolidLink";
import { NotificationsButton } from "@/components/molecules/NotificationsButton";
import { SearchButton } from "@/components/molecules/SearchButton";
import { UserImageButton } from "@/components/molecules/UserImageButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  picture: string;
  func: React.MouseEventHandler;
  formFunc: React.FormEventHandler;
}

const StyledUseMr = styled.span`
  &:not(:last-child) {
    margin-right: 24px;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
`;

export const LoggedHeaderParts: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <StyledUseMr>
        <SearchButton disableRipple={true} func={props.func} />
      </StyledUseMr>
      <StyledUseMr>
        <NotificationsButton disableRipple={true} func={props.func} />
      </StyledUseMr>
      <Hidden xsDown>
        <StyledUseMr>
          <SolidLink href="/posts/new">レビューを依頼する</SolidLink>
        </StyledUseMr>
      </Hidden>
      <StyledUseMr>
        <UserImageButton
          picture={props.picture}
          disableRipple={true}
          func={handleMenu}
        />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={handleClose}>マイページ</StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>ログアウト</StyledMenuItem>
        </Menu>
      </StyledUseMr>
    </>
  );
};
