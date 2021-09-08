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
          <meta
            name='description'
            content='Kanon Codeは全てのエンジニアにコードレビューの機会を提供します。まずは自分のコードを投稿してみましょう。'
          />
          <meta name='theme-color' content='#5C6BC0' key='themeColor' />
          <meta property='og:title' content='Kanon Code | テスト' />
          <meta property='og:type' content='website' />
          <meta property='og:description' content='Kanon テスト' />
          <meta property='og:url' content='https://stg.kanon-code.com' />
          <meta property='og:site_name' content='Kanon Code' />
          <meta
            property='og:image'
            content='https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
          />
          <meta property='og:image:width' content={String(1280)} />
          <meta property='og:image:height' content={String(960)} />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@kanon_code_com' />
          <meta name='twitter:url' content={'https://stg.kanon-code.com'} />
          <meta name='twitter:title' content={'Kanon Code'} />
          <meta name='twitter:description' content={'Kanon テスト'} />
          <meta
            name='twitter:image'
            content={
              'https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
            }
          />
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
