import React from "react";
import ReactSvg from "../../../assets/logo/react.svg";

type Props = {
  width: number;
  height: number;
};

export const IconReact: React.FC<Props> = (props) => {
  return <ReactSvg width={props.width} height={props.height} />;
};
