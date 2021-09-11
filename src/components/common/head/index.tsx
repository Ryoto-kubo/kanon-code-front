import Head from 'next/head';

type Props = {
  title: string;
  description?: string;
  image?: string;
};

export const CommonHead = ({
  title = 'Kanon Code | コードレビューを全てのエンジニアへ',
  description,
  image,
}: Props) => (
  <Head>
    <title>{title}</title>
    <meta
      name='viewport'
      content='width=device-width,height=device-height'
      key='viewport'
    />
    <meta property='og:title' content={title} />
    <meta property='og:type' content='website' />
    <meta property='og:description' content={description} />
    <meta property='og:url' content={process.env.NEXT_PUBLIC_HOST} />
    <meta property='og:site_name' content='Kanon Code' />
    <meta property='og:image' content={image} />
    {/* <meta property='og:image:width' content={String(1280)} />
    <meta property='og:image:height' content={String(960)} /> */}
    <meta name='twitter:card' content='summary' />
    {/* <meta name='twitter:site' content='@kanon_code_com' /> */}
    <meta name='twitter:url' content={process.env.NEXT_PUBLIC_HOST} />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
    <meta name='twitter:image' content={image} />
  </Head>
);
