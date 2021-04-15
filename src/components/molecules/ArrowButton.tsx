import { CustomIconButton } from "@/components/atoms/IconButton";
import { IconArrowBack } from "@/components/svg/materialIcons/IconArrowBack";
import React from "react";

type Props = {
  disableRipple: boolean;
  func: React.MouseEventHandler;
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
  color:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
};

export const ArrowButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={props.disableRipple} func={props.func}>
      <IconArrowBack fontSize={props.fontSize} color={props.color} />
    </CustomIconButton>
  );
};
