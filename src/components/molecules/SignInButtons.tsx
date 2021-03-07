import { SocialSignInButton } from "@/components/atoms/SocialSignInButton";
import React from "react";
import GoogleLogoSvg from "../../assets/logo/google.svg";

interface Props {
  onClick: () => void;
}
// const StyledSpan = styled.span`
//   margin-bottom: 16px;
//   display: inline-block;
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     margin-bottom: 0;
//     &:not(:last-child) {
//       margin-right: 16px;
//     }
//   }
// `;

export const SignInButtons: React.FC<Props> = (props) => {
  return (
    <>
      <SocialSignInButton text="Sign in with Google" onClick={props.onClick}>
        <GoogleLogoSvg width={20} />
      </SocialSignInButton>
    </>
  );
};
