import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { SettingLayout } from '@/layouts/setting'
import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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
  margin-bottom: 40px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    // width: calc(100% - 150px);
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
    <SettingLayout title="Kanon Code | スキル設定" authUser={props.authUser}>
      <StyledSection>
        <Box>
          <StyledBoxCalcWidth>
            <div>
              <Box display="flex" justifyContent="space-between">
                <StyledTextFieldService
                  id="language"
                  type="text"
                  style={{ display: 'block' }}
                  // value={settingParams.skil}
                  placeholder="例：php"
                  label="プログラミング言語"
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
                  // value={settingParams.experience}
                  placeholder="Twitter name"
                  label="経験年数"
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
            <Box textAlign="center">
              <CustomSolidButton sizing="medium" onClick={update}>
                更新する
              </CustomSolidButton>
            </Box>
          </StyledBoxCalcWidth>
        </Box>
      </StyledSection>
    </SettingLayout>
  )
}

export default IndexPage
