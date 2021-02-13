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
export const CustomTypography: React.FC<Props> = (props) => {
  const StyledParagraph = styled(Typography)`
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    color: ${props.isPrimary ? theme.palette.primary.main : "#020202"};
  `;
  console.log(props.isPrimary);

  return <StyledParagraph variant="body1">{props.children}</StyledParagraph>;
};
