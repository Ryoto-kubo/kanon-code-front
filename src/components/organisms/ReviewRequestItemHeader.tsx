// import { SolidLinkSecondary } from "@/components/atoms/SolidLinkSecondary";
import { CustomIconButton } from '@/components/atoms/IconButton';
import { BookmarkButton } from '@/components/molecules/BookmarkButton';
import { RequestItemTitle } from '@/components/molecules/RequestItemTitle';
import { RequestItemUser } from '@/components/molecules/RequestItemUser';
import { IconDot } from '@/components/svg/materialIcons/IconDot';
import { ACCEPT_REVIEW, STOP_REVIEW } from '@/consts/const';
import { errorMessages } from '@/consts/error-messages';
import { useGetBookmark } from '@/hooks/useGetBookmark';
import theme from '@/styles/theme';
import { CamelContentTypes, UserProfileTypes } from '@/types/global/';
import { postBookmark } from '@/utils/api/post-bookmark';
import { postStatus } from '@/utils/api/post-post-status';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type Props = {
  contents: CamelContentTypes;
  profile: UserProfileTypes;
  createDate: string;
  isMe: boolean;
  myUserId: string;
  postId: string;
  postStatus: number;
};

const StyledBoxTitle = styled(Box)`
  margin-bottom: 8px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
  }
`;
const StyledBoxImgWrapper = styled(Box)`
  margin-right: 0px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  // border-bottom: 10px solid ${theme.palette.primary.main};
`;
const StyledBoxUserWrapper = styled(Box)`
  margin-bottom: 16px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
  }
`;
const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 0px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 8px;
  }
`;
const StyledBoxMenuWrapper = styled(Box)`
  text-align: right;
`;
const StyledBoxButtonWrapper = styled(Box)`
  margin-bottom: 24px;
  min-height: 30px;
`;
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;

const ReviewOrderItem = (
  postStatus: number,
  updatePostStatus: () => Promise<void>
) => {
  return (
    <MenuItem onClick={() => updatePostStatus()}>
      {postStatus === ACCEPT_REVIEW ? (
        <>
          <StyledListItemIcon>
            <BlockOutlinedIcon fontSize='small' />
          </StyledListItemIcon>
          <ListItemText secondary='レビュー依頼停止' />
        </>
      ) : (
        postStatus === STOP_REVIEW && (
          <>
            <StyledListItemIcon>
              <PlayCircleFilledWhiteOutlinedIcon fontSize='small' />
            </StyledListItemIcon>
            <ListItemText secondary='レビュー依頼再開' />
          </>
        )
      )}
    </MenuItem>
  );
};

export const ReviewRequestItemHeader: React.FC<Props> = props => {
  const router = useRouter();
  if (props.myUserId !== '') {
    var { hasBookmark, setHasBookmark } = useGetBookmark(props.postId);
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const iconSrc = props.contents.targetIcon.iconPath;
  const title = props.contents.title;
  const tagArray = props.contents.tagList;
  const name = props.profile.display_name;
  const userIcon = props.profile.icon_src;
  const open = Boolean(anchorEl);
  const nonPrefixPostId = props.postId.split('_')[1];

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const toPage = useCallback((path: string) => {
    router.push(path);
  }, []);

  const bookmark = useCallback(async () => {
    const params = {
      myUserId: props.myUserId,
      postId: props.postId,
    };
    const err = new Error();
    try {
      const result = await postBookmark(params);
      if (!result.data.status) throw err;
      setHasBookmark(!hasBookmark);
    } catch (error) {
      alert(errorMessages.BOOKMARK_ERROR);
    }
  }, [hasBookmark]);

  const updatePostStatus = async () => {
    const params = {
      postId: props.postId,
    };
    try {
      const result = await postStatus(params);
      console.log(result);
    } catch (error) {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  return (
    <>
      <StyledBoxTitleWrapper>
        <Box>
          {props.myUserId !== '' && (
            <StyledBoxMenuWrapper>
              {props.isMe ? (
                <StyledBoxButtonWrapper>
                  <CustomIconButton disableRipple={true} func={handleMenu}>
                    <IconDot fontSize='small' />
                  </CustomIconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => toPage(`/post/edit/${nonPrefixPostId}`)}
                    >
                      <StyledListItemIcon>
                        <EditOutlinedIcon fontSize='small' />
                      </StyledListItemIcon>
                      <ListItemText secondary='編集' />
                    </MenuItem>
                    {ReviewOrderItem(props.postStatus, updatePostStatus)}
                  </Menu>
                </StyledBoxButtonWrapper>
              ) : (
                <StyledBoxButtonWrapper>
                  <BookmarkButton
                    sizing={'small'}
                    variant={hasBookmark ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={() => bookmark()}
                  />
                </StyledBoxButtonWrapper>
              )}
            </StyledBoxMenuWrapper>
          )}
          <StyledBoxTitle>
            <StyledBoxImgWrapper>
              <img
                width={'70px'}
                height={'70px'}
                src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${iconSrc}`}
              />
            </StyledBoxImgWrapper>
            <Box>
              <RequestItemTitle title={title} tagArray={tagArray} />
            </Box>
          </StyledBoxTitle>
          <StyledBoxUserWrapper>
            <RequestItemUser
              name={name}
              date={props.createDate}
              userIcon={userIcon}
              width={'32px'}
              height={'32px'}
            />
          </StyledBoxUserWrapper>
        </Box>
      </StyledBoxTitleWrapper>
    </>
  );
};
