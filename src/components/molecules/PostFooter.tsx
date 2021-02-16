import { CircleElement } from "@/components/atoms/Circle";
import { ParagraphText } from "@/components/atoms/ParagraphText";
import { UserIcon } from "@/components/atoms/UserIcon";
import { Box } from "@material-ui/core/";
import React from "react";

interface Props {
  name: string;
  date: string;
}
export const PostFooter: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <CircleElement>
        <UserIcon />
      </CircleElement>
      <Box>
        <ParagraphText fontSize={14} fontWeight="normal">
          {props.name}
        </ParagraphText>
        <ParagraphText fontSize={14} fontWeight="normal">
          {props.date}
        </ParagraphText>
      </Box>
    </Box>
  );
};
