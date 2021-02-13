import { FirstViewButtons } from "@/components/molecules/FirstViewButtons";
import { FirstViewText } from "@/components/molecules/FirstViewText";
import { Box } from "@material-ui/core/";
import React from "react";

export const FirstView: React.FC = () => {
  return (
    <Box textAlign="center">
      <FirstViewText />
      <FirstViewButtons />
    </Box>
  );
};
