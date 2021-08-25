import { CustomAppBar } from '@/components/atoms/AppBar';
import { KanonCodeLogo } from '@/components/atoms/Logo';
import { SolidLink } from '@/components/atoms/SolidLink';
import { Box } from '@material-ui/core/';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  height: 31px;
  ${props => props.theme.breakpoints.up('sm')} {
    padding: 0 24px;
  }
`;

export const TheNoStickyHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <StyledBox
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Link href='/'>
          <a>
            <KanonCodeLogo />
          </a>
        </Link>
        <SolidLink href='/signin' borderRadius={4}>
          サインイン
        </SolidLink>
      </StyledBox>
    </CustomAppBar>
  );
};
