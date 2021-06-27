import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React from 'react'

type Props = {
  fontSize: 'small' | 'inherit' | 'default' | 'large' | undefined
}

export const IconDot: React.FC<Props> = (props) => {
  return <MoreHorizIcon fontSize={props.fontSize} />
}
