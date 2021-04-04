import React from "react";
import VueSvg from "../../assets/logo/vue.svg";

type Props = {
  width: number;
  height: number;
};

export const IconVue: React.FC<Props> = (props) => {
  return <VueSvg width={props.width} height={props.height} />;
};
