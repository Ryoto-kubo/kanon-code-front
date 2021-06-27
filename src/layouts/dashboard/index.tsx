import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { TheLoggedHeader } from '@/components/common/header/logged'
import { LeftMenu } from '@/components/common/menu/leftMenu'
import { MobileMenu } from '@/components/common/menu/mobileMenu'
import { UserTypes } from '@/types/global'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  title: string
  currentUser: null | UserTypes
}

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`
const StyleBoxLeftMenuWrapper = styled(Box)`
  display: none;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: block;
    margin-right: 32px;
    min-width: 210px;
  }
`
const StyleBoxMobileMenuWrapper = styled(Box)`
  display: block;
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: none;
  }
`
const StyleBoxContentWrapper = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-top: 40px;
    display: flex;
  }
`

export const LayoutDashboard = ({ children, title, currentUser }: Props) => {
  return (
    <>
      <CommonHead title={title} />
      <TheLoggedHeader currentUser={currentUser} />
      <StyleBoxMain mt={4} component="main">
        <Container>
          <StyleBoxContentWrapper>
            <StyleBoxLeftMenuWrapper>
              <LeftMenu />
            </StyleBoxLeftMenuWrapper>
            <StyleBoxMobileMenuWrapper>
              <MobileMenu />
            </StyleBoxMobileMenuWrapper>
            {children}
          </StyleBoxContentWrapper>
        </Container>
      </StyleBoxMain>
      <TheFooter />
    </>
  )
}
