import React from 'react';
import FlutterSvg from '../../../assets/logo/flutter.svg';

type Props = {
  width: number;
  height: number;
};

export const IconFlutter: React.FC<Props> = props => {
  return <FlutterSvg width={props.width} height={props.height} />;
};
