import NavigateNextIcon from "@material-ui/icons/NavigateNext";
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

export const IconArrowNext: React.FC<Props> = (props) => {
  return <NavigateNextIcon fontSize={props.fontSize} color={props.color} />;
};
