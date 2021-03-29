import { SocialSignInButton } from "@/components/atoms/SocialSignInButton";
import React from "react";
import GoogleLogoSvg from "../../assets/logo/google.svg";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SignInGoogleButton: React.FC<Props> = (props) => {
  return (
    <>
      <SocialSignInButton text="Sign in with Google" onClick={props.onClick}>
        <GoogleLogoSvg width={20} height={20} />
      </SocialSignInButton>
    </>
  );
};
