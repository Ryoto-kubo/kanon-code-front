import { SolidLink } from '@/components/atoms/SolidLink';
import { CustomLoader } from '@/components/common/loader';
import { NoticePaymentItem } from '@/components/molecules/NoticePaymentItem';
import { NoticeReviewItem } from '@/components/molecules/NoticeReviewItem';
import { NotificationsButton } from '@/components/molecules/NotificationsButton';
import { SearchLink } from '@/components/molecules/SearchLink';
import { UserImageButton } from '@/components/molecules/UserImageButton';
import { DropMenu } from '@/components/parts/dropMenu/';
import { getNotices } from '@/utils/api/get-notices';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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
const StyledDropMenu = styled(DropMenu)`
  max-height: 300px;
`;

export const LoggedHeaderParts: React.FC<Props> = props => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorNoticeEl, setAnchorNoticeEl] = useState<null | HTMLElement>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [notices, setNotices] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getNotices();
        setNotices(response.data);
        setIsLoading(true);
      } catch (error) {
        setIsLoading(true);
      }
    })();
  }, []);
  const open = Boolean(anchorEl);
  const noticeOpen = Boolean(anchorNoticeEl);
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
      destroyCookie(null, 'idToken');
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
            {notices.Items.length > 0 ? (
              <>
                <Badge badgeContent={notices.count} color='secondary'>
                  <NotificationsButton
                    disableRipple={true}
                    func={handleNotice}
                  />
                </Badge>
                <StyledDropMenu
                  anchorEl={anchorNoticeEl}
                  isOpen={noticeOpen}
                  onClose={handleCloseNotice}
                >
                  {notices.Items.map((el: any) =>
                    el.type === 'review' ? (
                      <MenuItem
                        key={uuidv4()}
                        className={el.is_read ? '' : 'non-read'}
                      >
                        <NoticeReviewItem
                          title={el.title}
                          reviewerName={el.profile.display_name}
                          name={el.my_display_name}
                          iconSrc={el.profile.icon_src}
                          partitionKey={el.partition_key}
                          sortKey={el.sort_key}
                          isRead={el.is_read}
                          date={el.date}
                          url={el.url}
                          width={'35px'}
                          height={'35px'}
                        />
                      </MenuItem>
                    ) : (
                      el.type === 'payment' && (
                        <MenuItem
                          key={uuidv4()}
                          className={el.is_read ? '' : 'non-read'}
                        >
                          <NoticePaymentItem
                            title={el.title}
                            paymentedName={el.profile.display_name}
                            iconSrc={el.profile.icon_src}
                            partitionKey={el.partition_key}
                            sortKey={el.sort_key}
                            isRead={el.is_read}
                            date={el.date}
                            width={'35px'}
                            height={'35px'}
                          />
                        </MenuItem>
                      )
                    )
                  )}
                </StyledDropMenu>
              </>
            ) : (
              <NotificationsButton disableRipple={true} func={handleNotice} />
            )}
          </>
        ) : (
          <StyledBoxNoticeWrapper>
            <CustomLoader width={24} height={24} />
          </StyledBoxNoticeWrapper>
        )}
      </StyledUseMr>
      <Hidden xsDown>
        <StyledUseMr>
          <SolidLink href='/post/new' borderRadius={4}>
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
        <DropMenu anchorEl={anchorEl} isOpen={open} onClose={handleClose}>
          <MenuItem onClick={() => toPage(`/${props.displayName}`)}>
            <StyledListItemIcon>
              <PersonOutlineOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='マイページ' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/post/new')}>
            <StyledListItemIcon>
              <CodeOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='レビュー依頼' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/dashboard/reviews')}>
            <StyledListItemIcon>
              <SpeedOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='ダッシュボード' />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => toPage('/dashboard/drafts')}>
            <StyledListItemIcon>
              <NoteOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='下書き一覧' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/dashboard/bookmarks')}>
            <StyledListItemIcon>
              <BookmarksOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='ブックマーク' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/dashboard/payments_history')}>
            <StyledListItemIcon>
              <InboxOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='購入したレビュー' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/dashboard/sales')}>
            <StyledListItemIcon>
              <MonetizationOnOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='売り上げ' />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => toPage('/settings/profile')}>
            <StyledListItemIcon>
              <SettingsOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='設定' />
          </MenuItem>
          <MenuItem onClick={() => toPage('/contact-us')}>
            <StyledListItemIcon>
              <ContactMailOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='各種お問い合わせ' />
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <StyledListItemIcon>
              <ExitToAppIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='ログアウト' />
          </MenuItem>
        </DropMenu>
      </StyledUseMr>
    </>
  );
};
