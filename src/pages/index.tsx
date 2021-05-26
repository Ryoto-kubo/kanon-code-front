import { TypoHeading2 } from "@/components/atoms/TypoHeading2";
// import { CustomLoader } from "@/components/common/loader";
import { FirstView } from "@/components/organisms/FirstView";
import { Post } from "@/components/organisms/Post";
import { UserType } from "@/consts/type";
import Layout from "@/layouts/standard";
import { getContents } from "@/utils/api/get-contents";
import { Box, Container, Grid, Paper } from "@material-ui/core/";
import React, { useState } from "react";
// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

type Props = {
  authUser: any;
  currentUser: null | UserType;
  data: {
    Count: number;
    Items: any[];
    ScannedCount: number;
  };
};

const StyledPaper = styled(Paper)`
  height: 100%;
`;

const IndexPage: React.FC<Props> = (props) => {
  const [contents] = useState<any[]>(props.data.Items);
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
        <Box component="section">
          <Box mb={2}>
            <TypoHeading2 color="initial">フロント言語</TypoHeading2>
          </Box>
          <Box mb={4}>
            <Grid spacing={3} container>
              {contents.map((el) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <StyledPaper>
                    <Post
                      title={el.contents.title}
                      iconPath={el.contents.targetIcon.iconPath}
                      name={el.user_profile.display_name}
                      date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                      tagArray={el.contents.tagList}
                      userIcon={el.user_profile.icon_src}
                    />
                  </StyledPaper>
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
    alert("システムエラーが発生しました");
    return {
      props: {
        data: null,
      },
    };
  }
};

export default IndexPage;
