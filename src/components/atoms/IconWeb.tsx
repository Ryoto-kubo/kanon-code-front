import LanguageIcon from "@material-ui/icons/Language";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};

export const IconWeb: React.FC<Props> = (props) => {
  return <LanguageIcon fontSize={props.fontSize} />;
};
