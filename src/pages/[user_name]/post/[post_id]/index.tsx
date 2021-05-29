import Layout from "@/layouts/standard";
import { UserType } from "@/types/global";
import { PostContentsProps } from "@/types/pages/top";
import { getContent } from "@/utils/api/get-content";
// import { getPagesUrl } from "@/utils/api/get-pages-url";
import { Container } from "@material-ui/core/";
import React from "react";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

type Props = {
  authUser: any;
  currentUser: null | UserType;
  data: PostContentsProps;
};

const IndexPage: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <Layout
      title="Kanon Code | コードレビュを全てのエンジニアへ"
      currentUser={props.currentUser}
    >
      <Container>{props.data.contents.title}</Container>
    </Layout>
  );
};

// サーバーサイドで実行される
export const getStaticPaths = async () => {
// const result = await getPagesUrl();
// const paths = result.data.map(
//   (el: { postId: string; displayName: string }) => ({
//     params: {
//       post_id: el.postId,
//       user_name: el.displayName,
//     },
//   })
// );
return {
  paths: [],
  fallback: true,
};
};

export const getStaticProps = async (props: any) => {
  const postId = props.params.post_id;
  const result = await getContent({ postId: postId });
  return {
    props: {
      data: result.data.Items[0],
    },
  };
};


// paramsには上記pathsで指定した値が入る（1postずつ）
// export const getInitialProps = async (context: any) => {
//   const postId = context.params.post_id;
//   const result = await getContent({ postId: postId });
//   return {
//     props: {
//       data: result.data.Items[0],
//     },
//   };
// };
// export const getServerSideProps = async (context: any) => {
//   const postId = context.params.post_id;
//   const result = await getContent({ postId: postId });
//   return {
//     props: {
//       data: result.data.Items[0],
//     },
//   };
// };


export default IndexPage;
