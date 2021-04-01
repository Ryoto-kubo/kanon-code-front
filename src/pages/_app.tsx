import "@/aws/cognito/config";
import theme from "@/styles/theme";
import { CognitoUser } from "@aws-amplify/auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from "@material-ui/styles";
// import { useRequireLogin } from "@/hooks/useRequireLogin";
import { Auth } from "aws-amplify";
import "modern-css-reset/dist/reset.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

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
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isFetch, setisFetch] = useState<boolean>(false);
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // }, []);
  useEffect(() => {
    // useLayoutEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    (async () => {
      console.log("ok");

      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);
        setisFetch(true);
        if (router.pathname === "/auth/init") {
          router.push("/");
        }
      } catch {
        console.log("err");

        setUser(null);
        setisFetch(true);
        if (router.pathname === "/" || router.pathname === "/signin") return;
        router.push("/");
      }
    })();
  }, []);

  console.log(user);
  if (!isFetch) return <></>;
  return (
    <>
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
              <Component {...pageProps} authUser={user} />
            </StyledWrapper>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </>
  );
};

export default MyApp;
