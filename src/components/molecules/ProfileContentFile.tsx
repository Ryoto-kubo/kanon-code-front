import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  description: string
  isDivider: boolean
  htmlFor: string
}
const StyledInputLabel = styled(InputLabel)`
  line-height: normal;
`
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
  margin-bottom: 4px;
  max-width: 196px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    min-width: 196px;
    width: 100%;
  }
`
const StyledBoxWrapperDescription = styled(Box)`
  font-size: 14px;
  width: 170px;
  margin-right: 24px;
  max-width: 328px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 100%;
    font-size: 16px;
  }
`

const StyledBorderWeapper = styled('div')`
  padding-left: 24px;
  transition: padding-left 0.1s ease-in-out;
`

export const ProfileContentFile: React.FC<Props> = (props) => {
  return (
    <StyledInputLabel htmlFor={props.htmlFor}>
      <StyledBox className="profile-wrapper">
        {props.isDivider && (
          <StyledBorderWeapper className="move-border">
            <Divider />
          </StyledBorderWeapper>
        )}
        <StyledBoxFlexPC>
          <StyledBoxFlexMb>
            <StyledBoxWrapperLabel>{props.label}</StyledBoxWrapperLabel>
            <StyledBoxWrapperDescription>
              {props.description}
            </StyledBoxWrapperDescription>
          </StyledBoxFlexMb>
          {props.children}
        </StyledBoxFlexPC>
      </StyledBox>
    </StyledInputLabel>
  )
}
