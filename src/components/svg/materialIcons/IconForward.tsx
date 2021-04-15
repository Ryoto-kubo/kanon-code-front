import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};
export const IconForward: React.FC<Props> = (props) => {
  return <ArrowForwardIosIcon fontSize={props.fontSize} />;
};
