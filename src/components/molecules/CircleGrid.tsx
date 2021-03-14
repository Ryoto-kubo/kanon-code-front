import { Grid, Paper } from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
};

const StyledGridCenter = styled(Grid)`
  text-align: center;
`;
const StyledPaper = styled(Paper)`
  padding: 16px;
  &:hover {
    box-shadow: 0 3px 6px #707070;
  }
`;
const StyledCircle = styled.div`
  border-radius: 50px;
  background: ${fade("#f5f5f5", 0.7)};
  width: 80px;
  height: 80px;
  display: inline-block;
  position: relative;
  transition: all 0.3s;
`;
const StyledAbsolute = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CircleGrid: React.FC<Props> = (props) => {
  return (
    <StyledGridCenter item xs={6} sm={3} md={2}>
      <StyledPaper elevation={0}>
        <StyledCircle>
          <StyledAbsolute>{props.children}</StyledAbsolute>
        </StyledCircle>
        <p>{props.text}</p>
      </StyledPaper>
    </StyledGridCenter>
  );
};
