import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import React from 'react'
import styled from 'styled-components'

type Props = {
  price: number
}

const StyledBoxPriceWrapper = styled(Box)`
  border: 2px solid ${theme.palette.secondary.main};
  border-radius: 4px;
  padding: 4px 10px;
  color: ${theme.palette.secondary.main};
  font-weight: bold;
  height: 100%;
`

export const Price: React.FC<Props> = ({ price }) => {
  return <StyledBoxPriceWrapper>¥{price}</StyledBoxPriceWrapper>
}
