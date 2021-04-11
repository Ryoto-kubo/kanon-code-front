// import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from "@/components/common/head/index";
import { TheNoStickyHeader } from "@/components/common/header/no-sticky";
import Box from "@material-ui/core/Box";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
};

const StyledMain = styled(Box)`
  background: #ffffff;
  // padding-bottom: 572px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding-bottom: 0px;
  }
`;

export const LayoutNoFooter = ({
  children,
  title = "This is the default title",
}: Props) => (
  <>
    <CommonHead title={title} />
    <TheNoStickyHeader />
    <StyledMain mt={4} component="main">
      {children}
    </StyledMain>
  </>
);
