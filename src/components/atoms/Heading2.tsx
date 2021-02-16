import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  marginBottom: number;
  color?: string;
}

const StyledHeading2 = styled.h2<
  Pick<Props, "fontSize" | "marginBottom" | "color">
>`
  font-size: ${({ fontSize }) => fontSize}px;
  margin-bottom: ${({ marginBottom }) => marginBottom * 8}px;
  color: #202020;
`;

export const Heading2: React.FC<Props> = (props) => {
  return (
    <StyledHeading2 fontSize={props.fontSize} marginBottom={props.marginBottom}>
      {props.children}
    </StyledHeading2>
  );
};
