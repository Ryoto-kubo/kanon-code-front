import { Heading2 } from '@/components/atoms/Heading2'
import { Tabs } from '@/components/molecules/Tabs'
// import Tab from '@material-ui/core/Tab'
// import Tabs from '@material-ui/core/Tabs'
import React from 'react'

type Props = {
  text: string
  value: string | number
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void
}
// type LinkTabProps = {
//   label?: string
//   href?: string
//   value: string
// }

// const StyledTabs = styled(Tabs)`
//   border-bottom: 1px solid #e8e8e8;
// `
// const StyledTab = styled(LinkTab)`
//   min-width: 130px;
//   font-size: 16px;
//   // font-weight: bold;
// `
// function LinkTab(props: LinkTabProps) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//         event.preventDefault()
//       }}
//       disableRipple={true}
//       {...props}
//     />
//   )
// }

export const TabsHeader: React.FC<Props> = (props) => {
  return (
    <>
      <Heading2 fontSize={24} marginBottom={1}>
        {props.text}
      </Heading2>
      <Tabs value={props.value} handleChange={props.handleChange} />
      {/* <StyledTabs
        value={props.value}
        onChange={props.handleChange}
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
    </>
  )
}
