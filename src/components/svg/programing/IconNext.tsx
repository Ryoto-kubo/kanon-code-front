import React from "react";
import NextSvg from "../../../assets/logo/next.svg";

type Props = {
  width: number;
  height: number;
};

export const IconNext: React.FC<Props> = (props) => {
  return <NextSvg width={props.width} height={props.height} />;
};
