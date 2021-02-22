import { SignInButtons } from '@/components/molecules/SignInButtons'
import { SignInTexts } from '@/components/molecules/SignInTexts'
import { Box } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

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
export const SignInContent: React.FC = () => {
  return (
    <StyledBox>
      <SignInTexts />
      <SignInButtons />
    </StyledBox>
  )
}
