import React from "react";
import PhpSvg from "../../../assets/logo//logo/php.svg";

type Props = {
  width: number;
  height: number;
};

export const IconPhp: React.FC<Props> = (props) => {
  return <PhpSvg width={props.width} height={props.height} />;
};
