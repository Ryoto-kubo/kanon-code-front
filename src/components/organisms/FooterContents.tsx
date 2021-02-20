import { FooterContent } from '@/components/molecules/FooterContent'
import { FooterLogo } from '@/components/molecules/FooterLogo'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const StyledUnBorder = styled.a`
  text-decoration: none;
`

export const FooterContents: React.FC = () => {
  return (
    <>
      <Link href="/">
        <StyledUnBorder>
          <FooterLogo />
        </StyledUnBorder>
      </Link>
      <FooterContent
        text="About"
        listArray={['Kanon Codeについて', 'よくある質問', '開発ロードマップ']}
      />
      <FooterContent
        text="Legal"
        listArray={['利用規約', 'プライバシーポリシー', '特定表記法']}
      />
      <FooterContent
        text="Links"
        listArray={['お問い合わせ', 'メディアキット', 'Twiiter', 'Github']}
      />
    </>
  )
}
