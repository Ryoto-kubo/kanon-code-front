import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";
import CoffeeBreakSvg from "../../../assets/illustration/coffee-break.svg";

type Props = {
  text: string;
};
const StyledCoffeeBreakSvg = styled(CoffeeBreakSvg)`
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
`;
export const CoffeeBreakIllustration = (props: Props) => {
  return (
    <StyledBox>
      <Box>
        <StyledCoffeeBreakSvg />
      </Box>
      <Box lineHeight={1.8}>{props.text}</Box>
    </StyledBox>
  );
};
