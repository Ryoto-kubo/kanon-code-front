import Typography from "@material-ui/core/Typography";
import React from "react";

interface Props {
  color?:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error"
    | undefined;
}

export const TypoHeading1: React.FC<Props> = (props) => {
  const color = props.color ? props.color : "primary";
  return (
    <Typography variant="h1" component="h1" color={color}>
      {props.children}
    </Typography>
  );
};
