import { ButtonBase, Grid } from '@material-ui/core/';
import { alpha } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledGridCenter = styled(Grid)`
  text-align: center;
`;
const StyledButton = styled(ButtonBase)`
  padding: 16px;
  width: 100%;
  display: block;
  border-radius: 4px;
  &:hover {
    background: #ffffff;
    box-shadow: 0 3px 6px #707070;
  }
`;
const StyledCircle = styled.div`
  border-radius: 50px;
  background: ${alpha('#f5f5f5', 0.7)};
  width: 80px;
  height: 80px;
  display: inline-block;
  position: relative;
  transition: all 0.3s;
`;
const StyledAbsolute = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
`;

export const CircleGrid: React.FC<Props> = props => {
  return (
    <StyledGridCenter item xs={6} sm={3} md={2}>
      <StyledButton onClick={props.onClick}>
        <StyledCircle>
          <StyledAbsolute>{props.children}</StyledAbsolute>
        </StyledCircle>
        <p>{props.text}</p>
      </StyledButton>
    </StyledGridCenter>
  );
};
