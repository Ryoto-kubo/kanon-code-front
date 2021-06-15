import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
// import { Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
  authUser?: any;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const LayoutRegister = ({ children, title, authUser }: Props) => {
  const router = useRouter();
  if (authUser === null) {
    router.push("/");
    return null;
  }

  return (
    <>
      <CommonHead title={title} />
      {/* <Toolbar /> */}
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};

export default LayoutRegister;
