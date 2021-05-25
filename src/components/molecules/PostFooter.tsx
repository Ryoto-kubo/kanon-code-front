import { CircleElement } from "@/components/atoms/Circle";
import { ParagraphText } from "@/components/atoms/ParagraphText";
import { Box } from "@material-ui/core/";
import React from "react";

interface Props {
  name: string;
  date: string;
  userIcon: string;
}
export const PostFooter: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <CircleElement>
        <img src={props.userIcon} style={{ borderRadius: "50px" }} />
      </CircleElement>
      <Box>
        <Box fontWeight="bold" component="p">
          {props.name}
        </Box>
        <ParagraphText variant="body2" component="p" color="textSecondary">
          {props.date}
        </ParagraphText>
      </Box>
    </Box>
  );
};
