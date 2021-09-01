import Head from 'next/head';

type Props = {
  title: string;
};

export const CommonHead = ({ title = 'This is the default title' }: Props) => (
  <Head>
    <title>{title}</title>
    <meta
      property='og:title'
      content='KanonCode | コードレビュを全てのエンジニアへ'
    />
    <meta property='og:type' content='website' />
    <meta property='og:description' content='Kanon Code description' />
    <meta property='og:url' content='https://stg.kanon-code.com' />
    <meta property='og:site_name' content='Kanon Code' />
    <meta
      property='og:image'
      content='https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
    />
    <meta property='og:image:width' content={String(1280)} />
    <meta property='og:image:height' content={String(960)} />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:site' content='@tcr_jp' />
    <meta name='twitter:url' content={'https://stg.kanon-code.com'} />
    <meta name='twitter:title' content={'Kanon Code'} />
    <meta name='twitter:description' content={'description'} />
    <meta
      name='twitter:image'
      content={
        'https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/icons/angular.svg'
      }
    />
  </Head>
);
