import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface Props {
  sizing: "small" | "medium" | "large";
  onClick: Function;
}

const StyledWhiteOutButton = styled(Button)`
  font-weight: bold;
  min-width: 140px;
  text-transform: none;
`;
export const CustomWhiteOutButton: React.FC<Props> = (props) => {
  return (
    <StyledWhiteOutButton
      size={props.sizing}
      variant="outlined"
      color="primary"
      onClick={() => props.onClick()}
      disableElevation
    >
      {props.children}
    </StyledWhiteOutButton>
  );
};
