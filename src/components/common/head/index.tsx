import Head from "next/head";

type Props = {
  title: string;
};

export const CommonHead = ({ title = "This is the default title" }: Props) => (
  <Head>
    <title>{title}</title>
  </Head>
);
