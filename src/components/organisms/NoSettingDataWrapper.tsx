import { NoSettingData } from '@/components/molecules/NoSettingData'
import Box from '@material-ui/core/Box'
import React from 'react'

type Props = {
  text: string
  description: string
  href: string
  borderRadius: number
  mb: number
}

export const NoSettingDataWrapper: React.FC<Props> = (props) => {
  return (
    <Box mb={props.mb}>
      <NoSettingData {...props}>{props.children}</NoSettingData>
    </Box>
  )
}
