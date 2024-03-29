import React from 'react';
import styled from 'styled-components';
import SendSvg from '../../../assets/illustration/send.svg';

const StyledSendSvg = styled(SendSvg)`
  width: 90%;
`;

export const SendIllustration = () => {
  return <StyledSendSvg />;
};
