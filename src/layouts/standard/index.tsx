import { TheFooter } from '@/components/common/footer/index';
// import { CommonHead } from '@/components/common/head/index';
import { TheLoggedHeader } from '@/components/common/header/logged';
import { TheRegisterHeader } from '@/components/common/header/register';
import { TheStndardHeader } from '@/components/common/header/standard';
import { SigninDialog } from '@/components/parts/signinDialog';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
import { UserTypes } from '@/types/global';
import Box from '@material-ui/core/Box';
// import Head from 'next/head';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  title: string;
  currentUser: null | UserTypes;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const Layout: React.FC<Props> = ({ children, title, currentUser }) => {
  console.log(title);

  const displayName = currentUser?.user_profile.display_name;
  const { isOpenSignin, setIsOpenSignin } = useIsOpenSignin();
  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='width=device-width,height=device-height'
          key='viewport'
        />
        <meta property='og:title' content='Kanon Code | テスト' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Kanon テスト' />
        <meta property='og:url' content='https://stg.kanon-code.com' />
        <meta property='og:site_name' content='Kanon Code' />
        <meta
          property='og:image'
          content='https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
        />
        <meta property='og:image:width' content={String(1280)} />
        <meta property='og:image:height' content={String(960)} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@kanon_code_com' />
        <meta name='twitter:url' content={'https://stg.kanon-code.com'} />
        <meta name='twitter:title' content={'Kanon Code'} />
        <meta name='twitter:description' content={'Kanon テスト'} />
        <meta
          name='twitter:image'
          content={
            'https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
          }
        />
      </Head> */}
      {displayName === '' ? (
        <TheRegisterHeader />
      ) : currentUser ? (
        <TheLoggedHeader currentUser={currentUser} />
      ) : (
        <TheStndardHeader />
      )}
      <StyleBoxMain mt={4} component='main'>
        {children}
      </StyleBoxMain>
      <SigninDialog
        isOpenDialog={isOpenSignin}
        closeDialog={() => setIsOpenSignin(false)}
      />
      <TheFooter />
    </>
  );
};

export default Layout;
