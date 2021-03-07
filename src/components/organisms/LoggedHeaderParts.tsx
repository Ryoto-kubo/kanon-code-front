import { SolidLink } from "@/components/atoms/SolidLink";
import { NotificationsButton } from "@/components/molecules/NotificationsButton";
import { SearchButton } from "@/components/molecules/SearchButton";
import { UserImageButton } from "@/components/molecules/UserImageButton";
import theme from "@/styles/theme";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { Auth } from "aws-amplify";
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
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
  // color: ${theme.palette.primary.main};
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
  const signOut = async () => {
    try {
      const result = await Auth.signOut();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
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
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
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
          <MenuItem onClick={handleClose}>
            <StyledListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="マイページ" />
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <StyledListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="ログアウト" />
          </MenuItem>
        </Menu>
      </StyledUseMr>
    </>
  );
};