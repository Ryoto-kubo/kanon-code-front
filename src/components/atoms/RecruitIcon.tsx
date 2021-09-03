import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

const StyledBoxWrapper = styled(Box)`
  border-radius: 4px;
  border: 1px solid #0095a8;
  color: #0095a8;
  font-size: 10px;
  font-weight: bold;
  padding: 3px 8px;
`;

export const RecruitIcon: React.FC = () => {
  return <StyledBoxWrapper component='span'>レビュー募集中</StyledBoxWrapper>;
};
