import theme from "@/styles/theme";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  fontWeight: string;
  isPrimary?: boolean;
  children: string;
}
const StyledParagraph = styled.p<
  Pick<Props, "fontSize" | "fontWeight" | "isPrimary">
>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ isPrimary }) =>
    isPrimary ? theme.palette.primary.main : "#020202"};
`;

export const CustomTypography: React.FC<Props> = (props) => {
  return (
    <StyledParagraph
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      isPrimary={props.isPrimary}
    >
      {props.children}
    </StyledParagraph>
  );
};
