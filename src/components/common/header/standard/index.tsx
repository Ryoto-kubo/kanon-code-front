import { CustomAppBar } from "@/components/atoms/AppBar";
import { Logo } from "@/components/atoms/Logo";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { Box } from "@material-ui/core/";
import React from "react";

export const TheStndardHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <Box
        paddingX={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
        <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
      </Box>
    </CustomAppBar>
  );
};
