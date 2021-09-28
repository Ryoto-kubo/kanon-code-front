import React from 'react';
import HtmlSvg from '../../../assets/logo/html5.svg';

type Props = {
  width: number;
  height: number;
};

export const IconHtml: React.FC<Props> = props => {
  return <HtmlSvg width={props.width} height={props.height} />;
};
