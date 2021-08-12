import theme from '@/styles/theme';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  fontSize: number;
  listArray: { id: string; href: string; value: string }[];
  color?: string;
}

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;
const StyledList = styled.li<Pick<Props, 'color'>>`
  font-size: 14px;
  list-style: none;
  margin-bottom: 8px;
`;
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
  text-decoration: none;
`;

export const List: React.FC<Props> = props => {
  return (
    <StyledUl>
      {props.listArray.map(el => (
        <StyledList key={el.id}>
          <Link href={el.href} passHref>
            <StyledAnchor target='_brank' rel='noopener'>
              {el.value}
            </StyledAnchor>
          </Link>
        </StyledList>
      ))}
    </StyledUl>
  );
};
