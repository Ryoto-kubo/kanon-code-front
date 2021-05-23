import { CenterWrapper } from '@/components/atoms/CenterWrapper'
import { SolidLink } from '@/components/atoms/SolidLink'
import Box from '@material-ui/core/Box'
import React from 'react'
import styled from 'styled-components'

type Props = {
  text: string
  description: string
  href: string
  borderRadius: number
}

const StyledBoxDescription = styled(Box)`
  font-size: 14px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    font-size: 16px;
  }
`

export const NoSettingData: React.FC<Props> = (props) => {
  return (
    <CenterWrapper>
      <Box mb={1}>{props.children}</Box>
      <StyledBoxDescription mb={2}>{props.description}</StyledBoxDescription>
      <SolidLink href={props.href} borderRadius={props.borderRadius}>
        {props.text}
      </SolidLink>
    </CenterWrapper>
  )
}
