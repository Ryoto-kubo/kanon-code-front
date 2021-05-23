import { IconErrorRounded } from "@/components/svg/materialIcons/IconErrorRounded";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import React from "react";

type Props = {
  validText: string;
};

export const ValidMessage: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center" mb={1}>
      <Box mr={0.5} height={20}>
        <IconErrorRounded />
      </Box>
      <Box color={theme.palette.error.main}>{props.validText}</Box>
    </Box>
  );
};
