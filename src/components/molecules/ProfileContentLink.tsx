import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  value: string | number
  isDivider: boolean
  href: string
}
const StyledBox = styled(Box)`
  &:hover {
    cursor: pointer;
    background: #fbfbfb;
    .move-border {
      padding-left: 0px;
    }
  }
  &:hover + .profile-wrapper {
    .move-border {
      padding-left: 0px;
    }
  }
`
const StyledBoxFlexPC = styled(Box)`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledBoxFlexMb = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const StyledBoxWrapperLabel = styled(Box)`
  color: #5f6368;
  font-size: 12px;
  flex-basis: 100%;
  margin-right: 24px;
  max-width: 196px;
  min-width: 196px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 100%;
  }
`
const StyledBoxWrapperValue = styled(Box)`
  font-size: 16px;
  flex-basis: 100%;
  margin-right: 24px;
  max-width: 328px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 100%;
  }
`

const StyledBorderWeapper = styled('div')`
  padding-left: 24px;
  transition: padding-left 0.1s ease-in-out;
`

export const ProfileContentLink: React.FC<Props> = (props) => {
  const value = !props.value ? '未入力です' : props.value
  return (
    <Link href={props.href}>
      <StyledBox className="profile-wrapper">
        {props.isDivider && (
          <StyledBorderWeapper className="move-border">
            <Divider />
          </StyledBorderWeapper>
        )}
        <StyledBoxFlexPC>
          <StyledBoxFlexMb>
            <StyledBoxWrapperLabel>{props.label}</StyledBoxWrapperLabel>
            <StyledBoxWrapperValue>{value}</StyledBoxWrapperValue>
          </StyledBoxFlexMb>
          {props.children}
        </StyledBoxFlexPC>
      </StyledBox>
    </Link>
  )
}
