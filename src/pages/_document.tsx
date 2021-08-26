import basicAuthCheck from '@/utils/basic-auth-check';
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const { req, res } = ctx;
    if (req && res && process.env.NEXT_PUBLIC_ENABLE_BASIC_AUTH === 'true') {
      await basicAuthCheck(req, res);
    }
    const styledComponentsSheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
        originalRenderPage({
          enhanceApp: App => (
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
          <React.Fragment key='styles'>
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
      <Html lang='ja-JP'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='description'
            content='Kanon Codeは全てのエンジニアにコードレビューの機会を提供します。まずは自分のコードを投稿してみましょう。'
          />
          <meta name='theme-color' content='#5C6BC0' key='themeColor' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
