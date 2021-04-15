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
      <NoSettingData
        text={props.text}
        description={props.description}
        href={props.href}
        borderRadius={props.borderRadius}
      >
        {props.children}
      </NoSettingData>
    </Box>
  )
}
