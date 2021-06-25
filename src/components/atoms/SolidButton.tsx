import Button from '@material-ui/core/Button'
import React from 'react'
import styled from 'styled-components'

interface Props {
  sizing: 'small' | 'medium' | 'large'
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | undefined
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
  const color = props.color ? props.color : 'primary'
  return (
    <StyledSolidButton
      size={props.sizing}
      variant="contained"
      color={color}
      disableElevation
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyledSolidButton>
  )
}
