import { UserImgIcon } from '@/components/atoms/UserImgIcon'
import { SettingLayout } from '@/layouts/setting'
import { makeStyles } from '@material-ui/core/styles'
// import { CognitoUser } from '@aws-amplify/auth'
import React from 'react'
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

const IndexPage: React.FC<Props> = (props) => {
  const classes = useStyles()
  const userInfo =
    props.authUser !== null
      ? props.authUser.signInUserSession.idToken.payload
      : 'null'
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log('change icon')
  }
  return (
    <SettingLayout
      title="Kanon Code | プロフィール設定"
      authUser={props.authUser}
    >
      <StyledSection>
        <UserImgIcon className={classes.size} picture={userInfo.picture} />
      </StyledSection>
    </SettingLayout>
  )
}

export default IndexPage
