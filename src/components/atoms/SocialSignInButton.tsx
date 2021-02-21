import { Button } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}
const StyledSpan = styled.span`
  font-weight: bold;
`
export const SocialSignInButton: React.FC<Props> = (props) => {
  return (
    <>
      <Button variant="outlined">
        {props.children}
        <StyledSpan>{props.text}</StyledSpan>
      </Button>
    </>
  )
}
