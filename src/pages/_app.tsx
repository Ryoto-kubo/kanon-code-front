import "modern-css-reset/dist/reset.min.css";
import NextApp, { AppContext } from "next/app";
import Head from "next/head";
import * as React from "react";

// import Session from "(somewhere...)";
// import getAuthenticationSession from "(somewhere...)";

interface Props {
  // session: Session;
  pageProps: any;
}

class App extends NextApp<Props> {
  render() {
    // const { session, pageProps, Component } = this.props;
    const { pageProps, Component } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,height=device-height"
            key="viewport"
          />
        </Head>
        {/* <SessionContext.Provider value={session}> */}
        <Component {...pageProps} />
        {/* </SelfUrlContext.Provider> */}
      </React.Fragment>
    );
  }

  static async getInitialProps({ Component, ctx }: AppContext) {
    const componentGetInitialProps =
      Component.getInitialProps || (() => Promise.resolve());

    const [session, pageProps] = await Promise.all([
      // getAuthenticationSession(),
      componentGetInitialProps(ctx),
    ]);

    return {
      session,
      pageProps,
    };
  }
}

export default App;
