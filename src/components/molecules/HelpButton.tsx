import { CustomIconButton } from "@/components/atoms/IconButton";
import Help from "@material-ui/icons/Help";
import React from "react";

interface Props {
  func: React.MouseEventHandler;
}

export const HelpButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <Help color="primary" fontSize="small" />
    </CustomIconButton>
  );
};
