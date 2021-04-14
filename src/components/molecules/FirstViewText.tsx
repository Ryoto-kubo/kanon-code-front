import { ParagraphText } from "@/components/atoms/ParagraphText";
import { TypoHeading1 } from "@/components/atoms/TypoHeading1";
import { Box } from "@material-ui/core/";
import React from "react";

export const FirstViewText: React.FC = () => {
  return (
    <>
      <Box mb={0.5}>
        <TypoHeading1>Kanon Code</TypoHeading1>
      </Box>
      <ParagraphText variant="subtitle1" component="div">
        <Box mb={1.5} fontWeight="fontWeightBold" component="p">
          コードレビューをもらえる、おくれる。
        </Box>
      </ParagraphText>
    </>
  );
};
