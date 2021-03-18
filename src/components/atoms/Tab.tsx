import Tab from '@material-ui/core/Tab'
import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  href: string
  value: string
}
type LinkTabProps = {
  label?: string
  href?: string
  value: string
}

const StyledTab = styled(LinkTab)`
  min-width: 130px;
  font-size: 16px;
`

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      disableRipple={true}
      {...props}
    />
  )
}

export const CustomTab: React.FC<Props> = (props) => {
  return <StyledTab label={props.label} value={props.value} href={props.href} />
}
