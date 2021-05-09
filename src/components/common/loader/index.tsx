import React from "react";
import Loader from "react-loader-spinner";

export const CustomLoader: React.FC = () => {
  return <Loader type="TailSpin" color="#5C6BC0" height={60} width={60} />;
};
