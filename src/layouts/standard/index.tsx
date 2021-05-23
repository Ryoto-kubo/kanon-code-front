import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheLoggedHeader } from "@/components/common/header/logged";
import { TheStndardHeader } from "@/components/common/header/standard";
import { UserType } from "@/consts/type";
import { Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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

const Layout = ({ children, title, currentUser }: Props) => {
  return (
    <>
      <CommonHead title={title} />
      {currentUser && <TheLoggedHeader currentUser={currentUser} />}
      {!currentUser && <TheStndardHeader />}
      <Toolbar />
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};

export default Layout;
