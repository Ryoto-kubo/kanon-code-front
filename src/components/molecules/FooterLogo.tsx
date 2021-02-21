import { KanonCodeLogo } from '@/components/atoms/Logo'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import React from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
  margin-bottom: 24px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0;
  }
`

export const FooterLogo: React.FC = () => {
  return (
    <StyledNav>
      <div>
        <KanonCodeLogo />
        <ParagraphText fontSize={12} fontWeight="normal">
          全てのエンジニアにコードレビューを
        </ParagraphText>
      </div>
    </StyledNav>
  )
}
