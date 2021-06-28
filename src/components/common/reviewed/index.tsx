import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";
import Thanks from "../../../assets/illustration/thanks.svg";

const StyledThanks = styled(Thanks)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 350px;
  }
`;
const StyledBox = styled(Box)`
  width: 100%;
  text-align: center;
  font-weight: bold;
  line-height: 1.7;
`;
const StyledBoxThanks = styled(Box)`
  font-size: 32px;
  color: ${theme.palette.secondary.main};
`;

export const Reviewed = () => {
  return (
    <StyledBox>
      <Box>
        <StyledThanks />
      </Box>
      <StyledBoxThanks>Thanks!</StyledBoxThanks>
      レビューをいただいております。
      <br />
      疲れたときはゆっくりしてくださいね。
    </StyledBox>
  );
};
