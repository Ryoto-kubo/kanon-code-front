import { PostFooter } from "@/components/molecules/PostFooter";
import { PostHeader } from "@/components/molecules/PostHeader";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
import ReactSvg from "../../assets/logo/react.svg";

interface Props {
  name: string;
  date: string;
  title: string;
  tagArray: Array<string>;
}

const StyledMaxWidthdiv = styled(Box)`
  min-height: 175px;
  padding: 8px;
`;

export const Post: React.FC<Props> = (props) => {
  return (
    <StyledMaxWidthdiv
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Box mr={1}>
        <ReactSvg width={50} />
      </Box>
      <Box>
        <PostHeader title={props.title} tagArray={props.tagArray} />
        <PostFooter name={props.name} date={props.date} />
      </Box>
    </StyledMaxWidthdiv>
  );
};
