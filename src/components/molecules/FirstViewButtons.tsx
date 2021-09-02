import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { WhiteOutLink } from '@/components/atoms/WhiteOutLink';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 260px;
  margin: auto;
  ${props => props.theme.breakpoints.up('sm')} {
    min-width: 300px;
  }
`;

export const FirstViewButtons: React.FC = () => {
  const { setIsOpenSignin } = useIsOpenSignin();

  return (
    <StyledBox>
      <CustomSolidButton sizing='small' onClick={() => setIsOpenSignin(true)}>
        サインイン
      </CustomSolidButton>
      <WhiteOutLink href='/about'>Kanon Codeとは</WhiteOutLink>
    </StyledBox>
  );
};
