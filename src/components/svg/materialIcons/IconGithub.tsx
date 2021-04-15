import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};

export const IconGithub: React.FC<Props> = (props) => {
  return <GitHubIcon fontSize={props.fontSize} />;
};
