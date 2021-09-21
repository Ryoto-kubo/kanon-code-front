import { existsGaId, GA_ID } from '@/utils/gtag';
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

const description =
  'Kanon Codeは全てのエンジニアにコードレビューの機会を提供するサービスです。Python、JavaScript、Ruby、PHP、Goなど様々な言語に対応しています。「誰かにレビューしてもらいたい」そう思ったら、Kanon Codeでコードレビューを依頼してみてください。';

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
          <meta name='description' content={description} />
          <meta name='theme-color' content='#5C6BC0' key='themeColor' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap'
            rel='stylesheet'
          />
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
