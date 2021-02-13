import Typography from "@material-ui/core/Typography";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  children: string;
}
export const Heading1: React.FC<Props> = (props) => {
  const StyledHeading1 = styled(Typography)`
    font-size: ${props.fontSize}px;
  `;
  return (
    <StyledHeading1 variant="h1" color="primary">
      {props.children}
    </StyledHeading1>
  );
};
