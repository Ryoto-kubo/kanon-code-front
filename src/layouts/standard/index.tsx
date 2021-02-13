import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheStndardHeader } from "@/components/common/header/standard/index";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <CommonHead title={title} />
    <TheStndardHeader />
    <main>{children}</main>
    <TheFooter />
  </div>
);

export default Layout;
