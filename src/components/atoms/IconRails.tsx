import React from "react";
import RailsSvg from "../../assets/logo/rails.svg";

type Props = {
  width: number;
  height: number;
};

export const IconRails: React.FC<Props> = (props) => {
  return <RailsSvg width={props.width} height={props.height} />;
};
