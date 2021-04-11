import CloseIcon from "@material-ui/icons/Close";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
};
export const IconClose: React.FC<Props> = (props) => {
  return <CloseIcon fontSize={props.fontSize} color={props.color} />;
};
