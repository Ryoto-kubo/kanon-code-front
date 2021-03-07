import { FooterContents } from '@/components/organisms/FooterContents'
import theme from '@/styles/theme'
import { Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding-top: 24px;
  background: rgba(92, 107, 192, 0.1);
  color: ${theme.palette.primary.main};
`
const StyledWrapper = styled(Container)`
  max-width: 1280px;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
`
const StyledSmall = styled.small`
  padding: 8px 0;
  font-size: 13px;
  text-align: center;
  width: 100%;
  display: inline-block;
  color: #ffffff;
  background: ${theme.palette.primary.main};
`

export const TheFooter: React.FC = () => {
  return (
    <StyledFooter>
      <StyledWrapper>
        <FooterContents />
      </StyledWrapper>
      <StyledSmall>
        Copyright © 2021 KanonCode, Inc. All Rights Reserved.
      </StyledSmall>
    </StyledFooter>
  )
}
