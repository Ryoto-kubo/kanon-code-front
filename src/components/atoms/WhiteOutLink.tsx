import theme from '@/styles/theme'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface Props {
  href: string
}

const StyledLink = styled.a`
  color: ${theme.palette.primary.main};
  border: 1px solid ${theme.palette.primary.main};
  font-weight: bold;
  min-width: 130px;
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  border-radius: 4px;
  text-decoration: none;
  display: inlne-block;
  background: #ffffff;
  ${(props) => props.theme.breakpoints.up('sm')} {
    min-width: 140px;
  }
  &:hover {
    cursor: pointer;
  }
`
export const WhiteOutLink: React.FC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <StyledLink>{props.children}</StyledLink>
    </Link>
  )
}
