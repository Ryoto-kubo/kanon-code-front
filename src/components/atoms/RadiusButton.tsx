import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

type Props = {
  sizing: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained" | undefined;
  color: "default" | "inherit" | "primary" | "secondary" | undefined;
  onClick: Function;
};

const StyledWhiteOutButton = styled(Button)`
  font-weight: bold;
  min-width: 140px;
  text-transform: none;
  border-radius: 50px;
`;
export const RadiusButton: React.FC<Props> = (props) => {
  return (
    <StyledWhiteOutButton
      size={props.sizing}
      variant={props.variant}
      color={props.color}
      onClick={() => props.onClick()}
      disableElevation
    >
      {props.children}
    </StyledWhiteOutButton>
  );
};
