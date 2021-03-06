import { CustomIconButton } from "@/components/atoms/IconButton";
import { Notifications } from "@material-ui/icons";
import React from "react";

interface Props {
  disableRipple: boolean;
  func: React.MouseEventHandler;
}

export const NotificationsButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <Notifications />
    </CustomIconButton>
  );
};
