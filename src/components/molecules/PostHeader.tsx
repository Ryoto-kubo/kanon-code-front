import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { Tags } from "@/components/atoms/Tags";
import { TagsIcon } from "@/components/atoms/TagsIcon";
import { Box } from "@material-ui/core/";
import React from "react";

interface Props {
  title: string;
  tagArray: Array<string>;
}
export const PostHeader: React.FC<Props> = (props) => {
  return (
    <Box>
      <CustomHeading2 fontSize={16} marginBottom={1}>
        {props.title}
      </CustomHeading2>
      <Box mb={1}>
        <Box mr={1} component="span">
          <TagsIcon />
        </Box>
        <Tags fontSize={14} marginRight={1} tagArray={props.tagArray} />
      </Box>
    </Box>
  );
};
