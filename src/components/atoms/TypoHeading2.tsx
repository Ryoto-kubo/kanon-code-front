import Typography from '@material-ui/core/Typography'
import React from 'react'

interface Props {
  color:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | undefined
}

export const TypoHeading2: React.FC<Props> = (props) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      color={props.color}
      // gutterBottom
      // paragraph
    >
      {props.children}
    </Typography>
  )
}
