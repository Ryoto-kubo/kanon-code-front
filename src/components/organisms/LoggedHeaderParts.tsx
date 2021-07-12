import { SolidLink } from "@/components/atoms/SolidLink";
import { CustomLoader } from "@/components/common/loader";
import { NoticeReviewItem } from '@/components/molecules/NoticeReviewItem';
import { NotificationsButton } from "@/components/molecules/NotificationsButton";
import { SearchLink } from "@/components/molecules/SearchLink";
import { UserImageButton } from "@/components/molecules/UserImageButton";
import { getNotice } from '@/utils/api/get-notice';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import { Auth } from "aws-amplify";
// import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from 'nookies';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

interface Props {
  picture: string;
  displayName: string;
  func: React.MouseEventHandler;
  formFunc: React.FormEventHandler;
}

const StyledUseMr = styled.span`
  display: inherit;
  &:not(:last-child) {
    margin-right: 24px;
  }
`;
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;
const StyledBoxNoticeWrapper = styled(Box)`
  position: relative;
  width: 24px;
`;
const StyledMenu = styled(Menu)`
  width: 320px;
`;

export const LoggedHeaderParts: React.FC<Props> = (props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorNoticeEl, setAnchorNoticeEl] = useState<null | HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [noteices, setNotices] = useState<any>(null)
  useEffect(() => {
    (async () => {
      try {
        const response = await getNotice()
        console.log(response, 'response');
        setNotices(response.data.Items)
        setIsLoading(true)
      } catch (error) {
        setIsLoading(true)
      }
    })()
  },[])
  const open = Boolean(anchorEl);
  const noticeOpen = Boolean(anchorNoticeEl)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotice = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNoticeEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNotice = () => {
    setAnchorNoticeEl(null);
  };

  const toPage = (path: string) => {
    router.push(path);
  };
  const signOut = async () => {
    try {
      destroyCookie(null, 'idToken')
      await Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledUseMr>
        <SearchLink />
      </StyledUseMr>
      <StyledUseMr>
        {isLoading ? (
          <>
            <NotificationsButton disableRipple={true} func={handleNotice} />
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorNoticeEl}
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
              open={noticeOpen}
              onClose={handleCloseNotice}
            >
              {noteices.map((el: any) => (
                el.type === "review" && (
                  <MenuItem key={uuidv4()}>
                    <NoticeReviewItem
                      title={el.title}
                      reviewerName={el.user_profile.display_name}
                      name={el.name}
                      iconSrc={el.user_profile.icon_src}
                      postId={el.partition_key}
                      isRead={
                        el.is_read
                      }
                      date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                      width={'35px'}
                      height={'35px'}
                    />
                  </MenuItem>
                )
              ))}
            </StyledMenu>
          </>
        ) : (
          <StyledBoxNoticeWrapper>
            <CustomLoader width={24} height={24} />
          </StyledBoxNoticeWrapper>
        )}
      </StyledUseMr>
      <Hidden xsDown>
        <StyledUseMr>
          <SolidLink href="/post/new" borderRadius={4}>
            レビューを依頼する
          </SolidLink>
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
          <MenuItem onClick={() => toPage(`/${props.displayName}`)}>
            <StyledListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="マイページ" />
          </MenuItem>
          <MenuItem onClick={() => toPage("/post/new")}>
            <StyledListItemIcon>
              <CodeOutlinedIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="レビュー依頼" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => toPage("/dashboard/reviews")}>
            <StyledListItemIcon>
              <SpeedOutlinedIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="ダッシュボード" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => toPage("/settings/profile")}>
            <StyledListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </StyledListItemIcon>
            <ListItemText secondary="設定" />
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
