import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

type Props = {
  title: string;
  locale: "en-US" | "ja-JP";
};

class CustomDocument extends Document<Props> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,height=device-height"
            key="viewport"
          />
          <meta name="theme-color" content="#5C6BC0" key="themeColor" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
