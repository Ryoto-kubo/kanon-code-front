import { ParagraphText } from "@/components/atoms/ParagraphText";
import { TypoHeading1 } from "@/components/atoms/TypoHeading1";
import { Box } from "@material-ui/core/";
import React from "react";

export const SignInTexts: React.FC = () => {
  return (
    <Box mb={4}>
      <Box mb={2}>
        <TypoHeading1>Sign in</TypoHeading1>
      </Box>
      <ParagraphText variant="subtitle1" component="p">
        Googleアカウントで新規登録、ログインができます。
      </ParagraphText>
    </Box>
  );
};
