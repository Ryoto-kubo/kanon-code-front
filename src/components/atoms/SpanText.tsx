import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  fontWeight: string;
}
const StyledSpan = styled.span<Pick<Props, "fontSize" | "fontWeight">>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: #020202;
`;

export const SpanText: React.FC<Props> = (props) => {
  return (
    <StyledSpan fontSize={props.fontSize} fontWeight={props.fontWeight}>
      {props.children}
    </StyledSpan>
  );
};
