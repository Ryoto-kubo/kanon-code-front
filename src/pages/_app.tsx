import '@/aws/cognito/config';
import { CustomNprogress } from '@/components/common/nextNprogress';
import { MaintenanceView } from '@/components/parts/maintenance';
import usePageView from '@/hooks/usePageView';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { getUser } from '@/utils/api/get-user';
import { CognitoUser } from '@aws-amplify/auth';
// import { CognitoUser } from '@aws-amplify/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/styles';
import { Auth } from 'aws-amplify';
import 'modern-css-reset/dist/reset.min.css';
import { AppProps } from 'next/app';
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

const Init = ({ Component, pageProps }: any): JSX.Element => {
  const [authUser, setAuthUser] = useState<CognitoUser | null>(null);
  const [currentUser, setCurrentUser] = useState<UserTypes | null>(null);
  const [isFetch, setisFetch] = useState<boolean>(true);
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
        setisFetch(false);
      } catch (error) {
        if (error.response) {
          destroyCookie(null, 'idToken');
          alert(error.response.data.status_message);
          await Auth.signOut();
          return;
        }
        setisFetch(false);
      }
    })();
  }, []);

  return (
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
                isFetch={isFetch}
              />
            </>
          </StyledWrapper>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'MAINTENANCE') {
    return <MaintenanceView />;
  }
  usePageView();

  return (
    <RecoilRoot>
      <Init Component={Component} pageProps={pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
