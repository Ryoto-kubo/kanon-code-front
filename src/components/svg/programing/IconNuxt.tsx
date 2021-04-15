import React from "react";
import NuxtSvg from "../../../assets/logo//logo/nuxt.svg";

type Props = {
  width: number;
  height: number;
};

export const IconNuxt: React.FC<Props> = (props) => {
  return <NuxtSvg width={props.width} height={props.height} />;
};
