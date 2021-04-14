import { TypoHeading2 } from "@/components/atoms/TypoHeading2";
import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  description: string;
  fontSize: number;
  marginBottom: number;
};
const StyledBox = styled(Box)`
  margin-bottom: 24px;
  padding: 0 24px;
`;
const StyledPDescription = styled("p")`
  margin-bottom: 24px;
  color: #5f6368;
`;

export const ContentHeader: React.FC<Props> = (props) => {
  return (
    <StyledBox>
      <TypoHeading2 color="initial">{props.title}</TypoHeading2>
      <StyledPDescription>{props.description}</StyledPDescription>
    </StyledBox>
  );
};
