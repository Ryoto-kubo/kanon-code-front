import theme from "@/styles/theme";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  fontWeight: string;
  isPrimary?: boolean;
  children: string;
}
export const CoustomTypography: React.FC<Props> = (props) => {
  const StyledParagraph = styled(Typography)`
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    color: ${props.isPrimary ? theme.palette.primary.main : "#020202"};
    margin-bottom: 0px;
  `;
  return (
    <StyledParagraph variant="body1" gutterBottom>
      {props.children}
    </StyledParagraph>
  );
};
