import { CustomHeading1 } from "@/components/atoms/CustomHeading1";
import { Tags } from "@/components/atoms/Tags";
import { TagsIcon } from "@/components/atoms/TagsIcon";
import { Box } from "@material-ui/core/";
import React from "react";

type Props = {
  title: string;
  tagArray: Array<string>;
};

export const RequestItemTitle: React.FC<Props> = (props) => {
  return (
    <Box>
      <CustomHeading1 fontSize={28} marginBottom={0.5}>
        {props.title}
      </CustomHeading1>
      <Box mb={1}>
        <Box mr={1} component="span">
          <TagsIcon />
        </Box>
        <Tags fontSize={14} marginRight={1} tagArray={props.tagArray} />
      </Box>
    </Box>
  );
};
