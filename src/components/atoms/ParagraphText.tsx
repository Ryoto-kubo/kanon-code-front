import Typography from '@material-ui/core/Typography'
import React from 'react'

interface Props {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit'
    | undefined
  component: React.ElementType<any>
  color?:
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | undefined
}
export const ParagraphText: React.FC<Props> = (props) => {
  return (
    <Typography
      variant={props.variant}
      component={props.component}
      color={props.color}
    >
      {props.children}
    </Typography>
  )
}
