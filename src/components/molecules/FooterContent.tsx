import { Heading3 } from '@/components/atoms/Heading3';
import { List } from '@/components/atoms/List';
import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  listArray: { id: string; href: string; value: string }[];
  color?: string;
}

const StyledNav = styled.nav`
  margin-bottom: 24px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0;
  }
`;

export const FooterContent: React.FC<Props> = props => {
  return (
    <StyledNav>
      <Heading3
        fontSize={16}
        marginBottom={1}
        color={theme.palette.primary.dark}
      >
        {props.text}
      </Heading3>
      <List fontSize={14} listArray={props.listArray} />
    </StyledNav>
  );
};
