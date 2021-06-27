import Box from '@material-ui/core/Box'
import React from 'react'
import styled from 'styled-components'

type Props = {
  color: '#5C6BC0' | '#EC576B'
  text: string
}

const StyledBoxPriceWrapper = styled(Box)`
  border-radius: 4px;
  padding: 4px 10px;
  font-weight: bold;
  height: 100%;
`

export const Price: React.FC<Props> = ({ color, text }) => {
  return (
    <StyledBoxPriceWrapper color={color} border={`2px solid ${color}`}>
      {text}
    </StyledBoxPriceWrapper>
  )
}
