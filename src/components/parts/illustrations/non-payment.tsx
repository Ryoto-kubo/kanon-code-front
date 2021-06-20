import Box from '@material-ui/core/Box'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import PaymentSvg from '../../../assets/illustration/payment.svg'

type Props = {
  marginBottom: number
  children: ReactNode
}
const StyledPaymentSvg = styled(PaymentSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 350px;
  }
`
const StyledBox = styled(Box)`
  width: 100%;
  text-align: center;
`
export const NonPaymentIllustration = (props: Props) => {
  return (
    <StyledBox>
      <Box>
        <StyledPaymentSvg />
      </Box>
      <Box mb={props.marginBottom} lineHeight={1.8}>
        まだ、レビューを開封していません。
        <br />
        レビューがきているか確認しに行きましょう！
      </Box>
      {props.children}
    </StyledBox>
  )
}
