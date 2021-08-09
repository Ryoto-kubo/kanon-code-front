import React from 'react';
import styled from 'styled-components';
import Review from '../../../assets/illustration/review.svg';

const StyledReview = styled(Review)`
  width: 100%;
`;

export const ReviewIllustration = () => {
  return <StyledReview />;
};
