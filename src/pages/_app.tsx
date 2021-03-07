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
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

interface UserAttributes {
  sub: string;
  email: string;
  username: string;
}
interface CognitoUserProps extends CognitoUser {
  attributes: UserAttributes;
}

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  const [user, setUser] = useState<CognitoUserProps | null>(null);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    (async function () {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);
        if (router.pathname === "/auth/init") {
          location.href = "/";
        }
      } catch {
        if (router.pathname === "/" || router.pathname === "/signin") return;
        location.href = "/";
        setUser(null);
        console.log("The user isn't signed in");
      }
    })();
  }, []);
  // const user = useRequireLogin(router);

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
