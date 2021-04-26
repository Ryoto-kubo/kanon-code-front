import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { postPublishState } from "@/recoil/atoms/postPublish";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

type Props = {
  title: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)`
  paddig: 24px;
`;
const StyledTitle = styled("p")`
  font-size: 16px;
  font-weight: bold;
`;

export const PostSettingDialog: React.FC<Props> = (props) => {
  const isPostPublish = useRecoilValue(postPublishState);
  const setPostPublishState = useSetRecoilState(postPublishState);

  const handleClose = () => {
    setPostPublishState(false);
  };

  return (
    <StyledDialog
      open={isPostPublish}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle disableTypography={false}>
        <CustomHeading2 fontSize={24} marginBottom={0}>
          {props.title}
        </CustomHeading2>
      </DialogTitle>
      <Box>
        <DialogContent>
          <StyledTitle>対象言語</StyledTitle>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Box>
      <Box>
        <DialogContent>
          <StyledTitle>アイコン</StyledTitle>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Box>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleClose} color="primary">
          Agree
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
