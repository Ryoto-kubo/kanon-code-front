import { SettingLayout } from '@/layouts/setting'
import { CognitoUser } from '@aws-amplify/auth'
import React from 'react'

type Props = {
  title: string
  authUser: CognitoUser
}

const IndexPage: React.FC<Props> = (props) => {
  return (
    <SettingLayout title="Kanon Code | 振込先情報" authUser={props.authUser}>
      <p>振込先情報</p>
    </SettingLayout>
  )
}

export default IndexPage
