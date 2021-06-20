import { menus } from '@/consts/dashboard-menus'
import Box from '@material-ui/core/Box'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import './style.scss'

const StyledBox = styled(Box)`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
`
const StyledAnchor = styled(`a`)`
  margin-right: 8px;
  font-size: 12px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`
const StyledBoxMenuWrapper = styled(Box)`
  border-radius: 4px;
  text-align: center;
  padding: 10px 0px;
  transition: 0.3s all;
  width: 80px;
  height: 80px;
  position: relative;
`
const StyledBoxAbslute = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const MobileMenu: React.FC = () => {
  const pathName = location.pathname
  return (
    <StyledBox>
      {menus.map((el, index) => (
        <Link key={index} href={el.href} passHref>
          <StyledAnchor>
            <StyledBoxMenuWrapper
              className={el.href === pathName ? 'selected' : 'non-selected'}
            >
              <StyledBoxAbslute>
                <Box height={24}>{el.icon}</Box>
                {el.name}
              </StyledBoxAbslute>
            </StyledBoxMenuWrapper>
          </StyledAnchor>
        </Link>
      ))}
    </StyledBox>
  )
}
