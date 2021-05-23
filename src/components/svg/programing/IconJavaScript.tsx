import React from "react";
import JavaScriptSvg from "../../../assets/logo/javascript.svg";

type Props = {
  width: number;
  height: number;
};

export const IconJavaScript: React.FC<Props> = (props) => {
  return <JavaScriptSvg width={props.width} height={props.height} />;
};
