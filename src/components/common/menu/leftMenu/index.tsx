import { menus } from '@/consts/dashboard-menus';
import theme from '@/styles/theme';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import './style.scss';

const StyledBox = styled(Box)`
  border-radius: 50px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
  transition: 0.3s all;
  align-items: center;
`;
const StyledAnchor = styled(`a`)`
  // color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const LeftMenu: React.FC = () => {
  const pathName = location.pathname;
  return (
    <Box>
      {menus.map((el, index) => (
        <Link key={index} href={el.href} passHref>
          <StyledAnchor>
            <StyledBox
              className={el.href === pathName ? 'selected' : 'non-selected'}
            >
              <Box mr={1} height={24}>
                {el.icon}
              </Box>
              {el.name}
            </StyledBox>
          </StyledAnchor>
        </Link>
      ))}
    </Box>
  );
};
