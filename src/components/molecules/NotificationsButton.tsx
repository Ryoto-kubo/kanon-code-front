import { CustomIconButton } from "@/components/atoms/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import React from "react";

interface Props {
  disableRipple: boolean;
  func: React.MouseEventHandler;
}

export const NotificationsButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <NotificationsNoneIcon color="action" viewBox="0 0 24 24" />
    </CustomIconButton>
  );
};
