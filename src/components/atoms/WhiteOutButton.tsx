import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface Props {
  sizing: "small" | "medium" | "large";
}

const StyledWhiteOutButton = styled(Button)`
  font-weight: bold;
  min-width: 140px;
`;
export const CustomWhiteOutButton: React.FC<Props> = (props) => {
  return (
    <StyledWhiteOutButton
      size={props.sizing}
      variant="outlined"
      color="primary"
      disableElevation
    >
      {props.children}
    </StyledWhiteOutButton>
  );
};
