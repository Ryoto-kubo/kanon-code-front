import { PostFooter } from "@/components/molecules/PostFooter";
import { PostHeader } from "@/components/molecules/PostHeader";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  postUrl: string;
  iconPath: string;
  name: string;
  date: string;
  tagArray: Array<string>;
  userIcon: string;
}

const StyledMaxWidthdiv = styled(Box)`
  min-height: 175px;
  padding: 16px;
`;

export const Post: React.FC<Props> = (props) => {
  return (
    <StyledMaxWidthdiv display="flex" alignItems="center">
      <Box mr={2} flexShrink={0}>
        <img
          width={"50px"}
          height={"50px"}
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${props.iconPath}`}
        />
      </Box>
      <Box>
        <PostHeader
          title={props.title}
          postUrl={props.postUrl}
          tagArray={props.tagArray}
        />
        <PostFooter
          name={props.name}
          date={props.date}
          userIcon={props.userIcon}
        />
      </Box>
    </StyledMaxWidthdiv>
  );
};
