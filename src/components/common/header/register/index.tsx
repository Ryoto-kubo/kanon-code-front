import { LinkWrapper } from '@/components/atoms/Link';
import { KanonCodeLogo } from '@/components/atoms/Logo';
import { SolidLink } from '@/components/atoms/SolidLink';
import { StandardAppBar } from '@/components/atoms/StandardAppBar';
import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  ${props => props.theme.breakpoints.up('sm')} {
    padding: 0 24px;
  }
`;

export const TheRegisterHeader: React.FC = () => {
  return (
    <StandardAppBar>
      <StyledBox
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <LinkWrapper href='/'>
          <KanonCodeLogo />
        </LinkWrapper>
        <Box display='flex' alignItems='center'>
          <SolidLink href='/register' borderRadius={4}>
            名前を決める
          </SolidLink>
        </Box>
      </StyledBox>
    </StandardAppBar>
  );
};
