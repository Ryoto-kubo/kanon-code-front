import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheLoggedHeader } from "@/components/common/header/logged";
import { TheStndardHeader } from "@/components/common/header/standard";
import { Toolbar } from "@material-ui/core";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
  authUser: any;
};

const StyledMain = styled.main`
  background: #ffffff;
`;

const Layout = ({
  children,
  title = "This is the default title",
  authUser,
}: Props) => {
  // console.log(authUser, "authUser");
  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledMain>{children}</StyledMain>
      <TheFooter />
    </>
  );
};

export default Layout;
