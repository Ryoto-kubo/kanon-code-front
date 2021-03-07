import "@/aws/cognito/config";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import theme from "@/styles/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from "@material-ui/styles";
import "modern-css-reset/dist/reset.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  const user = useRequireLogin(router);

  return (
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
          <Component {...pageProps} authUser={user} />
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
};

export default MyApp;
