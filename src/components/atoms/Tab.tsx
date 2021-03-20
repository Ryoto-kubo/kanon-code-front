import Tab from '@material-ui/core/Tab'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

type Props = {
  label: string
  href: string
  value: string
}

const StyledTab = styled(Tab)`
  min-width: 130px;
  font-size: 16px;
`

export const CustomTab: React.FC<Props> = (props) => {
    return (
   <Link href={props.href}>   
    <StyledTab
    disableRipple={true}
     {...props}
  />
    </Link> 
    ) 
  }
  