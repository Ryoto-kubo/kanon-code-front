import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react';

type Props = {
  fontSize: 'small' | 'inherit' | 'default' | 'medium' | 'large' | undefined;
  color:
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'primary'
    | 'secondary'
    | 'error'
    | undefined;
};

export const IconArrowBack: React.FC<Props> = props => {
  return <ArrowBackIosIcon fontSize={props.fontSize} color={props.color} />;
};
