import { SocialSignInButton } from '@/components/atoms/SocialSignInButton'
import React from 'react'
import styled from 'styled-components'
import GithubSvg from '../../assets/logo/github.svg'
import GoogleLogoSvg from '../../assets/logo/google.svg'

const StyledSpan = styled.span`
  margin-bottom: 16px;
  display: inline-block;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`

export const SignInButtons: React.FC = () => {
  return (
    <>
      <StyledSpan>
        <SocialSignInButton text="Sign in with Google">
          <GoogleLogoSvg width={20} />
        </SocialSignInButton>
      </StyledSpan>
      <StyledSpan>
        <SocialSignInButton text="Sign in with Github">
          <GithubSvg width={20} height={20} />
        </SocialSignInButton>
      </StyledSpan>
    </>
  )
}
