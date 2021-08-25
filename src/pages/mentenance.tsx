import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import KanonCodeLogoSvg from '../assets/logo/kanon-code.svg';

const StyledKanonCodeLogo = styled(KanonCodeLogoSvg)`
  width: 250px;
`;
const StyledBoxAbsolute = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MentenanceView: React.FC = () => {
  return (
    <Box>
      <StyledBoxAbsolute>
        <StyledKanonCodeLogo />
        <Box mt={1} textAlign='center'>
          現在メンテナンス中です
        </Box>
      </StyledBoxAbsolute>
    </Box>
  );
};
