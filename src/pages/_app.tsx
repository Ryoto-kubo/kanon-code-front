import "@/aws/cognito/config";
import { CustomNprogress } from "@/components/common/nextNprogress";
import { SettingLayout } from "@/layouts/setting";
import Layout from "@/layouts/standard";
import theme from "@/styles/theme";
import { UserTypes } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { CognitoUser } from "@aws-amplify/auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, ThemeProvider as MaterialUIThemeProvider } from "@material-ui/styles";
import { Auth } from "aws-amplify";
import "modern-css-reset/dist/reset.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { setCookie } from 'nookies';
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
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  const [authUser, setAuthUser] = useState<CognitoUser | null>(null);
  const [currentUser, setCurrentUser] = useState<UserTypes | null>(null);
  const [isFetch, setisFetch] = useState<boolean>(false);
  const layout = pageProps.layout;
  const title = pageProps.title;
  console.log("_app.tsx");
  const err = new Error();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    (async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const idToken = authenticatedUser.signInUserSession.idToken
        const jwtToken = idToken.jwtToken
        setCookie(null, "idToken", jwtToken, {})
        const response = await getUser();
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        const user = result.Item;
        setAuthUser(authenticatedUser);
        setCurrentUser(user);
        setisFetch(true);
      } catch (error) {
        // alert(error);
        setAuthUser(null);
        setCurrentUser(null);
        setisFetch(true);
        if (router.pathname === "/" || router.pathname === "/signin") return;
        router.push("/");
      }
    })();
  }, []);

  const getLayout = () => {
    switch (layout) {
      case "SettingLayout":
        return (
          <SettingLayout
            title={`Kanon Code | ${title}`}
            currentUser={currentUser}
          >
            <CustomNprogress />
            <Component
              {...pageProps}
              authUser={authUser}
              currentUser={currentUser}
            />
          </SettingLayout>
        );
      case "Layout":
        return (
          <Layout title={`Kanon Code | ${title}`} currentUser={currentUser}>
            <CustomNprogress />
            <Component {...pageProps} currentUser={currentUser} />
          </Layout>
        );
      default:
        return (
          <>
            <CustomNprogress />
            <Component
              {...pageProps}
              authUser={authUser}
              currentUser={currentUser}
            />
          </>
        );
    }
  };

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
              {/* <Component {...pageProps} authUser={authUser} /> */}
              {getLayout()}
            </StyledWrapper>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
};

export default MyApp;

// eyJraWQiOiJrYWZtK0VudmZWMCtFM0IyU3BDQitGczRmZzVGMVNVY2pzR3FZcmswS1B3PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206YWNjZXNzX3Rva2VuIjoieWEyOS5hMEFScmRhTTh5X21Pd19xMEVTMGNua2s0U2RzRGFnc2ZRRi1TNjNPaklNT1gxOHBsdmxReS10bXk1Mk83MDZJOWVZZUh0aDdoTnlJdWl2NWVVNmlMc1NnZkowY3F5b2lIclZ3dnFFZWVHeDhwZWZPSGpQUkdmMHNtN2t2RWdlMl8xdFBmS19pOXFvb092ei1xczJscGx4aWM4U0Y2b3o5ZyIsImF0X2hhc2giOiJpSHpyQmxsZGY5OHVVblAwSWxvWEhRIiwic3ViIjoiMjNlYzY5YzMtYTI4Ny00MTdiLTliMTItMjUzODk3NDM1MGRlIiwiY29nbml0bzpncm91cHMiOlsiYXAtbm9ydGhlYXN0LTFfd2Vtb0p4TDJaX0dvb2dsZSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV93ZW1vSnhMMloiLCJjb2duaXRvOnVzZXJuYW1lIjoiZ29vZ2xlXzEwNzIxNzAyNTAwMjcyNDI5MDQ5MSIsIm5vbmNlIjoicFhjaG1Cdnl4RW11UGNGX3ZDTy0xZnpWVVZHMTZOMnppelJMbnZkWC03N01Xa2dYXzRib0lpQk5KbTFBRXEwelpRMlVoeXNzcEEtamZ2YzFlOHJvNDI2QnZsVXlPV0Rna0JUQzhMQWJtZUdjTlFSdFRwaXZJOE43UnZyMHVia0dnMjdxSS1YQ3JLZEJBRmVfZE9KMzhoSk1Ud0cxY3dabXNNdlNkaTR3WjdVIiwicGljdHVyZSI6Imh0dHBzOlwvXC9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXC9hLVwvQU9oMTRHamdHVS16aXpSTlQ0UEg0c1N0d3NfZGgxa2ZFbVhtaE50YVR4R0Q9czk2LWMiLCJhdWQiOiIxZnFxN2VrYjh0bWVqYnBnZDNoZzNxYnExZCIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjEwNzIxNzAyNTAwMjcyNDI5MDQ5MSIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2MjUyMzQxMDY5MDgifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI1MzE2OTY4LCJuYW1lIjoicnlvdG8ga3Vib29kIiwiZXhwIjoxNjI1MzIwNTY4LCJpYXQiOjE2MjUzMTY5NjgsImVtYWlsIjoib2lsbS5yeW90b2t1Ym9AZ21haWwuY29tIn0.kogyWHf-AOhlDxAXFTrjqeJTaGqWG2YbIai3xFuE5Vs6K2tetse9W_DH5rCDKIqHLDWlLfRBJo9z1co1wKGYONvFdUePv-GHINtL-_GeMRIOE-mkznknSThlW-i8mAIHbmijgpLCfbSxMWkGsQ1iiW5LnI8LQUsSDd1fmjij_J9tj8V8fJXz9c5Nhv_S4-s41KuxfiVo4h654daQxbthpm01yAMywG5JUF1YGp4vXQN5sS3TgOv8iJfLpoUp8z5zhDbPUGgP4fc_eMHGWDz6xen11NVIY2S8Nr1pwZx7GR0yO8Y2UM8lH0wYEQOUI6gT36il34un8k6bNCd4qZZ8aQ
