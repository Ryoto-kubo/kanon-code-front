import { ServerStyleSheets as MaterialServerStyleSheets } from "@material-ui/core";
import { RenderPageResult } from "next/dist/next-server/lib/utils";
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
        originalRenderPage({
          enhanceApp: (App) => (
            props
          ): React.ReactElement<{
            sheet: ServerStyleSheet;
          }> =>
            styledComponentsSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): React.ReactElement {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Kanon Codeは全てのエンジニアにコードレビューの機会を提供します。まずは自分のコードを投稿してみましょう。"
          />
          <meta name="theme-color" content="#5C6BC0" key="themeColor" />
          <meta
            property="og:title"
            content="KanonCode | コードレビュを全てのエンジニアへ"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Kanon Codeは全てのエンジニアにコードレビューの機会を提供します。まずは自分のコードを投稿してみましょう。"
          />
          <meta property="og:url" content="https://kanon-code.com" />
          <meta property="og:site_name" content="Kanon Code" />
          <meta property="og:image" content="/logo.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
