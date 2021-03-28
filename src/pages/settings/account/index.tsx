import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { SettingLayout } from '@/layouts/setting'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  authUser: any
}

const StyledBoxFlex = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const StyledBoxParagraf = styled(Box)`
  margin-bottom: 8px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
  }
`

const IndexPage: React.FC<Props> = (props) => {
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  }
  const googleEmail = props.authUser.signInUserSession.idToken.payload.email

  return (
    <SettingLayout
      title="Kanon Code | アカウント設定"
      authUser={props.authUser}
    >
      <Box mb={2}>
        <Box mb={2}>
          <Box mb={1}>
            <Box mb={2}>
              <h3>メール通知</h3>
            </Box>
            <Box component="div" mb={0.5}>
              <label htmlFor="open">
                <input type="checkbox" name="open" id="open" />
                レビューが開封されたとき
              </label>
            </Box>
            <Box component="div">
              <label htmlFor="request">
                <input type="checkbox" name="request" id="request" />
                レビューリクエストを受け取ったとき
              </label>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Box mb={2}>
          <Box mb={1}>
            <Box mb={2}>
              <h3>Github連携</h3>
            </Box>
            <StyledBoxFlex>
              <StyledBoxParagraf component="p">{googleEmail}</StyledBoxParagraf>
              <LinkGithubButton onClick={linkOnGithub} />
            </StyledBoxFlex>
          </Box>
          <Divider />
        </Box>
      </Box>
    </SettingLayout>
  )
}

export default IndexPage
