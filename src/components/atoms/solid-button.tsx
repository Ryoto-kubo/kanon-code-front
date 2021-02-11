import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface Props {
  width: number;
  sizing: "small" | "medium" | "large";
}

export const CustomSolidButton: React.FC<Props> = (props) => {
  const StyledSolidButton = styled(Button)`
    background: #5c6bc0;
    color: #ffffff;
    width: ${props.width}px;
  `;

  return (
    <StyledSolidButton size={props.sizing}>{props.children}</StyledSolidButton>
  );
};
