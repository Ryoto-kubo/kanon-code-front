import { FooterContent } from '@/components/molecules/FooterContent';
import { FooterLogo } from '@/components/molecules/FooterLogo';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
const StyledUnBorder = styled.a`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
const abouts = [
  {
    id: uuidv4(),
    href: '/about',
    value: 'Kanon Codeについて',
  },
  {
    id: uuidv4(),
    href: '/faq',
    value: 'よくある質問',
  },
];
const rules = [
  {
    id: uuidv4(),
    href: '/terms',
    value: '利用規約',
  },
  {
    id: uuidv4(),
    href: '/privacy-policy',
    value: 'プライバシーポリシー',
  },
];
const forms = [
  {
    id: uuidv4(),
    href: '/contact-us',
    value: '各種お問い合わせ',
  },
  {
    id: uuidv4(),
    href: 'https://twitter.com/kanon_code_com',
    value: '公式Twitter',
  },
];

export const FooterContents: React.FC = () => {
  return (
    <>
      <Link href='/'>
        <StyledUnBorder>
          <FooterLogo />
        </StyledUnBorder>
      </Link>
      <FooterContent text='About' listArray={abouts} />
      <FooterContent text='Legal' listArray={rules} />
      <FooterContent text='Links' listArray={forms} />
    </>
  );
};
