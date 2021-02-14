import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  color?: string;
}

const StyledHeading2 = styled.h2<Pick<Props, "fontSize" | "color">>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: #202020;
`;

export const Heading2: React.FC<Props> = (props) => {
  return (
    <StyledHeading2 fontSize={props.fontSize}>{props.children}</StyledHeading2>
  );
};
