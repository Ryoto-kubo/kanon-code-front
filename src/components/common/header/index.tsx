import { CustomAppBar } from "@/components/atoms/app-bar";
import { CustomSolidButton } from "@/components/atoms/solid-button";
import React from "react";

export const TheHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <CustomSolidButton sizing="small" width={120}>
        サインイン
      </CustomSolidButton>
    </CustomAppBar>
  );
};
