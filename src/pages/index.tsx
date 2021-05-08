import { TypoHeading2 } from '@/components/atoms/TypoHeading2'
import { FirstView } from '@/components/organisms/FirstView'
import { Post } from '@/components/organisms/Post'
// import { CognitoUser } from "@aws-amplify/auth";
import { Box, Container, Grid, Paper } from '@material-ui/core/'
import React from 'react'

type Props = {
  title: string
  authUser: any
}
// サーバーサイドで実行される
export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'Layout',
      title: 'コードレビュを全てのエンジニアへ',
    },
  }
}

const IndexPage: React.FC<Props> = (props) => {
  return (
    <Container>
      {!props.authUser && <FirstView />}
      <Box component="section">
        <Box mb={2}>
          <TypoHeading2 color="initial">フロント言語</TypoHeading2>
        </Box>
        <Box mb={4}>
          <Grid spacing={3} container>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper>
                <Post
                  title="reactのatmicDesignについて教えてくださいよろしく"
                  name="ryoto"
                  date="あと3日"
                  tagArray={[
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
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
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
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
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
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
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
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
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                    'atomicDesi',
                  ]}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

// export const getServerSideProps = async () => ({
//   props: {
//     layout: "Layout",
//     title: "コードレビュを全てのエンジニアへ",
//   },
// });
export default IndexPage
