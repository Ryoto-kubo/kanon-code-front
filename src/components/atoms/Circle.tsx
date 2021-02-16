import { Box } from "@material-ui/core/";
import React from "react";

export const CircleElement: React.FC = (props) => {
  return (
    <Box
      width={50}
      height={50}
      borderRadius={100}
      border="3px solid #707070"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mr={1}
    >
      {props.children}
    </Box>
  );
};
