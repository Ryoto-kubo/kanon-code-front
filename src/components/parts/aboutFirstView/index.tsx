import { IconCakePhp } from '@/components/svg/programing/IconCakePhp';
import { IconVue } from '@/components/svg/programing/IconVue';
import Box from '@material-ui/core/Box';
import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  width: number;
  height: number;
};

type AnimationProps = {
  delay: number;
};

const lotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const StyledBoxAnimationWrapper = styled(Box)<Pick<AnimationProps, 'delay'>>`
  animation: ${lotate} 3s linear infinite;
  display: inline-block;
  animation-delay: ${({ delay }) => delay}s;
`;

export const AboutFirstView: React.FC<Props> = props => {
  return (
    <Box>
      <StyledBoxAnimationWrapper delay={0.2}>
        <IconCakePhp width={props.width} height={props.height} />
      </StyledBoxAnimationWrapper>
      <StyledBoxAnimationWrapper delay={1}>
        <IconVue width={props.width} height={props.height} />
      </StyledBoxAnimationWrapper>
    </Box>
  );
};
