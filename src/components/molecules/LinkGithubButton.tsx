import { SocialSignInButton } from '@/components/atoms/SocialSignInButton';
import { IconGithub } from '@/components/svg/materialIcons/IconGithub';
import React from 'react';

interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkGithubButton: React.FC<Props> = props => {
  const { text, onClick } = props;
  return (
    <SocialSignInButton text={text} onClick={onClick}>
      <IconGithub fontSize='small' />
    </SocialSignInButton>
  );
};
