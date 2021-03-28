import { Heading2 } from '@/components/atoms/Heading2'
import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { TheLoggedHeader } from '@/components/common/header/logged'
import { TheStndardHeader } from '@/components/common/header/standard'
import { TabsHeader } from '@/components/organisms/TabsHeader'
import { settingTabs } from '@/consts/setting-tabs'
import { Toolbar } from '@material-ui/core'
import { Container } from '@material-ui/core/'
import Box from '@material-ui/core/Box'
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
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    event.preventDefault()
    router.push(newValue)
  }

  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer>
        <StyledMain>
          <Heading2 fontSize={20} marginBottom={1}>
            アカウント設定
          </Heading2>
          <Box mb={3}>
            <TabsHeader
              value={value}
              onChange={changeTab}
              tabLists={settingTabs}
            />
          </Box>
          {children}
        </StyledMain>
      </StyledContainer>
      <TheFooter />
    </>
  )
}
