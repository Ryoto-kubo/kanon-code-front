import { getContents } from '@/utils/api/get-contents';
import { GetServerSidePropsContext } from 'next';

const modyfyedDate = (date: string) => {
  // yyyy-mm-dd形式に直す
  const splitedDate = date.split('/');
  const year = splitedDate[0];
  const month = splitedDate[1];
  const day = splitedDate[2];
  const modifyedMonth = `0${month}`.slice(-2);
  const modifyedDay = `0${day}`.slice(-2);
  return `${year}-${modifyedMonth}-${modifyedDay}`;
};
const generateSitemapXml = async () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // ここでurlを足していく
  const response = await getContents();
  const result = response.data;
  const HOST = process.env.NEXT_PUBLIC_HOST;
  const postList = result.frontPosts.concat(
    result.backPosts.concat(result.otherPosts)
  );
  postList.forEach((post: any) => {
    const lastmod = modyfyedDate(post.date);
    xml += `
      <url>
        <loc>${HOST}/${post.post_url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  // この中でサイトマップのコードを生成して返す
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
