import theme from '@/styles/theme'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface Props {
  href: string
}

const StyledSolidLink = styled.a`
  color: #ffffff;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
  display: inline-block;
  padding: 5px 0;
  border-radius: 4px;
  text-decoration: none;
  display: inlne-block;
  background: ${theme.palette.primary.main};
  ${(props) => props.theme.breakpoints.up('sm')} {
    min-width: 140px;
  }
  &:hover {
    cursor: pointer;
  }
`
export const SolidLink: React.FC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <StyledSolidLink>{props.children}</StyledSolidLink>
    </Link>
  )
}
