import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { UserImgIcon } from '@/components/atoms/UserImgIcon'
import { HelpButton } from '@/components/molecules/HelpButton'
import { SettingLayout } from '@/layouts/setting'
import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
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

const positions = [
  {
    value: 0,
    label: '未選択',
  },
  {
    value: 1,
    label: 'フルスタックエンジニア',
  },
  {
    value: 2,
    label: 'フロントエンドエンジニア',
  },
  {
    value: 3,
    label: 'サーバーサイドエンジニア',
  },
  {
    value: 4,
    label: 'インフラエンジニア',
  },
]
const useStyles = makeStyles(() => ({
  size: {
    width: '110px',
    height: '110px',
  },
}))
const StyledBoxFlex = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`
const StyledSection = styled.section`
  margin-top: 24px;
`
const StyledInputLabel = styled(InputLabel)`
  ${(props) => props.theme.breakpoints.down('sm')} {
    margin-bottom: 16px;
  }
  display: flex;
  justify-content: center;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`
const StyledBoxHover = styled(Box)`
  transition: all 0.2s;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`
const StyledBoxCalcWidth = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: calc(100% - 150px);
    margin-bottom: 40px;
  }
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
  const [position, setPosition] = useState(0)
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
  const changePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(event.target.value))
  }
  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('update')
  }
  return (
    <SettingLayout
      title="Kanon Code | プロフィール設定"
      authUser={props.authUser}
    >
      <StyledSection>
        <StyledBoxFlex>
          <StyledInputLabel htmlFor="avatar">
            <div>
              <TextField
                id="avatar"
                name="avatar"
                type="file"
                style={{ display: 'none' }}
              />
              <Box>
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
              </Box>
            </div>
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
              <StyledTextField
                id="position"
                select
                value={position}
                label="ポジション"
                fullWidth={true}
                variant="outlined"
                onChange={changePosition}
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  defaultValue: 0,
                }}
              >
                {positions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>
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
                    コードレビューを行った際に設定できる価格の基準です。
                    <br />
                    500円に設定し、レビューを600文字かくと最大設定価格
                    <br />
                    は3,000円になります。
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
            <Box textAlign="center">
              <CustomSolidButton sizing="medium" onClick={update}>
                更新する
              </CustomSolidButton>
            </Box>
          </StyledBoxCalcWidth>
        </StyledBoxFlex>
      </StyledSection>
    </SettingLayout>
  )
}

export default IndexPage
