import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { Price } from "@/components/atoms/Price";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { Player } from "@lottiefiles/react-lottie-player";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  name: string;
  iconSrc: string;
  price: number;
  isSucceeded: boolean;
  isDisabled: boolean;
  width: string;
  height: string;
  isOpenDialog: boolean;
  closeDialog: () => void;
  payment: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;
const StyledBoxButtonsWrapper = styled(Box)`
  padding: 24px 24px 16px 24px;
  text-align: right;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;
const StyledBoxTitleWrapper = styled(Box)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  display: inline-block;
  border-bottom: 1px dashed #a8abb1;
`;
const StyledBoxBg = styled(Box)`
  background: #fafafa;
`;
const StyledBoxSuccessWrapper = styled(Box)`
  padding: 32px;
`;
const StyledBoxMessageWrapper = styled(Box)`
  text-align: center;
  font-weight: bold;
`;

export const PaymentDialog: React.FC<Props> = (props) => {
  const SUCCESS_ANIMATION_SRC =
    "https://assets7.lottiefiles.com/packages/lf20_yom6uvgj.json";

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
      {props.isSucceeded ? (
        <StyledBoxSuccessWrapper>
          <Box mb={2}>
            <Player
              autoplay
              keepLastFrame
              src={SUCCESS_ANIMATION_SRC}
              controls={true}
              style={{ height: "100px", width: "100px" }}
            />
          </Box>
          <StyledBoxMessageWrapper>
            <Box mb={1}>Thanks!!</Box>
            <Box>レビューを購入しました！</Box>
          </StyledBoxMessageWrapper>
        </StyledBoxSuccessWrapper>
      ) : (
        <>
          <StyledBoxWrapper>
            <CustomHeading2 fontSize={20} marginBottom={0}>
              レビュー購入
            </CustomHeading2>
            <Price color={"#EC576B"} text={`¥${props.price}`} />
          </StyledBoxWrapper>
          <StyledBoxBg>
            <DialogContent>
              <StyledBoxFlex>
                <Box component="a" height={`${props.height}`}>
                  <img
                    src={props.iconSrc}
                    style={{
                      borderRadius: "50px",
                      width: `${props.width}`,
                      height: `${props.height}`,
                      marginRight: "8px",
                    }}
                  />
                </Box>
                <Box component="p">{props.name}</Box>
              </StyledBoxFlex>
              <Box mb={1} textAlign="center">
                <StyledBoxTitleWrapper>{props.title}</StyledBoxTitleWrapper>
              </Box>
            </DialogContent>
          </StyledBoxBg>
          <StyledBoxButtonsWrapper>
            <Box mr={1} display="inline-block">
              <Button onClick={props.closeDialog} color="default">
                キャンセル
              </Button>
            </Box>
            <CustomSolidButton
              sizing="medium"
              onClick={() => props.payment()}
              color="secondary"
              disabled={props.isDisabled}
            >
              {props.isDisabled ? "購入中..." : "レビューを購入する"}
            </CustomSolidButton>
          </StyledBoxButtonsWrapper>
        </>
      )}
    </Dialog>
  );
};
