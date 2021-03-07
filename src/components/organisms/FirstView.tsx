import { FirstViewButtons } from '@/components/molecules/FirstViewButtons'
import { FirstViewText } from '@/components/molecules/FirstViewText'
import { Box } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'
import PairProramingSvg from '../../assets/top/Pair-programming.svg'

const StyledPairProramingSvg = styled(PairProramingSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`
const StyledUseMb = styled.div`
  margin-bottom: 24px;
  ${(props) => props.theme.breakpoints.up('md')} {
    margin-bottom: 0px;
  }
`
const StyledBox = styled(Box)`
  text-align: center;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export const FirstView: React.FC = () => {
  return (
    <StyledBox pt={7} pb={5} mb={5}>
      <StyledUseMb>
        <FirstViewText />
        <FirstViewButtons />
      </StyledUseMb>
      <StyledPairProramingSvg />
    </StyledBox>
  )
}
