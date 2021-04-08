import { CommonHead } from "@/components/common/head/index";
import { ThePostsHeader } from "@/components/common/header/posts";
import { Toolbar } from "@material-ui/core";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
};

const StyledMain = styled.main`
  background: #ffffff;
`;

const LayoutPosts = ({
  children,
  title = "This is the default title",
}: Props) => {
  return (
    <>
      <CommonHead title={title} />
      <ThePostsHeader />
      <Toolbar />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default LayoutPosts;
