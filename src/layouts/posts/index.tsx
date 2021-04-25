import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { ThePostsHeader } from "@/components/common/header/posts";
import { Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { ReactNode } from "react";
// import { RecoilRoot } from "recoil";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
};

const StyleBoxMain = styled(Box)`
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
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};

export default LayoutPosts;
