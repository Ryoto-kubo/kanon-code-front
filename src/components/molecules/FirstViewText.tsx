import { Heading1 } from "@/components/atoms/Heading1";
import { CoustomTypography } from "@/components/atoms/Typography";
import { Box } from "@material-ui/core/";
import React from "react";

export const FirstViewText: React.FC = () => {
  return (
    <>
      <CoustomTypography fontSize={16} fontWeight="bold">
        今より一歩前に。
      </CoustomTypography>
      <Box mb={0.5}>
        <Heading1 fontSize={48}>Kanon Code</Heading1>
      </Box>
      <Box mb={1.5}>
        <CoustomTypography fontSize={18} fontWeight="bold" isPrimary={true}>
          コードレビューをもらえる、おくれる。
        </CoustomTypography>
      </Box>
    </>
  );
};
