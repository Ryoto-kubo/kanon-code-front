import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface Props {
  sizing: "small" | "medium" | "large";
}

export const CustomSolidButton: React.FC<Props> = (props) => {
  const StyledSolidButton = styled(Button)`
    color: #ffffff;
    font-weight: bold;
    min-width: 140px;
  `;

  return (
    <StyledSolidButton
      size={props.sizing}
      variant="contained"
      color="primary"
      disableElevation
    >
      {props.children}
    </StyledSolidButton>
  );
};
