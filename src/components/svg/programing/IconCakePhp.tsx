import React from "react";
import CakePhpSvg from "../../../assets/logo/cakephp.svg";

type Props = {
  width: number;
  height: number;
};

export const IconCakePhp: React.FC<Props> = (props) => {
  return <CakePhpSvg width={props.width} height={props.height} />;
};
