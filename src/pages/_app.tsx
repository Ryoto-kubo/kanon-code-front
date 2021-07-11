import "@/aws/cognito/config";
import { CustomNprogress } from "@/components/common/nextNprogress";
import theme from "@/styles/theme";
import { UserTypes } from "@/types/global";
import { getUser } from '@/utils/api/get-user';
import { CognitoUser } from "@aws-amplify/auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, ThemeProvider as MaterialUIThemeProvider } from "@material-ui/styles";
import { Auth } from "aws-amplify";
import "modern-css-reset/dist/reset.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { destroyCookie, setCookie } from 'nookies';
import "nprogress/nprogress.css"; // バーのデフォルトスタイルのインポート
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import styled, { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import "./editor.scss";
import "./style.scss";
const StyledWrapper = styled.div`
  background: #ffffff;
  position: relative;
  min-height: 100vh;
  padding-bottom: 572px;
  box-sizing: border-box;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding-bottom: 223px;
  }
`;

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const [authUser, setAuthUser] = useState<CognitoUser | null>(null);
  const [currentUser, setCurrentUser] = useState<UserTypes | null>(null);
  const [isFetch, setisFetch] = useState<boolean>(false);
  console.log("_app.tsx");
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    (async () => {
      console.log("_app.tsx async");
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(currentSession.getRefreshToken(), async (err:any, session:any) => {
          const error = new Error()
          const payload = cognitoUser.signInUserSession.idToken.payload
          const { idToken } = session;
          setCookie(null, "idToken", idToken.jwtToken);
          const response = await getUser()
          const result = response.data;
          if (!result.status) throw error
          const user = result.Item as UserTypes
          setAuthUser(payload);
          setCurrentUser(user);
          setisFetch(true);
        });
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          destroyCookie(null, 'idToken')
          alert(error.response.data.status_message)
          await Auth.signOut();
          return
        }
        // if (router.pathname === "/" || router.pathname === "/signin") return;
        router.push("/");
        setisFetch(true);
      }
    })();
  }, []);

  if (!isFetch) return <></>;
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <Head>
              <meta
                name="viewport"
                content="width=device-width,height=device-height"
                key="viewport"
              />
            </Head>
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