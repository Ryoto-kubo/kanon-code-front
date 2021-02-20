import React from 'react'
import styled from 'styled-components'
import KanonCodeLogoSvg from '../../assets/logo/kanon-code.svg'
const StyledKanonCodeLogo = styled(KanonCodeLogoSvg)`
  width: 150px;
  height: 30px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 200px;
  }
`
export const KanonCodeLogo: React.FC = () => {
  return <StyledKanonCodeLogo />
}
