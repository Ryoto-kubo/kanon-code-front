import Tab from '@material-ui/core/Tab'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  href: string
  value: string
}
type LinkTabProps = {
  href: string
  label?: string
  value: string
}

const StyledTab = styled(LinkTab)`
  min-width: 100px;
  font-size: 15px;
  font-weight: bold;
  color: #707070;
  &:hover {
    color: #202020;
  }
`

function LinkTab(props: LinkTabProps) {
  return (
    <Link href={props.href}>
      <Tab disableRipple={true} {...props} />
    </Link>
  )
}

export const CustomTab: React.FC<Props> = (props) => {
  return <StyledTab label={props.label} value={props.value} href={props.href} />
}
