import StarIcon from "@material-ui/icons/Star";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};

export const IconStar: React.FC<Props> = (props) => {
  return <StarIcon fontSize={props.fontSize} />;
};
