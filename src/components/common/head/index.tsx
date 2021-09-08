import Head from 'next/head';

type Props = {
  title: string;
};

export const CommonHead = ({
  title = 'Kanon Code | コードレビューを全てのエンジニアへ',
}: Props) => (
  <Head>
    <title>{title}</title>
    <meta name='viewport' content='width=device-width,initial-scale=1.0' />
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
  </Head>
);
