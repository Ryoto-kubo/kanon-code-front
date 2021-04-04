import { SignInGoogleButton } from '@/components/molecules/SignInGoogleButtons'
import { SignInTexts } from '@/components/molecules/SignInTexts'
import { Box } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const StyledBox = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const SignInContent: React.FC<Props> = (props) => {
  return (
    <StyledBox>
      <SignInTexts />
      <SignInGoogleButton onClick={props.onClick} />
    </StyledBox>
  )
}
