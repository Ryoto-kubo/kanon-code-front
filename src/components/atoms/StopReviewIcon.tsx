import theme from '@/styles/theme';
import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

const StyledBoxWrapper = styled(Box)`
  border-radius: 4px;
  border: 1px solid ${theme.palette.error.main};
  color: ${theme.palette.error.main};
  font-size: 10px;
  font-weight: bold;
  padding: 3px 8px;
`;

export const StopReviewIcon: React.FC = () => {
  return (
    <StyledBoxWrapper component='span'>レビュー依頼停止中</StyledBoxWrapper>
  );
};
