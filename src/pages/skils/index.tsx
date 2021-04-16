import { SettingSkils } from '@/components/organisms/SettingSkils'
import { SettingLayout } from '@/layouts/setting-form'
import React from 'react'

type Props = {
  title: string
  authUser: any
}
const IndexPage: React.FC<Props> = (props) => {
  return (
    <SettingLayout title="Kanon Code | スキル" authUser={props.authUser}>
      <SettingSkils
        linkText="スキル"
        href="/settings/skil"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      />
    </SettingLayout>
  )
}

export default IndexPage
