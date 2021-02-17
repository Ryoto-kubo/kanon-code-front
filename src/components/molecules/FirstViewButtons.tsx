import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomWhiteOutButton } from "@/components/atoms/WhiteOutButton";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 255px;
  margin: auto;
  ${(props) => props.theme.breakpoints.up("sm")} {
    max-width: 300px;
  }
`;

export const FirstViewButtons: React.FC = () => {
  return (
    <StyledBox>
      <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
      <CustomWhiteOutButton sizing="small">Kanon Codeとは</CustomWhiteOutButton>
    </StyledBox>
  );
};
