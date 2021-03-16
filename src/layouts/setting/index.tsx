import { Heading2 } from '@/components/atoms/Heading2'
import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { TheLoggedHeader } from '@/components/common/header/logged'
import { TheStndardHeader } from '@/components/common/header/standard'
import { Toolbar } from '@material-ui/core'
import { Container } from '@material-ui/core/'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  title: string
  authUser: any
}
type LinkTabProps = {
  label?: string
  href?: string
  value: string
}

const StyledMain = styled.main`
  background: #ffffff;
`
const StyledContainer = styled(Container)`
  width: 100%;
  margin-top: 70px;
`
const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #e8e8e8;
`
const StyledTab = styled(LinkTab)`
  min-width: 130px;
  font-size: 16px;
  // font-weight: bold;
`
function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}
function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

export const SettingLayout = ({
  children,
  title = 'This is the default title',
  authUser,
}: Props) => {
  const router = useRouter()
  const [value, setValue] = useState(router.pathname)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log(event)

    setValue(newValue)
    if (newValue === '/settings/profile') {
      router.push('/settings/profile')
    } else if (newValue === '/settings/account') {
      router.push('/settings/account')
    }
  }

  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer maxWidth="md">
        <StyledMain>
          <Heading2 fontSize={24} marginBottom={1}>
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
              {...a11yProps(0)}
            />
            <StyledTab
              label="アカウント"
              value="/settings/account"
              href="/settings/account"
              {...a11yProps(1)}
            />
            <StyledTab
              label="カード情報"
              value="/settings/card"
              href="/settings/card"
              {...a11yProps(2)}
            />
            <StyledTab
              label="購入履歴"
              value="/settings/payments-history"
              href="/settings/payments-history"
              {...a11yProps(3)}
            />
            <StyledTab
              label="お振込先"
              value="/settings/bank"
              href="/settings/bank"
              // {...a11yProps(4)}
            />
          </StyledTabs>

          {children}
        </StyledMain>
      </StyledContainer>
      <TheFooter />
    </>
  )
}
