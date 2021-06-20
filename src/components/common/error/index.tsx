import Box from '@material-ui/core/Box'
import React from 'react'
import styled from 'styled-components'
import SorrySvg from '../../../assets/illustration/sorry.svg'

const StyledCelebrationSvg = styled(SorrySvg)`
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

export const ErrorView = () => {
  return (
    <StyledBox>
      <Box>
        <StyledCelebrationSvg />
      </Box>
      申し訳ございません。読み込み時にエラーが発生しました。
      <br />
      しばらく時間をおいてやり直してください。
    </StyledBox>
  )
}
