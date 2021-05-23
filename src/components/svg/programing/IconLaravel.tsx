import React from "react";
import LaravelSvg from "../../../assets/logo/laravel.svg";

type Props = {
  width: number;
  height: number;
};

export const IconLaravel: React.FC<Props> = (props) => {
  return <LaravelSvg width={props.width} height={props.height} />;
};
