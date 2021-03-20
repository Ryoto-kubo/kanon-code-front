import { Tabs } from '@/components/molecules/Tabs'
import React from 'react'

type Props = {
  value: string | number
}

export const TabsHeader: React.FC<Props> = (props) => {
  return <Tabs value={props.value} />
}
