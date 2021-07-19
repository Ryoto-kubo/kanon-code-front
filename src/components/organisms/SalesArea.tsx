import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import React from 'react'
import styled from 'styled-components'

type Props = {
  totalPrice: number
}

const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const StyledBoxPriceWrapper = styled(Box)`
  border-radius: 4px;
  background: rgba(92, 107, 192, 0.05);
  padding: 12px;
  width: calc((100% - 50px) / 3);
  text-align: center;
`
const StyledBoxPrice = styled(Box)`
  color: ${theme.palette.primary.main};
  font-weight: bold;
  font-size: 24px;
`

export const SalesArea: React.FC<Props> = (props) => {
  return (
    <StyledBoxFlex>
      <StyledBoxPriceWrapper>
        <StyledBoxPrice>¥{props.totalPrice}</StyledBoxPrice>
      </StyledBoxPriceWrapper>
      <StyledBoxPriceWrapper>
        <StyledBoxPrice>¥{props.totalPrice}</StyledBoxPrice>
      </StyledBoxPriceWrapper>
      <StyledBoxPriceWrapper>
        <StyledBoxPrice>¥{props.totalPrice}</StyledBoxPrice>
      </StyledBoxPriceWrapper>
    </StyledBoxFlex>
  )
}
