import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";
import RelaxSvg from "../../../assets/illustration/relaxing.svg";

const StyledRelaxSvg = styled(RelaxSvg)`
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
export const RelaxIllustration = () => {
  return (
    <StyledBox>
      <Box>
        <StyledRelaxSvg />
      </Box>
      <Box lineHeight={1.8}>
        まだレビューは投稿されていません。
        <br />
        リラックスして少し休憩しませんか？
      </Box>
    </StyledBox>
  );
};
