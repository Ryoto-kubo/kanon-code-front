import { CommonHead } from "@/components/common/head/index";
import { Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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

const LayoutRegister = ({
  children,
  title = "This is the default title",
}: // authUser,
Props) => {
  return (
    <>
      <CommonHead title={title} />
      <Toolbar />
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
    </>
  );
};

export default LayoutRegister;
