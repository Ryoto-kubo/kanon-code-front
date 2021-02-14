import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface Props {
  sizing: "small" | "medium" | "large";
}

const StyledSolidButton = styled(Button)`
  color: #ffffff;
  font-weight: bold;
  min-width: 140px;
`;
export const CustomSolidButton: React.FC<Props> = (props) => {
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
