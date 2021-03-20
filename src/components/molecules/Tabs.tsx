import { CustomTab } from '@/components/atoms/Tab'
import { CustomTabs } from '@/components/atoms/Tabs'
import React from 'react'

type Props = {
  value: string | number
}

export const Tabs: React.FC<Props> = (props) => {
  return (
    <CustomTabs value={props.value}>
      <CustomTab
        label="プロフィール"
        value="/settings/profile"
        href="/settings/profile"
      />
      <CustomTab
        label="アカウント"
        value="/settings/account"
        href="/settings/account"
      />
      <CustomTab
        label="カード情報"
        value="/settings/billing"
        href="/settings/billing"
      />
      <CustomTab
        label="購入履歴"
        value="/settings/payments-history"
        href="/settings/payments-history"
      />
      <CustomTab
        label="お振込先"
        value="/settings/bank"
        href="/settings/bank"
      />
    </CustomTabs>
  )
}
