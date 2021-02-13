import { Heading1 } from "@/components/atoms/Heading1";
import { CustomTypography } from "@/components/atoms/Typography";
import { Box } from "@material-ui/core/";
import React from "react";

export const FirstViewText: React.FC = () => {
  return (
    <>
      <CustomTypography fontSize={16} fontWeight="bold">
        今より一歩前に。
      </CustomTypography>
      <Box mb={0.5}>
        <Heading1 fontSize={48}>Kanon Code</Heading1>
      </Box>
      <Box mb={1.5}>
        <CustomTypography fontSize={18} fontWeight="bold" isPrimary={true}>
          コードレビューをもらえる、おくれる。
        </CustomTypography>
      </Box>
    </>
  );
};
