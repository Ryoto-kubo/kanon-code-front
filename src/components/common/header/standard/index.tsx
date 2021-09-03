import { LinkWrapper } from '@/components/atoms/Link';
import { KanonCodeLogo } from '@/components/atoms/Logo';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { StandardAppBar } from '@/components/atoms/StandardAppBar';
// import { SearchLink } from '@/components/molecules/SearchLink';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
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
// const StyledUseMr = styled.span`
//   margin-right: 24px;
//   display: inherit;
// `;

export const TheStndardHeader: React.FC = () => {
  const { setIsOpenSignin } = useIsOpenSignin();

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
          {/* <StyledUseMr>
            <SearchLink />
          </StyledUseMr> */}
          <CustomSolidButton
            sizing='small'
            onClick={() => setIsOpenSignin(true)}
          >
            サインイン
          </CustomSolidButton>
        </Box>
      </StyledBox>
    </StandardAppBar>
  );
};
