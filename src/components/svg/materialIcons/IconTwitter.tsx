import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};

export const IconTwitter: React.FC<Props> = (props) => {
  return <TwitterIcon fontSize={props.fontSize} />;
};
