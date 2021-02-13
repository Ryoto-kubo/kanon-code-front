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
          <meta name="theme-color" content="#5C6BC0" key="themeColor" />
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
// type Props = {
//   title: string;
//   locale: "en-US" | "ja-JP";
// };

// class CustomDocument extends Document<Props> {
//   static async getInitialProps(ctx) {
//     const sheets = new ServerStyleSheets();

//     const originalRenderPage = ctx.renderPage({
//       enhanceApp: (App) => (props) => sheets.collect(),
//     });

//     const initialProps = await Document.getInitialProps(ctx);

//     return {
//       ...initialProps,
//       // Styles fragment is rendered after the app and page rendering finish.
//       styles: [
//         ...React.Children.toArray(initialProps.styles),
//         sheets.getStyleElement(),
//       ],
//     };
//   }
//   render() {
//     return (
//       <Html lang="ja">
//         <Head>
//           <meta charSet="utf-8" />
//           <meta name="theme-color" content="#5C6BC0" key="themeColor" />
//         </Head>
//         <body id="jss-server-side">
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default CustomDocument;
