import React from "react";
import NodeSvg from "../../../assets/logo/nodejs-icon.svg";

type Props = {
  width: number;
  height: number;
};

export const IconNode: React.FC<Props> = (props) => {
  return <NodeSvg width={props.width} height={props.height} />;
};
