// import { SolidLinkSecondary } from "@/components/atoms/SolidLinkSecondary";
import { CustomIconButton } from '@/components/atoms/IconButton'
import { BookmarkButton } from '@/components/molecules/BookmarkButton'
import { RequestItemTitle } from '@/components/molecules/RequestItemTitle'
import { RequestItemUser } from '@/components/molecules/RequestItemUser'
import { IconDot } from '@/components/svg/materialIcons/IconDot'
import theme from '@/styles/theme'
import { ContentTypes, UserProfileTypes } from '@/types/global/'
import Box from '@material-ui/core/Box'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  contents: ContentTypes
  profile: UserProfileTypes
  createDate: string
  isMe: boolean
}

const StyledBoxTitle = styled(Box)`
  margin-bottom: 8px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
    // display: flex;
    // align-items: center;
  }
`
const StyledBoxImgWrapper = styled(Box)`
  margin-right: 0px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  // border-bottom: 10px solid ${theme.palette.primary.main};
`
const StyledBoxUserWrapper = styled(Box)`
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
  }
`
const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 0px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 8px;
  }
`
const StyledBoxMenuWrapper = styled(Box)`
  text-align: right;
`
const StyledBoxButtonWrapper = styled(Box)`
  margin-bottom: 24px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 24px;
  }
`
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`

export const ReviewRequestItemHeader: React.FC<Props> = (props) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const iconSrc = props.contents.target_icon.icon_path
  const title = props.contents.title
  const tagArray = props.contents.tag_list
  const name = props.profile.display_name
  const userIcon = props.profile.icon_src
  const open = Boolean(anchorEl)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const toPage = (path: string) => {
    router.push(path)
  }
  const bookmark = () => {
    console.log('bookmark')
  }

  return (
    <>
      <StyledBoxTitleWrapper>
        <Box>
          <StyledBoxMenuWrapper>
            {props.isMe ? (
              <StyledBoxButtonWrapper>
                <CustomIconButton disableRipple={true} func={handleMenu}>
                  <IconDot fontSize="small" />
                </CustomIconButton>
                <Menu
                  id="menu-appbar"
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
                  <MenuItem onClick={() => toPage(`/`)}>
                    <StyledListItemIcon>
                      <EditOutlinedIcon fontSize="small" />
                    </StyledListItemIcon>
                    <ListItemText secondary="編集" />
                  </MenuItem>
                </Menu>
              </StyledBoxButtonWrapper>
            ) : (
              <StyledBoxButtonWrapper>
                <BookmarkButton
                  sizing={'small'}
                  variant={'outlined'}
                  color={'primary'}
                  onClick={() => bookmark()}
                />
              </StyledBoxButtonWrapper>
            )}
          </StyledBoxMenuWrapper>
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
  )
}
