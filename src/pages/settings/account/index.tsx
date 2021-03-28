import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { SettingLayout } from '@/layouts/setting'
import { CognitoUser } from '@aws-amplify/auth'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import React from 'react'

type Props = {
  title: string
  authUser: CognitoUser
}

const IndexPage: React.FC<Props> = (props) => {
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  }
  return (
    <SettingLayout
      title="Kanon Code | アカウント設定"
      authUser={props.authUser}
    >
      <Box>
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
            <LinkGithubButton onClick={linkOnGithub} />
          </Box>
          <Divider />
        </Box>
        <Box mb={2}>
          <Box mb={1}>
            <Box mb={2}>
              <h3>アカウントの削除</h3>
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
      </Box>
    </SettingLayout>
  )
}

export default IndexPage
