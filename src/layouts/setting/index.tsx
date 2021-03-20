import { Heading2 } from '@/components/atoms/Heading2'
import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { TheLoggedHeader } from '@/components/common/header/logged'
import { TheStndardHeader } from '@/components/common/header/standard'
import { TabsHeader } from '@/components/organisms/TabsHeader'
import { Toolbar } from '@material-ui/core'
import { Container } from '@material-ui/core/'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  title: string
  authUser: any
}

const StyledMain = styled.main`
  background: #ffffff;
`
const StyledContainer = styled(Container)`
  width: 100%;
  margin-top: 70px;
  max-width: 720px;
`
export const SettingLayout = ({
  children,
  title = 'This is the default title',
  authUser,
}: Props) => {
  const router = useRouter()
  const [value] = useState(router.pathname)
  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer>
        <StyledMain>
          <Heading2 fontSize={24} marginBottom={1}>
            アカウント設定
          </Heading2>
          <TabsHeader value={value} />
          {children}
        </StyledMain>
      </StyledContainer>
      <TheFooter />
    </>
  )
}
