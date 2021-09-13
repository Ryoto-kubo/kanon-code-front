import theme from '@/styles/theme';
import { Box } from '@material-ui/core/';
import { alpha } from '@material-ui/core/styles';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import React from 'react';
import styled from 'styled-components';

type Props = {
  budget: number | undefined;
};

const StyledBoxBudget = styled(Box)`
  color: ${theme.palette.primary.main};
  background: ${alpha(theme.palette.primary.main, 0.1)};
  border-radius: 4px 0 4px 0;
  padding: 2px 5px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const Budget: React.FC<Props> = props => {
  return (
    <StyledBoxBudget>
      <MonetizationOnOutlinedIcon style={{ fontSize: 17 }} />
      <Box ml={0.5}>{props.budget ? `~¥${props.budget}` : '予算未設定'}</Box>
    </StyledBoxBudget>
  );
};
