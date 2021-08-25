import { RequestItemUser } from "@/components/molecules/RequestItemUser";
import theme from "@/styles/theme";
import { ReviewContentsTypes, UserProfileTypes } from "@/types/global";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import marked from "marked";
import React from "react";
import styled from "styled-components";

type Props = {
  contents: ReviewContentsTypes;
  profile: UserProfileTypes;
  date: string;
  isOpen: boolean;
  closeDialog: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 8px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`;

export const ReviewContentsDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={"md"}
      onClose={props.closeDialog}
    >
      <DialogContent>
        <Box mb={2}>
          <RequestItemUser
            name={props.profile.display_name}
            date={props.date}
            userIcon={props.profile.icon_src}
            width={"32px"}
            height={"32px"}
          />
        </Box>
        <StyledBoxTitleWrapper>
          <h1>{props.contents.review.title}</h1>
        </StyledBoxTitleWrapper>
        <div className="review-item-wrapper">
          <span
            dangerouslySetInnerHTML={{
              __html: marked(props.contents.review.body_html),
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
