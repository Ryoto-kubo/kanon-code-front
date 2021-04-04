import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import styled from 'styled-components'

const StyledInputLabel = styled(InputLabel)`
  ${(props) => props.theme.breakpoints.down('sm')} {
    margin-bottom: 16px;
  }
  display: flex;
  justify-content: center;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`

type Props = {
  htmlFor: string
}

export const CustomInputLabel: React.FC<Props> = (props) => {
  return (
    <StyledInputLabel htmlFor={props.htmlFor}>
      {props.children}
    </StyledInputLabel>
  )
}
