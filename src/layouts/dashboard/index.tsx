import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { TheLoggedHeader } from '@/components/common/header/logged'
import { LeftMenu } from '@/components/common/menu/leftMenu'
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
const StyleBoxContentWrapper = styled(Box)`
  display: flex;
`

export const LayoutDashboard = ({ children, title, currentUser }: Props) => {
  return (
    <>
      <CommonHead title={title} />
      <TheLoggedHeader currentUser={currentUser} />
      <StyleBoxMain mt={4} component="main">
        <Container>
          <StyleBoxContentWrapper>
            <LeftMenu />
            {children}
          </StyleBoxContentWrapper>
        </Container>
      </StyleBoxMain>
      <TheFooter />
    </>
  )
}
