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
    <meta property='og:image' content='https://stg.kanon-code.com/logo.png' />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:site' content='@tcr_jp' />
    <meta name='twitter:url' content={'https://stg.kanon-code.com/logo.png'} />
    <meta name='twitter:title' content={'Kanon Code'} />
    <meta name='twitter:description' content={'description'} />
    <meta
      name='twitter:image'
      content={'https://stg.kanon-code.com/logo.png'}
    />
  </Head>
);
