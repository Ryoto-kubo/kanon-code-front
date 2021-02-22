import Typography from '@material-ui/core/Typography'
import React from 'react'

interface Props {
  color?: string
}

// const StyledHeading1 = styled.h1<Pick<Props, 'color'>>`
//   color: ${theme.palette.primary.main};
// `

export const Heading1: React.FC<Props> = (props) => {
  return (
    <Typography variant="h1" component="h1" color="primary">
      {props.children}
    </Typography>
    // <StyledHeading1 fontSize={props.fontSize}>{props.children}</StyledHeading1>
  )
}
