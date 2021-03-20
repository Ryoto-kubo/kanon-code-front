import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string | number
  tabs: Array<{ label: string; value: string; href: string }>
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void
}
type LinkTabProps = {
  label?: string
  href?: string
  value: string
}

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #e8e8e8;
`
const StyledTab = styled(Tab)`
  min-width: 130px;
  font-size: 16px;
`

const LinkTab = (props: LinkTabProps) => {
  return (
    <StyledTab
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      disableRipple={true}
      {...props}
    />
  )
}

export const TabsHeader: React.FC<Props> = (props) => {
  const renderTab = () => {
    const results = []
    for (const [index, item] of props.tabs.entries()) {
      results.push(
        <LinkTab
          key={index}
          label={item.label}
          value={item.value}
          href={item.href}
        />,
      )
    }
    return results
  }

  return (
    <StyledTabs
      value={props.value}
      onChange={props.handleChange}
      indicatorColor="primary"
      textColor="primary"
    >
      {renderTab()}
    </StyledTabs>
  )
}
