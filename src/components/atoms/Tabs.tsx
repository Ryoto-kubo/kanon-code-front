import Tabs from '@material-ui/core/Tabs'
import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string | number
}

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #e8e8e8;
  margin-top: 16px;
`

export const CustomTabs: React.FC<Props> = (props) => {
  return (
    <StyledTabs
      value={props.value}
      indicatorColor="primary"
      textColor="primary"
    >
      {props.children}
    </StyledTabs>
  )
}
