import { SocialSignInButton } from "@/components/atoms/SocialSignInButton";
import { IconGithub } from "@/components/svg/materialIcons/IconGithub";
import React from "react";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkGithubButton: React.FC<Props> = (props) => {
  return (
    <SocialSignInButton text="Githubと連携する" onClick={props.onClick}>
      <IconGithub fontSize="small" />
    </SocialSignInButton>
  );
};
