import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};
const StyledContainer = styled('div')`
  border: 1px solid #dfe0e0;
  border-radius: 8px;
  padding-top: 24px;
  margin-bottom: 48px;
  overflow: hidden;
`;

export const ContentWrapper: React.FC<Props> = props => {
  return <StyledContainer>{props.children}</StyledContainer>;
};
