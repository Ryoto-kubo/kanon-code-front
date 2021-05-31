import { TypoHeading2 } from "@/components/atoms/TypoHeading2";
// import { CustomLoader } from "@/components/common/loader";
import { FirstView } from "@/components/organisms/FirstView";
import { Post } from "@/components/organisms/Post";
import Layout from "@/layouts/standard";
import theme from "@/styles/theme";
import { UserType } from "@/types/global";
import { PostContentsProps } from "@/types/global/";
import { getContents } from "@/utils/api/get-contents";
import { Box, Container, Grid } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
// import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  authUser: any;
  currentUser: null | UserType;
  data: {
    Count: number;
    Items: PostContentsProps[];
    ScannedCount: number;
  };
};

const StyledBoxWidthBorder = styled(Box)`
  border-left: 3px solid ${theme.palette.primary.main};
  padding-left: 8px;
`;

const makePropertyForPostUrl = (posts: PostContentsProps[]) => {
  return posts.map((el: PostContentsProps) => {
    const postId = el.sort_key.split("_").pop();
    const displayName = el.user_profile.display_name;
    el.postUrl = `${displayName}/post/${postId}`;
    return el;
  });
};
const splitPostsByPostLanguage = (posts: PostContentsProps[]) => {
  let frontPosts = [];
  let backPosts = [];
  let otherPosts = [];
  const FRONT = 0;
  const BACK = 1;
  const OTHER = 2;
  for (const item of posts) {
    switch (item.contents.target_language) {
      case FRONT:
        frontPosts.push(item);
        break;
      case BACK:
        backPosts.push(item);
        break;
      case OTHER:
        otherPosts.push(item);
        break;
    }
  }
  return {
    frontPosts,
    backPosts,
    otherPosts,
  };
};
const IndexPage: React.FC<Props> = (props) => {
  const items = makePropertyForPostUrl(props.data.Items);
  const { frontPosts, backPosts, otherPosts } = splitPostsByPostLanguage(items);
  // const [contents] = useState<PostContentsProps[]>(items)

  // const [contents, setContents] = useState<any[]>(props.data.Items);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const err = new Error();
  //   (async () => {
  //     try {
  //       const result = await getContents();
  //       if (result.status !== 200) throw err;
  //       setContents(result.data.Items);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    // <>
    <Layout
      title="Kanon Code | コードレビュを全てのエンジニアへ"
      currentUser={props.currentUser}
    >
      {/* {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : ( */}
      <Container>
        {!props.currentUser && <FirstView />}
        <Box component="section" mb={5}>
          {frontPosts.length > 0 && (
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color="initial">Front-end</TypoHeading2>
            </StyledBoxWidthBorder>
          )}
          <Box mb={4}>
            <Grid spacing={3} container>
              {frontPosts.map((el) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.contents.title}
                    postUrl={el.postUrl}
                    iconPath={el.contents.target_icon.icon_path}
                    name={el.user_profile.display_name}
                    date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                    tagArray={el.contents.tag_list}
                    userIcon={el.user_profile.icon_src}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box component="section" mb={5}>
          {backPosts.length > 0 && (
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color="initial">Back-end</TypoHeading2>
            </StyledBoxWidthBorder>
          )}
          <Box mb={4}>
            <Grid spacing={3} container>
              {backPosts.map((el) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.contents.title}
                    postUrl={el.postUrl}
                    iconPath={el.contents.target_icon.icon_path}
                    name={el.user_profile.display_name}
                    date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                    tagArray={el.contents.tag_list}
                    userIcon={el.user_profile.icon_src}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box component="section" mb={5}>
          {otherPosts.length > 0 && (
            <StyledBoxWidthBorder mb={2}>
              <TypoHeading2 color="initial">Other</TypoHeading2>
            </StyledBoxWidthBorder>
          )}
          <Box mb={4}>
            <Grid spacing={3} container>
              {otherPosts.map((el) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Post
                    title={el.contents.title}
                    postUrl={el.postUrl}
                    iconPath={el.contents.target_icon.icon_path}
                    name={el.user_profile.display_name}
                    date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                    tagArray={el.contents.tag_list}
                    userIcon={el.user_profile.icon_src}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* )} */}
    </Layout>
    // </>
  );
};
// サーバーサイドで実行される
export const getStaticProps = async () => {
  // export const getServerSideProps = async () => {
  try {
    const response = await getContents();
    return {
      props: {
        data: response.data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export default IndexPage;
