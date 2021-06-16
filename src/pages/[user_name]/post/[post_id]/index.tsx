// import React, { useEffect, useState } from "react";
import { ReviewRequestContents } from "@/components/organisms/ReviewRequestContents";
import { ReviewRequestItemHeader } from "@/components/organisms/ReviewRequestItemHeader";
import Layout from "@/layouts/standard";
import { UserTypes } from "@/types/global";
import { PostContentsTypes } from "@/types/global/";
import { getContent } from "@/utils/api/get-content";
import Box from "@material-ui/core/Box";
// import { getPagesUrl } from "@/utils/api/get-pages-url";
import Container from "@material-ui/core/Container";
import React from "react";
import styled from "styled-components";

type Props = {
  authUser: any;
  currentUser: null | UserTypes;
  data: PostContentsTypes;
};

const StyledBoxBg = styled(Box)`
  padding: 40px 0px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    background: #fafafa;
    padding: 40px 16px;
  }
`;

const StyledContainer = styled(Container)`
  background: #ffffff;
  padding-top: 24px;
`;

const IndexPage: React.FC<Props> = (props) => {
  console.log(props);
  const year = props.data.create_year;
  const month = props.data.create_month;
  const day = props.data.create_day;
  const createDate = `${year}/${month}/${day}`;
  const contents = props.data.contents;
  const title = contents.title;

  return (
    <Layout title={`Kanon Code | ${title}`} currentUser={props.currentUser}>
      <StyledBoxBg>
        <StyledContainer maxWidth="md">
          <Box mb={4}>
            <ReviewRequestItemHeader
              contents={contents}
              profile={props.data.user_profile}
              createDate={createDate}
            />
          </Box>
          <ReviewRequestContents contents={contents} />
        </StyledContainer>
      </StyledBoxBg>
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
  console.log(postId, "postId");

  const result = await getContent({ postId: postId });
  console.log(result, "result");

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
