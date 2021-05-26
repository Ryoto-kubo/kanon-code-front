import { UserType } from "@/consts/type";
import Layout from "@/layouts/standard";
import { PostContentsProps } from "@/types/pages/top";
import { getContent } from "@/utils/api/get-content";
import { getPagesUrl } from "@/utils/api/get-pages-url";
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
// // サーバーサイドで実行される
export const getStaticPaths = async () => {
  const result = await getPagesUrl();
  const paths = result.data.map(
    (el: { postId: string; displayName: string }) => ({
      params: {
        post_id: el.postId,
        user_name: el.displayName,
      },
    })
  );
  return {
    paths: paths,
    fallback: true,
  };
};

// // paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async (props: any) => {
  // 外部APIエンドポイントを呼び出しデータ取得
  console.log(props.params);
  const postId = props.params.post_id;

  const result = await getContent({ postId: postId });
  console.log(result);

  // const res = await fetch(
  //   `http://localhost:3001/${params.user_name}/post/${params.post_id}`
  // );
  // const post = await res.json();

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      data: result.data.Items[0],
    },
  };
};

export default IndexPage;
