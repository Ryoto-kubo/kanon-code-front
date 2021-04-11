import { CustomIconButton } from "@/components/atoms/IconButton";
import { IconClose } from "@/components/atoms/IconClose";
import React from "react";

interface Props {
  func: React.MouseEventHandler;
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
}

export const CloseButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <IconClose fontSize={props.fontSize} color={props.color} />
    </CustomIconButton>
  );
};
