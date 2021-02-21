import { SocialSignInButton } from '@/components/atoms/SocialSignInButton'
import React from 'react'
import GithubSvg from '../../assets/logo/github.svg'
import GoogleLogoSvg from '../../assets/logo/google.svg'

export const SignInButtons: React.FC = () => {
  return (
    <>
      <SocialSignInButton text="Sign in with Google">
        <GoogleLogoSvg width={20} />
      </SocialSignInButton>
      <SocialSignInButton text="Sign in with Github">
        <GithubSvg width={20} height={24} />
      </SocialSignInButton>
    </>
  )
}
