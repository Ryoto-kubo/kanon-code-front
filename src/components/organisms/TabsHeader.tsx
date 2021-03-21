import { SettingTabs } from '@/components/molecules/Tabs'
import React from 'react'

type Props = {
  value: string | number
  onChange: (event: React.ChangeEvent<{}>, newValue: string) => void
  tabLists: Array<{ label: string; value: string; href: string }>
}

export const TabsHeader: React.FC<Props> = (props) => {
  return (
    <SettingTabs
      value={props.value}
      onChange={props.onChange}
      tabLists={props.tabLists}
    />
  )
}
