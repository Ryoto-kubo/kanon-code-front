import { Box } from '@material-ui/core/'
import React from 'react'

type Props = {
  width?: string
  height?: string
  margin?: string
}

export const CircleElement: React.FC<Props> = ({
  children,
  width = '50px',
  height = '50px',
}) => {
  return (
    <Box
      width={width}
      height={height}
      borderRadius={100}
      display="flex"
      alignItems="center"
      justifyContent="center"
      mr={1}
    >
      {children}
    </Box>
  )
}
