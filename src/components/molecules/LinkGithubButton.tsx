import { SocialSignInButton } from '@/components/atoms/SocialSignInButton'
import React from 'react'
import GithubLogoSvg from '../../assets/logo/github.svg'

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const LinkGithubButton: React.FC<Props> = (props) => {
  return (
    <>
      <SocialSignInButton text="Githubと連携する" onClick={props.onClick}>
        <GithubLogoSvg width={20} />
      </SocialSignInButton>
    </>
  )
}
