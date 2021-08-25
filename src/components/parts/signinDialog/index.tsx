import { SignInGoogleButton } from "@/components/molecules/SignInGoogleButtons";
import theme from "@/styles/theme";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Auth } from "aws-amplify";
import React from "react";
import styled from "styled-components";
import KanonCodeLogoSvg from "../../../assets/logo/kanon-code.svg";

type Props = {
  isOpenDialog: boolean;
  closeDialog: () => void;
};

const StyledKanonCodeLogo = styled(KanonCodeLogoSvg)`
  width: 250px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 300px;
  }
`;
const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 32px;
  padding-top: 24px;
`;
const StyledBoxMessageWrapper = styled(Box)`
  color: ${theme.palette.primary.main};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const signin = () => {
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
};

export const SigninDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={"sm"}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledBoxContentWrapper>
        <DialogContent>
          <StyledKanonCodeLogo />
          <StyledBoxMessageWrapper>
            全てのエンジニアにコードレビューを。
          </StyledBoxMessageWrapper>
          <SignInGoogleButton onClick={signin} />
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
