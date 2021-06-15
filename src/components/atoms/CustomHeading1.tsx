import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  marginBottom: number;
  color?: string;
}

const StyledHeading1 = styled.h1<
  Pick<Props, "fontSize" | "marginBottom" | "color">
>`
  font-size: ${({ fontSize }) => fontSize}px;
  margin-bottom: ${({ marginBottom }) => marginBottom * 8}px;
  color: #202020;
`;

export const CustomHeading1: React.FC<Props> = (props) => {
  return (
    <StyledHeading1 fontSize={props.fontSize} marginBottom={props.marginBottom}>
      {props.children}
    </StyledHeading1>
  );
};
