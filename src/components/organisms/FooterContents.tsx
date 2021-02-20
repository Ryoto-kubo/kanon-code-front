import { FooterContent } from '@/components/molecules/FooterContent'
import { FooterLogo } from '@/components/molecules/FooterLogo'
import React from 'react'

export const FooterContents: React.FC = () => {
  return (
    <>
      <FooterLogo />
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
