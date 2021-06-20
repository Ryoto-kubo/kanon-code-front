import Box from '@material-ui/core/Box'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import WorkingSvg from '../../../assets/illustration/working.svg'

type Props = {
  marginBottom: number
  children: ReactNode
}
const StyledWorkingSvg = styled(WorkingSvg)`
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
export const WorkingIllustration = (props: Props) => {
  return (
    <StyledBox>
      <Box>
        <StyledWorkingSvg />
      </Box>
      <Box mb={props.marginBottom}>
        投稿したレビュー依頼がありません。
        <br />
        以下のリンクからレビュー依頼をしてみましょう。
      </Box>
      {props.children}
    </StyledBox>
  )
}
