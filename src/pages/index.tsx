import { TypoHeading2 } from "@/components/atoms/TypoHeading2";
import { FirstView } from "@/components/organisms/FirstView";
import { Post } from "@/components/organisms/Post";
import { UserType } from "@/consts/type";
import Layout from "@/layouts/standard";
import { getContents } from "@/utils/api/get-contents";
import { Box, Container, Grid, Paper } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
type Props = {
  authUser: any;
  currentUser: null | UserType;
};
// サーバーサイドで実行される
// export const getServerSideProps = async () => {
//   const data = await getContents();
//   return {
//     props: {
//       layout: "Layout",
//       title: "コードレビュを全てのエンジニアへ",
//       data: data,
//     },
//   };
// };

const IndexPage: React.FC<Props> = (props) => {
  console.log(props);
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const result = await getContents();
        if (result.status !== 200) throw err;
        setContents(result.data.Items);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Layout
      title="Kanon Code | コードレビュを全てのエンジニアへ"
      currentUser={props.currentUser}
    >
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
                  <Paper>
                    <Post
                      title={el.contents.title}
                      iconPath={el.contents.targetIcon.iconPath}
                      name={el.user_profile.display_name}
                      date={`${el.create_year}/${el.create_month}/${el.create_day}`}
                      tagArray={el.contents.tagList}
                      userIcon={el.user_profile.icon_src}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
