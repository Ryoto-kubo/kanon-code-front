import Box from "@material-ui/core/Box";
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};
const StyledBoxAbsolute = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CustomLoader: React.FC<Props> = ({
  width = 60,
  height = 60,
  color = "#5C6BC0",
}) => {
  return (
    <StyledBoxAbsolute height={height}>
      <Loader type="TailSpin" color={color} width={width} height={height} />
    </StyledBoxAbsolute>
  );
};
