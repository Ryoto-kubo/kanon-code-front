import theme from '@/styles/theme';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactElement;
}

const StyledAppBar = styled(AppBar)`
  background-color: ${theme.palette.primary.contrastText};
  padding: 8px 0;
`;

export const CustomAppBar: React.FC<Props> = props => {
  return (
    <StyledAppBar elevation={0} position='static'>
      {props.children}
    </StyledAppBar>
  );
};
