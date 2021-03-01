import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheStndardHeader } from "@/components/common/header/standard";
import { useRequireLogin } from "@/hooks/useRequireLogin";
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

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const user = useRequireLogin();
  console.log(user);

  return (
    <>
      <CommonHead title={title} />
      {user && <span>サインインしています</span>}
      {user === null && <TheStndardHeader />}
      <Toolbar />
      <StyledMain>{children}</StyledMain>
      <TheFooter />
    </>
  );
};

export default Layout;
