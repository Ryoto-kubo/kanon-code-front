import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
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

const LayoutRegister = ({ children, title }: Props) => {
  return (
    <>
      <CommonHead title={title} />
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};

export default LayoutRegister;
