import React from 'react';
import GoSvg from '../../../assets/logo/go.svg';

type Props = {
  width: number;
  height: number;
};

export const IconGo: React.FC<Props> = props => {
  return <GoSvg width={props.width} height={props.height} />;
};
