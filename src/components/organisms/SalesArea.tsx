import theme from '@/styles/theme';
import Box from '@material-ui/core/Box';
import React from 'react';
import styled from 'styled-components';

type Props = {
  totalSales: number;
  currentTotalSales: number;
};

const StyledBoxFlex = styled(Box)`
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxPriceWrapper = styled(Box)`
  border-radius: 4px;
  background: rgba(92, 107, 192, 0.05);
  padding: 12px;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  ${props => props.theme.breakpoints.up('sm')} {
    width: calc((100% - 20px) / 2);
  }
`;
const StyledBoxPrice = styled(Box)`
  color: ${theme.palette.primary.main};
  font-weight: bold;
  font-size: 24px;
`;

export const SalesArea: React.FC<Props> = props => {
  return (
    <StyledBoxFlex>
      <StyledBoxPriceWrapper>
        <Box>売上総額</Box>
        <StyledBoxPrice>¥{props.totalSales}</StyledBoxPrice>
      </StyledBoxPriceWrapper>
      <StyledBoxPriceWrapper>
        <Box>今月の売り上げ</Box>
        <StyledBoxPrice>¥{props.currentTotalSales}</StyledBoxPrice>
      </StyledBoxPriceWrapper>
    </StyledBoxFlex>
  );
};
