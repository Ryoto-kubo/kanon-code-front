import { BackPage } from "@/components/molecules/BackPage";
import Box from "@material-ui/core/Box";
import React from "react";

type Props = {
  linkText: string;
  href: string;
  headingFontSize: number;
  marginBottom: number;
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
  color:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
};

export const SettingForm: React.FC<Props> = (props) => {
  const { linkText, ...backPageProps } = props;

  return (
    <Box mb={6}>
      <Box mb={2}>
        <Box mb={4} display="inline-block">
          <BackPage {...backPageProps}>{linkText}</BackPage>
        </Box>
        {props.children}
      </Box>
    </Box>
  );
};
