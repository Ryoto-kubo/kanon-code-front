import { CustomAppBar } from "@/components/atoms/app-bar";
import { Logo } from "@/components/atoms/logo";
import { CustomSolidButton } from "@/components/atoms/solid-button";
import { Box } from "@material-ui/core/";
import React from "react";

export const TheHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <Box
        paddingX={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
        <CustomSolidButton sizing="small" width={120}>
          サインイン
        </CustomSolidButton>
      </Box>
    </CustomAppBar>
  );
};
