import '@/aws/cognito/config';
import { CustomLoader } from '@/components/common/loader';
import { CustomNprogress } from '@/components/common/nextNprogress';
import { MaintenanceView } from '@/components/parts/maintenance';
import usePageView from '@/hooks/usePageView';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { getUser } from '@/utils/api/get-user';
import { CognitoUser } from '@aws-amplify/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/styles';
import { Auth } from 'aws-amplify';
import 'modern-css-reset/dist/reset.min.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { destroyCookie } from 'nookies';
import 'nprogress/nprogress.css'; // バーのデフォルトスタイルのインポート
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import './editor.scss';
import './style.scss';

const StyledWrapper = styled.div`
  background: #ffffff;
  position: relative;
  min-height: 100vh;
  padding-bottom: 390px;
  box-sizing: border-box;
  ${props => props.theme.breakpoints.up('sm')} {
    padding-bottom: 165px;
  }
`;

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'MAINTENANCE')
    return <MaintenanceView />;
  const [authUser, setAuthUser] = useState<CognitoUser | null>(null);
  const [currentUser, setCurrentUser] = useState<UserTypes | null>(null);
  const [isFetch, setisFetch] = useState<boolean>(false);
  console.log(isFetch);

  usePageView();
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    (async () => {
      try {
        const err = new Error();
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const payload = cognitoUser.signInUserSession.idToken.payload;
        const response = await getUser();
        const result = response.data;
        if (!result.status) throw err;
        const user = result.Item as UserTypes;
        setAuthUser(payload);
        setCurrentUser(user);
        setisFetch(true);
      } catch (error) {
        if (error.response) {
          destroyCookie(null, 'idToken');
          alert(error.response.data.status_message);
          await Auth.signOut();
          return;
        }
        setisFetch(true);
      }
    })();
  }, []);
  if (!isFetch) {
    return (
      <>
        <CustomLoader />;
        <Head>
          <title>Kanon Code | コードレビューを全てのエンジニアへ</title>
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
        </Head>
      </>
    );
  }
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <StyledWrapper>
              <>
                <CustomNprogress />
                <Component
                  {...pageProps}
                  authUser={authUser}
                  currentUser={currentUser}
                />
              </>
            </StyledWrapper>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
};

export default MyApp;
