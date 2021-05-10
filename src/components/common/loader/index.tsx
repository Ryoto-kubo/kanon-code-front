import Box from "@material-ui/core/Box";
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const StyledBoxAbsolute = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CustomLoader: React.FC = () => {
  return (
    <StyledBoxAbsolute>
      <Loader type="TailSpin" color="#5C6BC0" height={60} width={60} />
    </StyledBoxAbsolute>
  );
};
