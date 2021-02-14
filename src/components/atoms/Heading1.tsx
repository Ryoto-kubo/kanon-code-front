import theme from "@/styles/theme";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  color?: string;
}

const StyledHeading1 = styled.h1<Pick<Props, "fontSize" | "color">>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${theme.palette.primary.main};
`;

export const Heading1: React.FC<Props> = (props) => {
  return (
    <StyledHeading1 fontSize={props.fontSize}>{props.children}</StyledHeading1>
  );
};
