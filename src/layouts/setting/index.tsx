// import { Heading2 } from '@/components/atoms/Heading2'
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
`
export const SettingLayout = ({
  children,
  title = 'This is the default title',
  authUser,
}: Props) => {
  const router = useRouter()
  const [value, setValue] = useState(router.pathname)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log(event)
    console.log(newValue)
    setValue(newValue)
    router.push(newValue)
  }

  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer maxWidth="md">
        <StyledMain>
          <TabsHeader
            value={value}
            handleChange={handleChange}
            text="アカウント設定"
          />

          {/* <Heading2 fontSize={24} marginBottom={1}>
            アカウント設定
          </Heading2>
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <StyledTab
              label="プロフィール"
              value="/settings/profile"
              href="/settings/profile"
            />
            <StyledTab
              label="アカウント"
              value="/settings/account"
              href="/settings/account"
            />
            <StyledTab
              label="カード情報"
              value="/settings/billing"
              href="/settings/billing"
            />
            <StyledTab
              label="購入履歴"
              value="/settings/payments-history"
              href="/settings/payments-history"
            />
            <StyledTab
              label="お振込先"
              value="/settings/bank"
              href="/settings/bank"
            />
          </StyledTabs> */}

          {children}
        </StyledMain>
      </StyledContainer>
      <TheFooter />
    </>
  )
}
