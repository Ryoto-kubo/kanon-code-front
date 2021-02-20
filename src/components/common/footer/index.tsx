import { Heading3 } from '@/components/atoms/Heading3'
import { KanonCodeLogo } from '@/components/atoms/Logo'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import theme from '@/styles/theme'
import { Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding-top: 24px;
  background: rgba(92, 107, 192, 0.1);
  color: ${theme.palette.primary.main};
`
const StyledWrapper = styled(Container)`
  max-width: 1280px;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
`
const StyledNav = styled.nav`
  margin-bottom: 24px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0;
  }
`
const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`
const StyledList = styled.li`
  list-style: none;
  // &:not(:last-child) {
  margin-bottom: 8px;
  // }
`
const StyledSmall = styled.small`
  padding: 8px 0;
  font-size: 13px;
  text-align: center;
  width: 100%;
  display: inline-block;
  color: #ffffff;
  background: ${theme.palette.primary.main};
`

export const TheFooter: React.FC = () => {
  return (
    <StyledFooter>
      <StyledWrapper>
        <StyledNav>
          <div>
            <KanonCodeLogo />
            <ParagraphText fontSize={12} fontWeight="normal">
              全てのエンジニアにコードレビューを
            </ParagraphText>
          </div>
        </StyledNav>
        <StyledNav>
          <Heading3
            fontSize={16}
            marginBottom={1}
            color={theme.palette.primary.dark}
          >
            About
          </Heading3>
          <StyledUl>
            <StyledList>Kanon Codeについて</StyledList>
            <StyledList>よくある質問</StyledList>
            <StyledList>開発ロードマップ</StyledList>
          </StyledUl>
        </StyledNav>
        <StyledNav>
          <Heading3
            fontSize={16}
            marginBottom={1}
            color={theme.palette.primary.dark}
          >
            Legal
          </Heading3>
          <StyledUl>
            <StyledList>利用規約</StyledList>
            <StyledList>プライバシーポリシー</StyledList>
            <StyledList>特定表記法</StyledList>
          </StyledUl>
        </StyledNav>
        <StyledNav>
          <Heading3
            fontSize={16}
            marginBottom={1}
            color={theme.palette.primary.main}
          >
            Links
          </Heading3>
          <StyledUl>
            <StyledList>お問い合わせ</StyledList>
            <StyledList>メディアキット</StyledList>
            <StyledList>Twiiter</StyledList>
            <StyledList>Github</StyledList>
          </StyledUl>
        </StyledNav>
      </StyledWrapper>
      <StyledSmall>
        Copyright © 2021 KanonCode, Inc. All Rights Reserved.
      </StyledSmall>
    </StyledFooter>
  )
}
