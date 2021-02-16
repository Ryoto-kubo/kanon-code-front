import { Heading2 } from "@/components/atoms/Heading2";
import { FirstView } from "@/components/organisms/FirstView";
import { Post } from "@/components/organisms/Post";
import Layout from "@/layouts/standard";
import { Box, Container, Grid, Paper } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
// import ReactSvg from "../assets/logo/react.svg";
import PairProramingSvg from "../assets/top/Pair-programming.svg";

const StyledMaxWidthContainer = styled(Container)`
  max-width: 85%;
  margin: auto;
`;
// const StyledGrid = styled(Grid)``;
const IndexPage: React.FC = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledMaxWidthContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        pt={7}
        pb={5}
        mb={5}
      >
        <Box textAlign="center">
          <FirstView />
        </Box>
        <PairProramingSvg width={450} />
      </Box>
      <Box component="section">
        <Heading2 fontSize={20} marginBottom={4}>
          フロント言語
        </Heading2>
        <Box mb={4}>
          <Grid
            spacing={3}
            container
            // alignItems="center"
            // justify="space-between"
          >
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="reactのatmicDesignについて教えてくださいよろしく"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="vueのコードレビューをお願いします"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="phtyonのオブジェクト指向について"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="phtyonのオブジェクト指向について"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="phtyonのオブジェクト指向について"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                    "atomicDesi",
                  ]}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledMaxWidthContainer>
  </Layout>
);
export default IndexPage;
