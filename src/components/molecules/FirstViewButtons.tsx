import { SolidLink } from '@/components/atoms/SolidLink'
import { WhiteOutLink } from '@/components/atoms/WhiteOutLink'
import { Box } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 260px;
  margin: auto;
  ${(props) => props.theme.breakpoints.up('sm')} {
    min-width: 300px;
  }
`

export const FirstViewButtons: React.FC = () => {
  return (
    <StyledBox>
      <SolidLink href="/signin">サインイン</SolidLink>
      <WhiteOutLink href="/about">Kanon Codeとは</WhiteOutLink>
    </StyledBox>
  )
}
