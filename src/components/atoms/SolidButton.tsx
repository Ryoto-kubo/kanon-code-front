import Button from '@material-ui/core/Button'
import React from 'react'
import styled from 'styled-components'

interface Props {
  sizing: 'small' | 'medium' | 'large'
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const StyledSolidButton = styled(Button)`
  color: #ffffff;
  font-weight: bold;
  min-width: 100px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    min-width: 140px;
  }
  text-transform: none;
`
export const CustomSolidButton: React.FC<Props> = (props) => {
  return (
    <StyledSolidButton
      size={props.sizing}
      variant="contained"
      color="primary"
      disableElevation
      onClick={props.onClick}
    >
      {props.children}
    </StyledSolidButton>
  )
}
