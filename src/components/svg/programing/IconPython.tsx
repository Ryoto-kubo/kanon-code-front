import React from 'react';
import PythonSvg from '../../../assets/logo/python.svg';

type Props = {
  width: number;
  height: number;
};

export const IconPython: React.FC<Props> = props => {
  return <PythonSvg width={props.width} height={props.height} />;
};
