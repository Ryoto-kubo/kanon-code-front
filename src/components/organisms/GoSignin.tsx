import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import KanonCodeSvg from '../../assets/logo/kanon-code.svg';

const StyledBoxWapper = styled(Box)`
  text-align: center;
`;
const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 24px;
  line-height: 1.7;
  text-align: center;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 40px;
  }
`;
const StyledLogo = styled(KanonCodeSvg)`
  width: 80%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 500px;
  }
`;

export const GoSignin: React.FC = () => {
  const { setIsOpenSignin } = useIsOpenSignin();

  return (
    <StyledBoxWapper>
      <StyledBoxPageTitle component='h2'>
        さぁ、Kanon Codeへ。
      </StyledBoxPageTitle>
      <Box mb={3}>
        <StyledLogo />
      </Box>
      <CustomSolidButton sizing='small' onClick={() => setIsOpenSignin(true)}>
        サインイン
      </CustomSolidButton>
    </StyledBoxWapper>
  );
};
