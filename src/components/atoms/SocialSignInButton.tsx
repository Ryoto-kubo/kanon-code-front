import { Box, Button } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

const StyledBox = styled(Box)`
  margin-right: 16px;
  display: flex;s
`
const StyledSpan = styled.span`
  font-weight: bold;
`
export const SocialSignInButton: React.FC<Props> = (props) => {
  return (
    <Button variant="outlined">
      <StyledBox>{props.children}</StyledBox>
      <StyledSpan>{props.text}</StyledSpan>
    </Button>
  )
}
