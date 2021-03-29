import React from "react";
import RubySvg from "../../assets/logo/ruby.svg";

type Props = {
  width: number;
  height: number;
};

export const IconRuby: React.FC<Props> = (props) => {
  return <RubySvg width={props.width} height={props.height} />;
};
