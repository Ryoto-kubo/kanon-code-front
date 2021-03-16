import { SettingLayout } from '@/layouts/setting'
import { CognitoUser } from '@aws-amplify/auth'
import React from 'react'

type Props = {
  title: string
  authUser: CognitoUser
}

const IndexPage: React.FC<Props> = (props) => {
  return (
    <SettingLayout title="Kanon Code | カード情報" authUser={props.authUser}>
      <p>カード情報</p>
    </SettingLayout>
  )
}

export default IndexPage
