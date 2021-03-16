import { SettingLayout } from '@/layouts/setting'
import { CognitoUser } from '@aws-amplify/auth'
import React from 'react'

type Props = {
  title: string
  authUser: CognitoUser
}

const IndexPage: React.FC<Props> = (props) => {
  return (
    <SettingLayout title="Kanon Code | 購入履歴" authUser={props.authUser}>
      <p>購入履歴</p>
    </SettingLayout>
  )
}

export default IndexPage
