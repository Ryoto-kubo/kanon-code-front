import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { Tags } from "@/components/atoms/Tags";
import { TagsIcon } from "@/components/atoms/TagsIcon";
import theme from "@/styles/theme";
import { Box } from "@material-ui/core/";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  postUrl: string;
  tagArray: Array<string>;
}

const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const PostHeader: React.FC<Props> = (props) => {
  return (
    <Box>
      <Link href={props.postUrl} passHref>
        <StyledAnchor>
          <CustomHeading2 fontSize={16} marginBottom={1}>
            {props.title}
          </CustomHeading2>
        </StyledAnchor>
      </Link>
      <Box mb={1}>
        <Box mr={1} component="span">
          <TagsIcon />
        </Box>
        <Tags fontSize={14} marginRight={1} tagArray={props.tagArray} />
      </Box>
    </Box>
  );
};
