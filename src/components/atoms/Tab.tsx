import Tab from '@material-ui/core/Tab'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

type Props = {
  label: string
  href: string
  value: string
  onChange?: (event: React.ChangeEvent<{ checked: boolean }>, value: any) => void;
  onClick?: React.EventHandler<any>;        
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
  <Link href={props.href}>
    <Tab
      // onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      //   event.preventDefault()
      // }}

      disableRipple={true}
      {...props}
    />
    </Link>
  )
}

export const CustomTab: React.FC<Props> = (props) => {
  return <StyledTab label={props.label} value={props.value} href={props.href} />
}
