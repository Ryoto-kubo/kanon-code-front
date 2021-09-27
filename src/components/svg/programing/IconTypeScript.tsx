import React from 'react';
import TypeScriptSvg from '../../../assets/logo/typescript.svg';

type Props = {
  width: number;
  height: number;
};

export const IconTypeScript: React.FC<Props> = props => {
  return <TypeScriptSvg width={props.width} height={props.height} />;
};
