import { SolidLink } from '@/components/atoms/SolidLink'
import { CustomWhiteOutButton } from '@/components/atoms/WhiteOutButton'
import { Box } from '@material-ui/core/'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 255px;
  margin: auto;
  ${(props) => props.theme.breakpoints.up('sm')} {
    max-width: 300px;
  }
`

export const FirstViewButtons: React.FC = () => {
  return (
    <StyledBox>
      <SolidLink href="/signin">サインイン</SolidLink>
      <CustomWhiteOutButton
        onClick={() => Router.push('/about')}
        sizing="small"
      >
        Kanon Codeとは
      </CustomWhiteOutButton>
    </StyledBox>
  )
}
