import Box from '@material-ui/core/Box'
import React from 'react'

export const CenterWrapper: React.FC = (props) => {
  return <Box textAlign="center">{props.children}</Box>
}
