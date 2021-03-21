import { UserImgIcon } from '@/components/atoms/UserImgIcon'
import { HelpButton } from '@/components/molecules/HelpButton'
import { SettingLayout } from '@/layouts/setting'
import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CachedRounded from '@material-ui/icons/CachedRounded'
// import { CognitoUser } from '@aws-amplify/auth'
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  authUser: any
}

const useStyles = makeStyles(() => ({
  size: {
    width: '110px',
    height: '110px',
  },
}))
const StyledSection = styled.section`
  margin-top: 24px;
`
const StyledInputLabel = styled(InputLabel)`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`
const StyledBox = styled(Box)`
  margin-bottom: 24px;
`
const StyledBoxHover = styled(Box)`
  transition: all 0.2s;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`
const StyledBoxCalcWidth = styled(Box)`
  width: calc(100% - 150px);
`
const StyledSpan = styled.span`
  font-size: 13px;
  font-weight: bold;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`
const StyledTextField = styled(TextField)`
  margin-bottom: 32px;
`
const StyledTextFieldService = styled(TextField)`
  margin-bottom: 32px;
  width: 47%;
`

const IndexPage: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [settingParams, setSettingParams] = useState({
    name: '',
    introduction: '',
    amount: '',
    githubName: '',
    twitterName: '',
    webSite: '',
  })
  const userInfo =
    props.authUser !== null
      ? props.authUser.signInUserSession.idToken.payload
      : 'null'
  const open = Boolean(anchorEl)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ name: event.target.value })
  // }
  // const changeIntroduction = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ introduction: event.target.value })
  // }
  return (
    <SettingLayout
      title="Kanon Code | プロフィール設定"
      authUser={props.authUser}
    >
      <StyledSection>
        <Box display="flex" justifyContent="space-between">
          <StyledInputLabel htmlFor="avatar">
            <TextField
              id="avatar"
              name="avatar"
              type="file"
              style={{ display: 'none' }}
            />
            <Box mb={1}>
              <UserImgIcon
                className={classes.size}
                picture={userInfo.picture}
              />
            </Box>
            <StyledBoxHover display="flex" alignItems="center">
              <Box mr={1}>
                <CachedRounded />
              </Box>
              <StyledSpan>アイコン変更</StyledSpan>
            </StyledBoxHover>
          </StyledInputLabel>
          <StyledBoxCalcWidth>
            <div>
              <StyledTextField
                id="name"
                type="text"
                value={settingParams.name}
                label="名前"
                fullWidth={true}
                placeholder="名前"
                variant="outlined"
                onChange={(e) => {
                  setSettingParams({ ...settingParams, name: e.target.value })
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <StyledTextField
                id="introduction"
                type="text"
                value={settingParams.introduction}
                label="紹介文"
                fullWidth={true}
                placeholder="紹介文を入力してください"
                variant="outlined"
                onChange={(e) => {
                  setSettingParams({
                    ...settingParams,
                    introduction: e.target.value,
                  })
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={6}
              />
            </div>
            <div>
              <Box mb={1.5} display="flex" alignItems="center">
                <Box component="span" mr={0.5}>
                  100文字あたりの設定金額とは
                </Box>
                <HelpButton func={handleMenu} />
                <Popover
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Box p={2}>
                    コードレビューを行った際の金額の目安になります。
                  </Box>
                </Popover>
              </Box>
              <StyledTextField
                id="amount"
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                value={settingParams.amount}
                label="100文字あたりの設定金額（円）"
                fullWidth={true}
                placeholder="100"
                variant="outlined"
                onChange={(e) => {
                  setSettingParams({
                    ...settingParams,
                    amount: e.target.value,
                  })
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <Box display="flex" justifyContent="space-between">
                <StyledTextFieldService
                  id="githubName"
                  type="text"
                  style={{ display: 'block' }}
                  value={settingParams.githubName}
                  placeholder="Github name"
                  label="Githubユーザー名"
                  fullWidth={true}
                  variant="outlined"
                  onChange={(e) => {
                    setSettingParams({
                      ...settingParams,
                      githubName: e.target.value,
                    })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <StyledTextFieldService
                  id="twitterName"
                  type="text"
                  style={{ display: 'block' }}
                  value={settingParams.twitterName}
                  placeholder="Twitter name"
                  label="Twitterユーザー名"
                  fullWidth={true}
                  variant="outlined"
                  onChange={(e) => {
                    setSettingParams({
                      ...settingParams,
                      twitterName: e.target.value,
                    })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </div>
            <div>
              <StyledTextField
                id="webSite"
                type="text"
                value={settingParams.webSite}
                placeholder="https://example.com"
                label="webサイト"
                fullWidth={true}
                variant="outlined"
                onChange={(e) => {
                  setSettingParams({
                    ...settingParams,
                    webSite: e.target.value,
                  })
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </StyledBoxCalcWidth>
        </Box>
      </StyledSection>
    </SettingLayout>
  )
}

export default IndexPage
