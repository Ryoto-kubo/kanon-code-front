import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomWhiteOutButton } from "@/components/atoms/WhiteOutButton";
import { Box } from "@material-ui/core/";
import React from "react";

export const FirstViewButtons: React.FC = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
        <CustomWhiteOutButton sizing="small">
          KanonCodeとは
        </CustomWhiteOutButton>
      </Box>
    </>
  );
};
