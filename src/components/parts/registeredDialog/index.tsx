import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
// import Link from "next/link";
import React from "react";
import styled from "styled-components";
import CelebrationSvg from "../../../assets/illustration/celebration.svg";

type Props = {
  showModal: boolean;
  name: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBoxTitleWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
  text-align: center;
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 20px 56px 0 56px;
  }
`;
const StyledCelebrationSvg = styled(CelebrationSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 350px;
  }
`;
const StyledTypographyWrapper = styled(Typography)`
  // font-size: 16px;
`;
const StyledBoxContentsWrapper = styled(Box)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
  color: ${theme.palette.primary.main};
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 18px;
  }
`;
const StyledAnchor = styled("a")`
  text-decoration: none;
  &:hover {
    text-decoration-color: ${theme.palette.primary.main};
    text-decoration-line: underline;
  }
`;
export const RegisteredDialog: React.FC<Props> = (props) => {
  const domain = process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT;

  return (
    <Dialog
      open={props.showModal}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledBoxTitleWrapper>
        <CustomHeading2 fontSize={24} marginBottom={2}>
          Congratulations!!
        </CustomHeading2>
        <StyledCelebrationSvg />
      </StyledBoxTitleWrapper>
      <Box textAlign="center" mb={2} paddingX={3}>
        <StyledTypographyWrapper variant="subtitle1" gutterBottom>
          Kanon Codeへようこそ！
        </StyledTypographyWrapper>
        <DialogContent>
          {/* <Link href={`${domain}`} passHref> */}
          <StyledAnchor href={`${domain}`}>
            <StyledBoxContentsWrapper>トップへ</StyledBoxContentsWrapper>
          </StyledAnchor>
          {/* </Link> */}
        </DialogContent>
      </Box>
    </Dialog>
  );
};
