import { UserType } from "@/@types/index.ts";
import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { ThePostsHeader } from "@/components/common/header/posts";
import { Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
  currentUser: null | UserType;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const LayoutPost = ({ children, title, currentUser }: Props) => {
  const router = useRouter();
  if (currentUser === null) {
    router.push("/");
    return null;
  }

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

export default LayoutPost;
