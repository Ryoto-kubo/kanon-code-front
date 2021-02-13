import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheStndardHeader } from "@/components/common/header/standard/index";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
};
const StyledMain = styled.main`
  margin-top: 40px;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <>
    <CommonHead title={title} />
    <TheStndardHeader />
    <StyledMain>{children}</StyledMain>
    <TheFooter />
  </>
);

export default Layout;
