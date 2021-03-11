import { CustomAppBar } from "@/components/atoms/AppBar";
import React from "react";

interface Props {
  children: React.ReactElement;
}

export default {
  title: "CustomAppBar",
};

export const ShowCustomAppBar: React.FC<Props> = (props) => (
  <CustomAppBar>{props.children}</CustomAppBar>
);
