import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import theme from "@/styles/theme";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  users: {
    display_name: string;
    icon_src: string;
  }[];
  isOpen: boolean;
  closeDialog: () => void;
};

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;
const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 32px;
  padding-top: 24px;
`;
const StyledBoxBorder = styled(Box)`
  margin-bottom: 16px;
  border-bottom: 1px solid #dddddd;
  padding: 0 8px 8px 8px;
  text-align: left;
`;
const StyledAnchor = styled(`a`)`
  display: inline-block;
  font-weight: bold;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const StyledBoxAnchorWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ReactionUsersDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={"xs"}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledBoxWrapper>
        <CustomHeading2 fontSize={20} marginBottom={0}>
          オススメしたユーザー
        </CustomHeading2>
      </StyledBoxWrapper>
      <StyledBoxContentWrapper>
        <DialogContent>
          {props.users.map((user, index) => (
            <StyledBoxBorder>
              <Link href={`/${user.display_name}`}>
                <StyledAnchor>
                  <StyledBoxAnchorWrapper>
                    <Box mr={1}>
                      <Avatar key={index} src={user.icon_src} />
                    </Box>
                    <span>{user.display_name}</span>
                  </StyledBoxAnchorWrapper>
                </StyledAnchor>
              </Link>
            </StyledBoxBorder>
          ))}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
