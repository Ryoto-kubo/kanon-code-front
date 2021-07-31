import { SolidLink } from '@/components/atoms/SolidLink';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import React from 'react';
import styled from 'styled-components';
import SecuritySvg from '../../../assets/illustration/security.svg';

const StyledSecuritySvg = styled(SecuritySvg)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 350px;
  }
`;
const StyledBox = styled(Box)`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NotAuth403View = () => {
  return (
    <Fade in>
      <StyledBox>
        <Box>
          <StyledSecuritySvg />
        </Box>
        <Box component='p' fontSize={80} fontWeight='bold'>
          403
        </Box>
        <Box mb={3}>この操作は許可されていません。</Box>
        <SolidLink href='/' borderRadius={4}>
          トップに戻る
        </SolidLink>
      </StyledBox>
    </Fade>
  );
};
