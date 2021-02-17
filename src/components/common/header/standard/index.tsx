import { CustomAppBar } from "@/components/atoms/AppBar";
import { KanonCodeLogo } from "@/components/atoms/Logo";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  padding: 0 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0 48px;
  }
`;

export const TheStndardHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <StyledBox
        paddingX={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <KanonCodeLogo />
        <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
      </StyledBox>
    </CustomAppBar>
  );
};
