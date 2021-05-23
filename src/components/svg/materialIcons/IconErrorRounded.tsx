import theme from "@/styles/theme";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import React from "react";

export const IconErrorRounded: React.FC = () => {
  return (
    <ErrorRoundedIcon
      fontSize="small"
      style={{ color: theme.palette.error.main }}
    />
  );
};
