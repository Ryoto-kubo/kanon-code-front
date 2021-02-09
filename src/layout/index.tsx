import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheHeader } from "@/components/common/header/index";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <CommonHead title={title} />
    <TheHeader />
    <main>{children}</main>
    <TheFooter />
  </div>
);

export default Layout;
